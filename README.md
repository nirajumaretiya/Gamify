# Valorant Gameplay Analyzer

A computer vision-based tool for analyzing Valorant gameplay videos, focusing on kill feed detection and weapon tracking using YOLO models.

## Core Features

### Kill Feed Analysis
- Detects and parses kill events from gameplay footage
- Tracks killer, victim, weapon used, and special events (headshots, wallbangs)
- Generates detailed scoreboard statistics
- Supports team color detection and character identification

### Weapon Tracking
- Tracks weapon usage throughout the game
- Identifies 19 different weapons including:
  - Primary weapons (Vandal, Phantom, Operator, etc.)
  - Secondary weapons (Classic, Shorty, Sheriff, etc.)
  - Melee weapons
- Generates weapon usage statistics and patterns

## Technical Implementation

### Backend (Python)
- **Computer Vision**: OpenCV for video processing
- **Object Detection**: YOLO models for:
  - Kill feed detection
  - Weapon identification
  - Character recognition
- **Data Processing**: 
  - Kill event parsing
  - Weapon tracking
  - Scoreboard generation
- **API**: Flask server for video upload and analysis

### Frontend (Next.js)
- Video upload interface
- Results visualization
- Real-time processing status

## Project Structure

```
├── server/
│   ├── models/            # YOLO model files
│   ├── killlfeed.py      # Kill feed detection and parsing
│   ├── weapon_tracker.py # Weapon usage tracking
│   ├── color_detection.py # Team color detection
│   ├── constants.py      # Game constants and mappings
│   └── app.py           # Flask API server
│
└── client/
    ├── app/             # Next.js application
    ├── lib/             # Utility functions
    └── public/          # Static assets
```

## Setup

1. **Install Dependencies**
   ```bash
   # Backend
   cd server
   pip install -r requirements.txt
   
   # Frontend
   cd client
   npm install
   ```

2. **Configure Models**
   - Place YOLO model files in `server/models/`
   - Ensure correct model paths in `config.py`

3. **Start Servers**
   ```bash
   # Backend
   python app.py
   
   # Frontend
   npm run dev
   ```

## Usage

1. Upload a Valorant gameplay video through the web interface
2. The system will:
   - Process the video frame by frame
   - Detect and parse kill events
   - Track weapon usage
   - Generate statistics
3. View the analysis results including:
   - Kill feed events
   - Weapon usage patterns
   - Player statistics

## Requirements

- Python 3.8+
- Node.js 18+
- FFmpeg
- CUDA-capable GPU (recommended for faster processing)
- YOLO model files for:
  - Kill feed detection
  - Weapon identification
  - Character recognition

## Development

The project uses:
- YOLOv8 for object detection
- OpenCV for video processing
- Flask for API server
- Next.js for frontend
- TypeScript for type safety
