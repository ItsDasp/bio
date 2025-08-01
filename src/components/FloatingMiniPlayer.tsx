'use client';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, X, Minimize2 } from 'lucide-react';
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
interface FloatingMiniPlayerProps {
  songs: Song[];
  currentSong: number;
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
export function FloatingMiniPlayer({
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
  onExpand
}: FloatingMiniPlayerProps) {
  const { t } = useLanguage();
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });
  const currentSongData = songs[currentSong];
  if (!currentSongData || !isVisible) return null;
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
      y: e.clientY - position.y
    };
    e.preventDefault();
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - startPos.current.x;
      const newY = e.clientY - startPos.current.y;
      const maxX = window.innerWidth - 320;
      const maxY = window.innerHeight - (isMinimized ? 60 : 120);
      setPosition({
        x: Math.max(0, Math.min(maxX, newX)),
        y: Math.max(0, Math.min(maxY, newY))
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
  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        left: position.x,
        top: position.y,
        width: isMinimized ? '200px' : '320px'
      }}
      onMouseDown={handleMouseDown}
    >
      <div 
        ref={dragRef}
        className={`bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 ${
          isMinimized ? 'rounded-full p-2' : 'rounded-2xl p-4'
        }`}
        style={{
          background: isMinimized 
            ? `linear-gradient(135deg, ${currentSongData.color}40, ${currentSongData.color}20)`
            : undefined
        }}
      >
        {isMinimized ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={currentSongData.cover}
                alt={currentSongData.title}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {currentSongData.title}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white ml-0.5" />
              )}
            </button>
            <div className="flex gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(false);
                }}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <polyline points="15,3 21,3 21,9"/>
                  <polyline points="9,21 3,21 3,15"/>
                  <line x1="21" y1="3" x2="14" y2="10"/>
                  <line x1="3" y1="21" x2="10" y2="14"/>
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
              >
                <X className="w-3 h-3 text-red-300" />
              </button>
            </div>
          </div>
        ) : (
          <>
            {}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                <span className="text-white/80 text-xs font-medium">{t.musicTitle}</span>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Minimize2 className="w-3 h-3 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onExpand();
                  }}
                  className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <polyline points="15,3 21,3 21,9"/>
                    <polyline points="9,21 3,21 3,15"/>
                    <line x1="21" y1="3" x2="14" y2="10"/>
                    <line x1="3" y1="21" x2="10" y2="14"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="w-6 h-6 rounded-full bg-red-500/20 hover:bg-red-500/30 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-red-300" />
                </button>
              </div>
            </div>
            {}
            <div className="flex gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden">
                <Image
                  src={currentSongData.cover}
                  alt={currentSongData.title}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate mb-1">
                  {currentSongData.title}
                </p>
                <p className="text-white/60 text-xs truncate">
                  {currentSongData.artist}
                </p>
              </div>
            </div>
            {}
            <div className="mb-3">
              <div className="w-full bg-white/20 rounded-full h-1 overflow-hidden mb-1">
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{ 
                    width: `${progress}%`,
                    background: `linear-gradient(90deg, ${currentSongData.color}, ${currentSongData.color}80)`
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            {}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrevious();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                disabled={currentSong === 0}
              >
                <SkipBack className="w-4 h-4 text-white" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayPause();
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg"
                style={{ 
                  background: `linear-gradient(135deg, ${currentSongData.color}, ${currentSongData.color}80)`
                }}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                disabled={currentSong === songs.length - 1}
              >
                <SkipForward className="w-4 h-4 text-white" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
