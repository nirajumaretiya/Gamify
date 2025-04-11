"use client";

import React, { useState, useRef } from "react";
import { Upload, Film, Check, GamepadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { json } from "stream/consumers";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  src?: string;
}

const UploadPage = () => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [isProcessing, setIsProcessing] = useState(false);

  const previousHighlights = [
    {
      id: "1",
      title: "Ace Clutch",
      thumbnail: "/thumbnails/highlight1.jpg",
      src: "/movie.mp4",
    },
    {
      id: "2",
      title: "Quick Triple Kill",
      thumbnail: "/thumbnails/highlight2.jpg",
      src: "/videos/highlight2.mp4",
    },
    {
      id: "3",
      title: "Sniper Montage",
      thumbnail: "/thumbnails/highlight3.jpg",
      src: "/videos/highlight3.mp4",
    },
  ];

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadStatus("uploading");
      await handleUpload(file);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadStatus("uploading");
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("video", file);

    setIsProcessing(true);
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("success");
      } else {
        setUploadStatus("error");
        console.error("Failed to upload file");
      }

      const result = await response.json();
      console.log(result);

      // store scoreboard in localstorage
      localStorage.setItem("scoreboard", JSON.stringify(result.scoreboard));
    } catch (error) {
      setUploadStatus("error");
      console.error("Error uploading file:", error);
    } finally {
      setIsProcessing(false); // Simulate processing delay
    }

    // redirect to /scoreboard
    router.push("/scoreboard");
  };

  const handleHighlightClick = (video: Video) => {
    if (!video.src) return;
    const params = new URLSearchParams({
      src: video.src,
      thumbnail: video.thumbnail,
      title: video.title,
    });
    router.push(`/player?${params.toString()}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
            Share Your Gameplay
          </h1>
          <p className="text-gray-400 mt-2">
            Upload and showcase your best moments
          </p>
        </div>

        {/* Upload Zone */}
        <div
          className={`relative p-12 rounded-2xl border-2 border-dashed transition-all duration-300 ${
            isDragging
              ? "border-blue-400 bg-[rgba(96,148,208,0.1)]"
              : "border-gray-600 bg-[rgba(17,25,34,0.8)]"
          } backdrop-blur-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className={`p-6 rounded-full bg-[rgba(96,148,208,0.1)] transition-transform duration-300 ${
                isDragging ? "scale-110" : "scale-100"
              }`}
            >
              <Upload className="w-12 h-12 text-blue-400" />
            </div>
            <div className="text-center">
              <p className="text-xl font-medium text-white mb-2">
                Drag and drop your video here
              </p>
              <p className="text-gray-400">
                or{" "}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  browse files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                />
              </p>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Supported formats: MP4, AVI, MOV (max 2GB)
            </div>
          </div>

          {/* Upload Progress */}
          {uploadStatus === "uploading" && (
            <div className="mt-8 space-y-4">
              <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-teal-500 transition-all duration-300 relative"
                  style={{ width: `${uploadProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20" />
                </div>
              </div>
              <p className="text-center text-sm text-gray-400">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Upload Success */}
          {uploadStatus === "success" && !isProcessing && (
            <div className="mt-8 flex items-center justify-center gap-2 text-green-400">
              <Check className="w-5 h-5" />
              <span>Upload complete!</span>
            </div>
          )}
        </div>

        {/* Processing Loader */}
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative p-8 rounded-2xl bg-[rgba(17,25,34,0.9)] border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] max-w-md w-full mx-4">
              <div className="flex justify-center mb-6">
                <GamepadIcon className="w-16 h-16 text-[#6094d0] animate-bounce" />
              </div>

              <h3 className="text-xl font-bold text-center text-white mb-4 animate-pulse">
                Processing Your Game...
              </h3>

              <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-gradient-to-r from-blue-500 to-teal-500 animate-loading" />
              </div>

              <div className="text-center text-gray-400 space-y-2">
                <p className="animate-typing overflow-hidden whitespace-nowrap">
                  It will take a while, check out highlights below
                </p>
              </div>

              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-teal-500/10 rounded-full blur-xl animate-pulse delay-150" />
            </div>
          </div>
        )}

        {/* Previous Highlights */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-8">
            Your Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousHighlights.map((highlight) => (
              <div
                key={highlight.id}
                onClick={() => handleHighlightClick(highlight)}
                className="group relative rounded-xl overflow-hidden bg-[rgba(17,25,34,0.8)] backdrop-blur-sm border border-[rgba(255,255,255,0.1)] hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video">
                  <Image
                    src={highlight.thumbnail}
                    alt={highlight.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-medium text-lg">
                        {highlight.title}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Film className="w-5 h-5 text-white opacity-50" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
