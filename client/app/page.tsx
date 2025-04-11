"use client";

import React from 'react';
import Image from 'next/image';
import { Trophy, Users, Star, GamepadIcon, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  const features = [
    {
      title: 'Easy Upload',
      icon: Upload,
      desc: 'Share your highlights in seconds',
      color: 'text-blue-400'
    },
    {
      title: 'Global Community',
      icon: Users,
      desc: 'Connect with gamers worldwide',
      color: 'text-purple-400'
    },
    {
      title: 'Multiple Games',
      icon: GamepadIcon,
      desc: 'Support for popular titles',
      color: 'text-teal-400'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Highlights Shared' },
    { value: '100K+', label: 'Monthly Views' }
  ];

  return (
    <div className="min-h-screen bg-[#0f172a]">
      {/* Hero Section */}
      <div className="relative h-screen">

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/70 to-[#0f172a]" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg mb-6">
            Share Your Gaming Glory
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mb-8">
            Upload, share, and celebrate your best gaming moments
          </p>
          <button 
            onClick={() => handleNavigate('/upload')}
            className="px-8 py-4 bg-[#6094d0] hover:bg-[#4a7ab8] rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-[rgba(17,25,34,0.8)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:transform hover:scale-105 transition-all duration-300"
            >
              <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[#6094d0]/10 skew-y-3" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="p-6 rounded-xl bg-[rgba(17,25,34,0.8)] backdrop-blur-lg"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            Ready to Share Your Moments?
          </h2>
          <p className="text-gray-400 mb-8">
            Join our community and start sharing your gaming highlights today
          </p>
          <button 
            onClick={() => handleNavigate('/upload')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg text-white font-semibold transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            Upload Now
          </button>
        </div>
      </div>
    </div>
  );
}