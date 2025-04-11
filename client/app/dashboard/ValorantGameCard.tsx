"use client";

import React from 'react';
import Image from 'next/image';
import { Trophy, Users, Star } from 'lucide-react';
import { useRouter } from "next/navigation";

const GameCards = () => {
  const router = useRouter();

  const handleCardClick = (gameName: string) => {
    router.push(`/upload?game=${gameName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const games = [
    {
      name: "Valorant",
      image: "/valo.jpeg",
      players: "5v5",
      rating: "4.8",
      type: "Tactical Shooter"
    },
    {
      name: "League of Legends",
      image: "/lol.jpeg",
      players: "5v5",
      rating: "4.6",
      type: "MOBA"
    },
    {
      name: "Counter Strike",
      image: "/cs.jpeg",
      players: "5v5",
      rating: "4.9",
      type: "Tactical Shooter"
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-[#0f172a] to-[#1e293b]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">
            Select Your Game
          </h1>
          <p className="text-gray-400 mt-2">Choose a game to upload your highlights</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {games.map((game, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(game.name)}
              className="group relative w-72 h-96 rounded-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 bg-[rgba(17,25,34,0.8)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
              <Image
                src={game.image}
                alt={game.name}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 group-hover:scale-110"
              />

              {/* Content Container */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
                {/* Game Type Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[rgba(96,148,208,0.2)] text-[#6094d0] backdrop-blur-md">
                    {game.type}
                  </span>
                </div>

                {/* Game Title */}
                <h3 className="text-2xl font-bold text-white mb-2 transform transition-transform duration-300 group-hover:scale-105">
                  {game.name}
                </h3>

                {/* Game Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{game.players}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{game.rating}</span>
                  </div>
                </div>

                {/* Hover Reveal Content */}
                <div className="absolute inset-0 bg-[rgba(27,30,35,0.95)] backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <button className="px-6 py-3 bg-[#6094d0] hover:bg-[#4a7ab8] rounded-lg text-white font-semibold transform transition-transform duration-300 hover:scale-105">
                    Upload video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameCards;