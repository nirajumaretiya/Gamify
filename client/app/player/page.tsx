"use client";

import React from 'react';
import VideoPlayer from './VideoPlayer';
import { useSearchParams } from 'next/navigation';

interface PageProps {
  id: string;
}

const Page = ({id}:PageProps) => {
  const searchParams = useSearchParams();
  const src = searchParams.get('src') || '';
  const title = searchParams.get('title') || '';
  const thumbnail = searchParams.get('thumbnail') || '';

  return (
    <>
      <VideoPlayer 
        id={id}
        src="/movie.mp4"
        title={title} 
        thumbnail={thumbnail}
      />
    </>
  );
};

export default Page;