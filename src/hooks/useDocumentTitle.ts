'use client';
import { useEffect } from 'react';
interface Song {
  id: string;
  title: string;
  artist: string;
  duration: string;
  file: string;
  cover: string;
  originalUrl: string;
  color: string;
  realDuration?: number;
}
interface UseDocumentTitleProps {
  isPlaying: boolean;
  currentSong: Song | null;
  defaultTitle: string;
}
export function useDocumentTitle({ isPlaying, currentSong, defaultTitle }: UseDocumentTitleProps) {
  useEffect(() => {
    if (isPlaying && currentSong) {
      document.title = `🎵 ${currentSong.title} - ${currentSong.artist}`;
    } else {
      document.title = defaultTitle;
    }
    return () => {
      document.title = defaultTitle;
    };
  }, [isPlaying, currentSong, defaultTitle]);
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying && currentSong) {
        document.title = `🎵 ${currentSong.title} - ${currentSong.artist}`;
      } else if (!document.hidden) {
        if (isPlaying && currentSong) {
          document.title = `🎵 ${currentSong.title} - ${currentSong.artist}`;
        } else {
          document.title = defaultTitle;
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isPlaying, currentSong, defaultTitle]);
}
