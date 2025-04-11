from flask import Flask, request, jsonify
from flask_cors import CORS
from killlfeed import get_scoreboard, get_kill_events
from highlight import get_highlight
from weapon_tracker import analyze_video
from config import Config

import os


app = Flask(__name__)


CORS(app)


if not os.path.exists(Config.UPLOAD_FOLDER):
    os.makedirs(Config.UPLOAD_FOLDER)


@app.route("/upload", methods=["POST"])
def upload_video():
    if "video" not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files["video"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save the file to the uploads folder
    file_path = os.path.join(Config.UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # run the model on the video
    scoreboard = run(file.filename)

    # weapon tracker

    return jsonify({"scoreboard": scoreboard})


def run(filename):
    video_path = os.path.join(Config.UPLOAD_FOLDER, filename)

    kill_events = get_kill_events(
        video_path=video_path,
        model_path=Config.KILL_FEED_MODEL_PATH,
        fps_target=5,
        deduplication_window=5.1,
    )
    # get scoreboard
    scoreboard = get_scoreboard(kill_events)

    # get highlight
    highlight_err = get_highlight(
        csv_path=Config.CSV_LOG_PATH,
        video_path=video_path,
        agent_name="Kayo",
    )
    print(highlight_err)

    weapon_stats = analyze_video(video_path)
    print(weapon_stats)

    return scoreboard


if __name__ == "__main__":
    app.run(debug=True)
