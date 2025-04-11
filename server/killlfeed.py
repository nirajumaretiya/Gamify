import numpy as np
from dataclasses import dataclass
from typing import List, Optional, Tuple
from ultralytics import YOLO
import cv2
import os
import pandas as pd
import math
from color_detection import detect_majority_color
from constants import CHARACTER_CLASSES, WEAPON_CLASSES
import json



@dataclass
class Detection:
    class_name: str  # Character, weapon, or icon type
    confidence: float
    bbox: Tuple[float, float, float, float]  # x1, y1, x2, y2


@dataclass
class KillEvent:
    killer: str
    weapon: str
    victim: str
    killer_team: str
    victim_team: str
    is_headshot: bool
    is_wallbang: bool
    timestamp: float
    assist: Optional[str] = None


class KillFeedParser:
    def __init__(self, min_confidence: float = 0.5, max_horizontal_gap: float = 50):
        self.min_confidence = min_confidence
        self.max_horizontal_gap = max_horizontal_gap

    def _filter_detections(self, detections: List[Detection]) -> List[Detection]:
        """Filter detections based on confidence threshold."""
        return [det for det in detections if det.confidence >= self.min_confidence]

    def _sort_detections_by_y_coordinate(
        self, detections: List[Detection]
    ) -> List[List[Detection]]:
        """Group detections into rows based on vertical position."""
        if not detections:
            return []

        # Sort detections by y-coordinate
        sorted_dets = sorted(detections, key=lambda x: x.bbox[1])  # Sort by y1

        # Group detections into rows
        rows = []
        current_row = [sorted_dets[0]]
        y_threshold = 10  # Maximum vertical distance to be considered same row

        for det in sorted_dets[1:]:
            if abs(det.bbox[1] - current_row[0].bbox[1]) <= y_threshold:
                current_row.append(det)
            else:
                rows.append(sorted(current_row, key=lambda x: x.bbox[0]))  # Sort by x1
                current_row = [det]

        rows.append(sorted(current_row, key=lambda x: x.bbox[0]))
        return rows

    def _parse_kill_row(self, frame, row: List[Detection]) -> Optional[KillEvent]:
        """Parse a single row of detections into a kill event."""
        if len(row) < 3:  # Minimum: killer, weapon, victim
            print("\nInvalid row:", len(row), "\n")
            return None

        characters = [det for det in row if det.class_name in CHARACTER_CLASSES]
        weapons = [det for det in row if det.class_name in WEAPON_CLASSES]
        headshots = [det for det in row if det.class_name == "Headshot"]
        wallbangs = [det for det in row if det.class_name == "Wallbang"]

        if len(characters) < 2 or len(weapons) != 1:
            print(
                "\nInvalid row due to character:", len(characters), len(weapons), "\n"
            )
            return None

        print("\nCharacters:", characters)
        # The leftmost character is the killer
        killer = characters[-2].class_name
        victim = characters[-1].class_name
        weapon = weapons[0].class_name

        # get the xyxy coordinates of the whole row by taking the minimum x1 and maximum x2 of the row
        x1 = min([det.bbox[0] for det in row])
        y1 = min([det.bbox[1] for det in row])
        x2 = max([det.bbox[2] for det in row])
        y2 = max([det.bbox[3] for det in row])

        # crop the row from the frame
        row_frame = frame[int(y1) : int(y2), int(x1) : int(x2)]
        cv2.imwrite("row_frame.jpg", row_frame)

        # get the team color of the killer and victim
        colors = detect_majority_color(row_frame)

        assit = []
        for det in characters[:-2]:
            assit.append(det.class_name)

        return KillEvent(
            killer=killer,
            victim=victim,
            weapon=weapon,
            is_headshot=len(headshots) > 0,
            is_wallbang=len(wallbangs) > 0,
            timestamp=0.0,  # Add actual timestamp if available
            killer_team=colors[0],
            victim_team=colors[1],
            assist=assit,
        )

    def parse_frame(
        self, frame, detections: List[Detection], timestamp: float = 0.0
    ) -> List[KillEvent]:
        """Parse all kill events from a single frame."""
        filtered_dets = self._filter_detections(detections)
        # print("\nFiltered detections:", filtered_dets)

        rows = self._sort_detections_by_y_coordinate(filtered_dets)
        # print("\nSorted rows:", rows, len(rows))

        kill_events = []
        for row in rows:
            # print("\nRow:", row, len(row))
            event = self._parse_kill_row(frame, row)
            # print("\nEvent: \n", event)
            if event:
                event.timestamp = timestamp
                kill_events.append(event)

        return kill_events


# Example usage
def process_video_frame(frame, yolo_model, timestamp):
    # Run YOLOv8 detection
    results = yolo_model(frame)

    # Convert YOLOv8 results to Detection objects
    detections = []
    for result in results:
        for *xyxy, conf, cls in result.boxes.data:
            det = Detection(
                class_name=result.names[int(cls)],
                confidence=float(conf),
                bbox=tuple(map(float, xyxy)),
            )
            detections.append(det)

    # Parse kill events
    parser = KillFeedParser()
    kill_events = parser.parse_frame(frame, detections, timestamp)
    # print("Detected kill events:", kill_events)

    return kill_events


# def detect_and_extract_changes(
#     video_path,
#     model_path,
#     output_folder="frames_output",
#     fps_target=1,
#     output_csv="killfeed_data.csv",
# ):
#     if not os.path.exists(output_folder):
#         os.makedirs(output_folder)

#     cap = cv2.VideoCapture(video_path)
#     original_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
#     original_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

#     fps = cap.get(cv2.CAP_PROP_FPS)
#     frame_interval = int(fps / fps_target)
#     frame_count = 0
#     timestamps_with_changes = set()  # Track unique timestamps
#     result = []

#     yolo_model = YOLO(model_path)

#     while True:
#         ret, frame = cap.read()

#         if not ret:
#             break

#         frame = cv2.resize(frame, (original_width, original_height))

#         if frame_count % frame_interval == 0:
#             # crop the frame to the top right corner using height and width values
#             cropped_frame = frame[
#                 70 : original_height // 2,
#                 math.floor(0.65 * original_width) : original_width,
#             ]

#             ## only for testing
#             frame_filename = "temp_frame_cropped.jpg"
#             cv2.imwrite(frame_filename, cropped_frame)

#             timestamp = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000  # Convert ms to seconds
#             kill_events = process_video_frame(cropped_frame, yolo_model, timestamp)

#             if kill_events:

#                 timestamps_with_changes.add(timestamp)
#                 for event in kill_events:
#                     result.append(event)

#         frame_count += 1

#     cap.release()


#     return result


def get_kill_events(
    video_path,
    model_path,
    output_folder="frames_output",
    fps_target=5,
    output_csv="killfeed_data.csv",
    deduplication_window=5.1,  # Time window (in seconds) to filter duplicates
):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    cap = cv2.VideoCapture(video_path)
    original_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    original_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

    fps = cap.get(cv2.CAP_PROP_FPS)
    frame_interval = int(fps / fps_target)
    frame_count = 0
    result = []

    recent_events = {}  # Dictionary to track recent kill events

    yolo_model = YOLO(model_path)

    while True:
        ret, frame = cap.read()

        if not ret:
            break

        frame = cv2.resize(frame, (original_width, original_height))

        if frame_count % frame_interval == 0:
            # Crop the frame to the top right corner
            cropped_frame = frame[
                70 : original_height // 2,
                math.floor(0.65 * original_width) : original_width,
            ]

            ## only for testing
            frame_filename = "temp_frame_cropped.jpg"
            cv2.imwrite(frame_filename, cropped_frame)

            timestamp = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000  # Convert ms to seconds
            kill_events = process_video_frame(cropped_frame, yolo_model, timestamp)

            for event in kill_events:
                # Create a unique key for deduplication (excluding timestamp)
                event_key = (
                    event.killer,
                    event.killer_team,
                    event.victim,
                    event.victim_team,
                    event.weapon,
                    event.is_headshot,
                    event.is_wallbang,
                )

                # Check if a similar event happened recently
                if event_key in recent_events:
                    last_time = recent_events[event_key]
                    if timestamp - last_time <= deduplication_window:
                        continue  # Skip duplicate within time window

                # Update recent events and keep track of its timestamp
                recent_events[event_key] = timestamp
                result.append(event)

        frame_count += 1

    cap.release()
    return result


def get_scoreboard(killEvents):
    # create a dictionary to store the scoreboard
    scoreboard = {}

    for event in killEvents:
        killer = event.killer_team + "_" + event.killer
        victim = event.victim_team + "_" + event.victim

        if killer not in scoreboard:
            scoreboard[killer] = {
                "kills": 0,
                "deaths": 0,
                "assists": 0,
                "headshots": 0,
                "wallbangs": 0,
                "team_color": event.killer_team,
                "weapon_used": event.weapon,
            }

        if victim not in scoreboard:
            scoreboard[victim] = {
                "kills": 0,
                "deaths": 0,
                "assists": 0,
                "headshots": 0,
                "wallbangs": 0,
                "team_color": event.victim_team,
                "weapon_used": None,
            }

        scoreboard[killer]["kills"] += 1
        scoreboard[victim]["deaths"] += 1
        scoreboard[killer]["headshots"] += int(event.is_headshot)
        scoreboard[killer]["wallbangs"] += int(event.is_wallbang)

        for assit in event.assist:
            assitPlayerName = event.killer_team + "_" + assit
            if assitPlayerName not in scoreboard:
                scoreboard[assitPlayerName] = {
                    "kills": 0,
                    "deaths": 0,
                    "assists": 0,
                    "headshots": 0,
                    "wallbangs": 0,
                    "team_color": event.killer_team,
                    "weapon_used": None,
                }
            scoreboard[assitPlayerName]["assists"] += 1

    for player in scoreboard:
        scoreboard[player]["kill_death_ratio"] = scoreboard[player]["kills"] / (
            scoreboard[player]["deaths"] + 1
        )  # Avoid division by zero

    # print the scoreboard
    print(scoreboard)

    # save scoreboard to a json file

    with open("scoreboard.json", "w") as f:
        json.dump(scoreboard, f, indent=4)
        
        
        
    df = pd.DataFrame(killEvents)
    df.to_csv("valorant_data.csv", index=False)

    return scoreboard




if __name__ == "__main__":
    video_path = "videos/4k 3.mp4"
    model_path = "character_detector_100epoch.pt"
    killEvents = get_kill_events(video_path, model_path)

    # create csv file
    df = pd.DataFrame(killEvents)
    df.to_csv("valorant_data.csv", index=False)

    scoreboard = get_scoreboard(killEvents)
