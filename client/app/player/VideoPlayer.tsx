"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import { useRouter } from "next/navigation";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";
import { Slider } from "../components/ui/slider";

interface VideoPlayerProps {
  src: string;
  title: string;
  thumbnail: string;
  id: string;
}

const VideoPlayer = ({ src, title, thumbnail, id }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  const handleProgress = (state: { played: number }) => {
    setPlayed(state.played);
  };

  const handleSeek = (value: number) => {
    setPlayed(value);
    playerRef.current?.seekTo(value);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] p-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={containerRef}
          className="relative rounded-xl overflow-hidden bg-[rgba(17,25,34,0.8)] backdrop-blur-lg shadow-lg border border-[rgba(255,255,255,0.1)]"
        >
          {/* Title Bar */}
          <div className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent">
            <h1 className="text-white text-xl font-medium">{title}</h1>
          </div>

          {/* Video Player */}
          <ReactPlayer
            ref={playerRef}
            url={src}
            width="100%"
            height="100%"
            playing={isPlaying}
            volume={volume}
            muted={isMuted}
            onProgress={handleProgress}
            onDuration={setDuration}
            className="aspect-video"
          />

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            {/* Progress Bar */}
            <Slider
              value={[played * 100]}
              max={100}
              step={0.1}
              onValueChange={(value) => handleSeek(value[0] / 100)}
              className="h-1 bg-gray-600"
            />

            <div className="flex items-center justify-between mt-2">
              {/* Left Controls */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Volume Control */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-6 h-6 text-white" />
                  ) : (
                    <Volume2 className="w-6 h-6 text-white" />
                  )}
                </button>

                {/* Time Display */}
                <div className="text-white text-sm">
                  {formatTime(played * duration)} / {formatTime(duration)}
                </div>
              </div>

              {/* Right Controls */}
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                {isFullscreen ? (
                  <Minimize className="w-6 h-6 text-white" />
                ) : (
                  <Maximize className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Stats Button */}
        <button
          onClick={() => router.push(`/scoreboard/${id}`)}
          className="mt-4 w-full py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition"
        >
          View Stats
        </button>
      </div>
    </div>
  );
};

export default VideoPlayer;
