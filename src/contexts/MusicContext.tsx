'use client';
import { createContext, useContext, useState, useRef, useEffect, useCallback, ReactNode } from 'react';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

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

interface MusicContextType {
  songs: Song[];
  currentSong: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  playPause: () => void;
  nextSong: () => void;
  previousSong: () => void;
  seekTo: (time: number) => void;
  setVolume: (volume: number) => void;
  playSong: (index: number) => void;
  showMiniPlayer: boolean;
  setShowMiniPlayer: (show: boolean) => void;
  initializeSongs: (songList: Song[]) => void;
  togglePlayPause: () => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  useDocumentTitle({
    isPlaying,
    currentSong: songs[currentSong] || null,
    defaultTitle: 'Dasp - Bio'
  });

  const playSong = useCallback((index: number) => {
    if (!audioRef.current || songs.length === 0) return;
    setCurrentSong(index);
    audioRef.current.src = songs[index].file;
    audioRef.current.currentTime = 0;
    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    }
    setShowMiniPlayer(true);
  }, [songs, isPlaying]);

  const nextSong = useCallback(() => {
    if (songs.length === 0) return;
    const nextIndex = (currentSong + 1) % songs.length;
    playSong(nextIndex);
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [songs.length, currentSong, playSong, isPlaying]);

  const previousSong = useCallback(() => {
    if (songs.length === 0) return;
    const prevIndex = currentSong === 0 ? songs.length - 1 : currentSong - 1;
    playSong(prevIndex);
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(console.error);
    }
  }, [songs.length, currentSong, playSong, isPlaying]);

  useEffect(() => {
    if (songs.length > 0 && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('loadstart', () => setIsLoading(true));
      audioRef.current.addEventListener('canplay', () => setIsLoading(false));
      audioRef.current.addEventListener('ended', nextSong);
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      });
      audioRef.current.addEventListener('durationchange', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      });
    }
  }, [songs, nextSong, volume]);

  useEffect(() => {
    const interval = progressInterval.current;
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const initializeSongs = (songList: Song[]) => {
    setSongs(songList);
  };

  const playPause = () => {
    if (!audioRef.current || songs.length === 0) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const currentSrc = audioRef.current.src;
      const expectedSrc = songs[currentSong].file;
      
      if (!currentSrc || !currentSrc.endsWith(expectedSrc.split('/').pop() || '')) {
        audioRef.current.src = expectedSrc;
      }
      
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      setShowMiniPlayer(true);
    }
  };

  const togglePlayPause = playPause;

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(100, newVolume));
    setVolumeState(clampedVolume);
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume / 100;
    }
  };

  const value: MusicContextType = {
    songs,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isLoading,
    playPause,
    nextSong,
    previousSong,
    seekTo,
    setVolume,
    playSong,
    showMiniPlayer,
    setShowMiniPlayer,
    initializeSongs,
    togglePlayPause,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}