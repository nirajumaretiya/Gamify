import os
import cv2
import numpy as np
from ultralytics import YOLO
from collections import defaultdict
from config import Config

# Mapping of weapon class IDs to names
weapon_dict = {
    0: "Ares",
    1: "Bucky",
    2: "Bulldog",
    3: "Classic",
    4: "Frenzy",
    5: "Ghost",
    6: "Guardian",
    7: "Judge",
    8: "Marshal",
    9: "Melee",
    10: "Odin",
    11: "Operator",
    12: "Outlaw",
    13: "Phantom",
    14: "Sheriff",
    15: "Shorty",
    16: "Spectre",
    17: "Stinger",
    18: "Vandal",
}


def load_model():
    """Load the YOLO model for weapon detection"""
    return YOLO(Config.WEAPON_MODEL_PATH)


def ensure_output_directory():
    """Ensure the output directory exists for saving frames."""
    output_dir = "output_frames"
    os.makedirs(output_dir, exist_ok=True)
    return output_dir


def extract_video_duration(video_path):
    """Extract total duration of the video in seconds."""
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = cap.get(cv2.CAP_PROP_FRAME_COUNT)
    cap.release()

    if fps > 0:
        return total_frames / fps
    return 0


def capture_frame(video_path, timestamp, output_dir):
    """Capture a frame from the video at a specific timestamp and save it."""
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_number = int(timestamp * fps)

    cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
    cv2.waitKey(10)  # Small delay to improve frame capture stability
    ret, frame = cap.read()
    cap.release()

    if not ret or frame is None or frame.size == 0:
        print(f"Warning: Empty frame at {timestamp:.2f}s, skipping...")
        return None

    # Resize the frame to 1280x720 (width x height)
    frame = cv2.resize(frame, (1280, 720))

    # Ensure the crop is within bounds
    h, w, _ = frame.shape
    if h < 720 or w < 1280:  # Ensure frame is large enough for cropping
        print(f"Warning: Frame too small at {timestamp:.2f}s, skipping...")
        return None

    # Crop region of interest (adjust coordinates as needed)
    frame = frame[458 : 458 + 178, 1070 : 1070 + 210]  # Crop region of interest
    output_path = os.path.join(output_dir, f"frame_{timestamp:.2f}.png")
    cv2.imwrite(output_path, frame)
    return frame


def detect_objects(model: YOLO, frame):
    """Run YOLO detection on the given frame."""
    if frame is None or frame.size == 0:
        return None
    return model(frame)


class WeaponTracker:
    def __init__(self):
        self.last_weapon = None
        self.current_start_time = None
        self.weapon_intervals = defaultdict(list)
        self.weapon_total_time = defaultdict(float)
        self.weapon_names = {}

    def update(self, timestamp, results):
        """Update weapon tracking based on YOLO results."""
        current_weapon = None
        max_conf = 0

        if results:
            for result in results:
                for box in result.boxes:
                    conf = float(box.conf)
                    if conf > max_conf:
                        max_conf = conf
                        current_weapon = int(box.cls)

        if current_weapon is not None:
            self.weapon_names[current_weapon] = weapon_dict.get(
                current_weapon, f"Unknown-{current_weapon}"
            )

            if self.last_weapon is None:
                self.last_weapon = current_weapon
                self.current_start_time = timestamp

            elif current_weapon != self.last_weapon:
                self._end_current_interval(timestamp)
                self.last_weapon = current_weapon
                self.current_start_time = timestamp

    def _end_current_interval(self, end_time):
        """End the current weapon interval and update statistics."""
        if self.last_weapon is not None and self.current_start_time is not None:
            interval_duration = end_time - self.current_start_time
            self.weapon_intervals[self.last_weapon].append(
                {
                    "start": self.current_start_time,
                    "end": end_time,
                    "duration": interval_duration,
                }
            )
            self.weapon_total_time[self.last_weapon] += interval_duration
            self.current_start_time = end_time

    def get_statistics(self):
        """Return weapon detection statistics."""
        return {
            "intervals": dict(self.weapon_intervals),
            "total_times": dict(self.weapon_total_time),
            "weapon_names": self.weapon_names,
        }


def analyze_video(video_path):
    """Analyze the entire video for weapon detection."""
    model = load_model()
    tracker = WeaponTracker()
    output_dir = ensure_output_directory()

    total_duration = extract_video_duration(video_path)
    if total_duration == 0:
        print("Error: Could not determine video duration.")
        return

    print(
        f"\nAnalyzing entire video: {video_path} (Duration: {total_duration:.2f} sec)"
    )

    timestamps = np.arange(0, total_duration, 1.0)  # Process at 1-second intervals

    for timestamp in timestamps:
        frame = capture_frame(video_path, timestamp, output_dir)
        if frame is None:
            continue  # Skip processing if the frame is invalid

        results = detect_objects(model, frame)
        if results:
            tracker.update(timestamp, results)

    if tracker.last_weapon is not None:
        tracker._end_current_interval(total_duration)

    return tracker.get_statistics()


dicti = {}

# if __name__ == "__main__":
#     video_path = "gunphotos/t1.mp4"
#     stats = analyze_video(video_path)

#     if stats:
#         print("\nWeapon Detection Statistics (Full Video):")
#         for weapon_class, intervals in stats['intervals'].items():
#             weapon_name = stats['weapon_names'].get(weapon_class, f"Unknown-{weapon_class}")
#             dicti[weapon_name] = int(stats['total_times'][weapon_class])

#         print(dicti)
