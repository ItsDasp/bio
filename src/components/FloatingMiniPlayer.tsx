'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { Song } from '@/types';
import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  X,
  Maximize2,
  Minimize2,
} from 'lucide-react';

interface FloatingMiniPlayerProps {
  songs: Record<string, Song>;
  currentSong: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isVisible: boolean;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onClose: () => void;
  onExpand: () => void;
}

export function FloatingMiniPlayer(props: FloatingMiniPlayerProps) {
  const {
    songs,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isVisible,
    onPlayPause,
    onPrevious,
    onNext,
    onClose,
    onExpand,
  } = props;

  const { t } = useLanguage();
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const currentSongData = songs[currentSong];

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target !== dragRef.current && !dragRef.current?.contains(e.target as Node)) return;
    setIsDragging(true);
    startPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      const maxX = window.innerWidth - (isMinimized ? 200 : 320);
      const maxY = window.innerHeight - (isMinimized ? 60 : 120);
      setPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY)),
      });
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isMinimized]);

  if (!currentSongData || !isVisible) return null;

  return (
    <div
      ref={dragRef}
      className={`fixed z-50 transition-all duration-300 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white select-none
        ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? '200px' : '320px',
        height: isMinimized ? '60px' : '120px',
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <img
            src={currentSongData.cover}
            alt={currentSongData.title}
            className="w-12 h-12 rounded-md object-cover flex-shrink-0"
          />
          {!isMinimized && (
            <div className="overflow-hidden">
              <h3 className="font-semibold truncate max-w-xs">{currentSongData.title}</h3>
              <p className="text-sm text-white/80 truncate max-w-xs">
                {currentSongData.artist}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPrevious} aria-label={t.previous}>
            <SkipBack className="w-5 h-5" />
          </button>
          <button onClick={onPlayPause} aria-label={isPlaying ? t.pause : t.play}>
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button onClick={onNext} aria-label={t.next}>
            <SkipForward className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? t.maximize : t.minimize}
          >
            {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
          </button>
          <button onClick={onClose} aria-label={t.close}>
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <div className="px-4 pb-2">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/80">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
