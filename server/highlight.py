import os
import pandas as pd
from moviepy import VideoFileClip, concatenate_videoclips


def validate_file_paths(csv_file, video_file):
    """
    Validate that both CSV and video files exist and are accessible.
    """
    if not os.path.exists(csv_file):
        raise FileNotFoundError(f"CSV file not found: {csv_file}")
    if not os.path.exists(video_file):
        raise FileNotFoundError(f"Video file not found: {video_file}")
    if not video_file.lower().endswith((".mp4", ".avi", ".mov", ".mkv")):
        raise ValueError("Unsupported video format. Please use MP4, AVI, MOV, or MKV.")


def get_team_timestamps(csv_file, agent_name, team="green"):
    """
    Get timestamps where the specified agent was the killer in the given team.
    """
    try:
        df = pd.read_csv(csv_file)

        # Filter timestamps where the agent is the killer in the specified team
        mask = (df["killer_team"] == team) & (df["killer"] == agent_name)
        timestamps = sorted(df[mask]["timestamp"].tolist())

        # Merge overlapping timestamps (-3 to +3 sec range)
        merged_timestamps = []
        if timestamps:
            start = max(0, timestamps[0] - 3)
            end = timestamps[0] + 3

            for t in timestamps[1:]:
                if t - 3 <= end:
                    end = t + 3
                else:
                    merged_timestamps.append((start, end))
                    start = max(0, t - 3)
                    end = t + 3

            merged_timestamps.append((start, end))

        return merged_timestamps
    except Exception as e:
        raise Exception(f"Error processing CSV file: {str(e)}")


def create_highlight_video(video_path, timestamp_ranges, transition_duration=1):
    """
    Create a highlight video using the provided timestamp ranges, with transitions between clips.
    """
    video = None
    final_video = None

    try:
        # Use absolute path
        video_path = os.path.abspath(video_path)

        # VideoFileClip with specific ffmpeg_params for better compatibility
        video = VideoFileClip(
            video_path, audio=True, ffmpeg_params=["-hwaccel", "auto", "-i", video_path]
        )

        if not timestamp_ranges:
            raise ValueError("No timestamp ranges provided")

        clips = []
        for start_time, end_time in timestamp_ranges:
            end_time = min(video.duration, end_time)
            if end_time <= start_time:
                continue

            clip = video.subclip(start_time, end_time)
            if clips:
                clip = clip.crossfadein(
                    min(transition_duration, (end_time - start_time) / 2)
                )
            clips.append(clip)

        if not clips:
            raise ValueError("No valid clips generated")

        # Create output directory if it doesn't exist
        output_dir = "highlights"
        os.makedirs(output_dir, exist_ok=True)

        output_path = os.path.join(output_dir, "highlight_reel.mp4")

        final_video = concatenate_videoclips(clips, method="compose")
        final_video.write_videofile(
            output_path,
            codec="libx264",
            audio_codec="aac",
            fps=30,
            threads=4,
            preset="medium",
        )

        return f"Highlight video created successfully at {output_path}"

    except Exception as e:
        raise Exception(f"Error creating highlight video: {str(e)}")

    finally:
        # Clean up resources
        if final_video:
            final_video.close()
        if video:
            video.close()


def get_highlight(csv_path, video_path, agent_name):
    """
    Main function to generate highlight video for a given agent in the green team.
    """
    try:
        # Validate input files
        validate_file_paths(csv_path, video_path)

        # Get timestamp ranges
        timestamp_ranges = get_team_timestamps(csv_path, agent_name)
        print(f"Timestamp ranges extracted: {timestamp_ranges}")

        if not timestamp_ranges:
            return "No highlights found for the specified agent."

        # Create highlight video
        result = create_highlight_video(video_path, timestamp_ranges)
        return result

    except Exception as e:
        return f"Error: {str(e)}"


if __name__ == "__main__":
    # Example usage with proper path handling
    csv_path = os.path.abspath("valorant_data.csv")
    video_path = os.path.abspath("4k.mp4")
    result = get_highlight(csv_path, video_path, "Raze")
    print(result)
