import math
import cv2
import numpy as np


def detect_majority_color(img):
    # Read image

    # Convert to HSV
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    h, w, _ = img.shape

    # Vertical line slightly to the right of center

    split_x = math.floor((w) * 0.65)

    # Define color ranges for red (two ranges) and green
    red_lower1, red_upper1 = np.array([0, 100, 100]), np.array([10, 255, 255])
    red_lower2, red_upper2 = np.array([170, 100, 100]), np.array([180, 255, 255])
    green_lower, green_upper = np.array([25, 50, 50]), np.array([95, 255, 255])

    # Masks for red and green
    red_mask = cv2.inRange(hsv, red_lower1, red_upper1) | cv2.inRange(
        hsv, red_lower2, red_upper2
    )
    green_mask = cv2.inRange(hsv, green_lower, green_upper)

    # Apply morphological opening to refine detection
    kernel = np.ones((5, 5), np.uint8)
    red_mask = cv2.morphologyEx(red_mask, cv2.MORPH_OPEN, kernel)
    green_mask = cv2.morphologyEx(green_mask, cv2.MORPH_OPEN, kernel)

    # Split the image into two sides
    left_red = red_mask[:, :split_x]
    right_red = red_mask[:, split_x:]
    left_green = green_mask[:, :split_x]
    right_green = green_mask[:, split_x:]

    # Count red/green pixels per side
    left_red_count = cv2.countNonZero(left_red)
    right_red_count = cv2.countNonZero(right_red)
    left_green_count = cv2.countNonZero(left_green)
    right_green_count = cv2.countNonZero(right_green)

    # Total pixels per side
    left_pixels = split_x * h
    right_pixels = (w - split_x) * h

    # Calculate percentages
    left_red_perc = (left_red_count / left_pixels) * 100
    right_red_perc = (right_red_count / right_pixels) * 100
    left_green_perc = (left_green_count / left_pixels) * 100
    right_green_perc = (right_green_count / right_pixels) * 100

    result = []

    # Print results
    if left_green_perc > left_red_perc:
        result.append("green")
        print("green", end=" ")
    if left_green_perc < left_red_perc:
        result.append("red")
        print("red", end=" ")
    if right_green_perc > right_red_perc:
        result.append("green")
        print("green", end=" ")
    if right_green_perc < right_red_perc:
        result.append("red")
        print("red", end=" ")

    if len(result) == 0:
        result = ["green", "red"]
    elif len(result) == 1 and result[0] == "red":
        result.append("green")
    elif len(result) == 1 and result[0] == "green":
        result.append("red")

    return result
