# Gamify - Valorant Game Analysis Tool

![Valorant](https://playvalorant.com/static/social-share-image.jpg)

A powerful tool for analyzing Valorant gameplay videos, providing detailed statistics, kill feeds, weapon tracking, and highlight generation.

## 🚀 Features

- **Video Analysis**: Upload and analyze Valorant gameplay videos
- **Kill Feed Detection**: Automatically detect and track kill events
- **Weapon Tracking**: Analyze weapon usage and statistics
- **Highlight Generation**: Generate highlights based on specific agent performance
- **Scoreboard Generation**: Create detailed scoreboards from gameplay
- **Modern UI**: Built with Next.js and Tailwind CSS for a beautiful user experience

## 🏗️ Project Structure

```
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js app directory
│   ├── lib/               # Utility functions and components
│   ├── public/            # Static assets
│   └── ...                # Configuration files
│
└── server/                # Python Flask backend
    ├── models/            # ML models and related code
    ├── app.py            # Main Flask application
    ├── killlfeed.py      # Kill feed detection logic
    ├── weapon_tracker.py # Weapon tracking functionality
    └── ...               # Other utility modules
```

## 🛠️ Tech Stack

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Radix UI Components
- React Player

### Backend
- Python Flask
- Computer Vision
- Machine Learning Models
- CORS Support

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.8+
- FFmpeg (for video processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd Gamify
   ```

2. **Setup Frontend**
   ```bash
   cd client
   npm install
   npm run dev
   ```

3. **Setup Backend**
   ```bash
   cd server
   pip install -r requirements.txt
   python app.py
   ```

4. **Environment Setup**
   - Create a `.env` file in the server directory with necessary configurations
   - Ensure all required ML models are in the correct directory

## 📝 Usage

1. Start both the frontend and backend servers
2. Navigate to `http://localhost:3000` in your browser
3. Upload a Valorant gameplay video
4. Wait for the analysis to complete
5. View the generated statistics, kill feed, and highlights

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Valorant API
- OpenCV
- TensorFlow
- Flask
- Next.js
