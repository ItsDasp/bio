'use client';
import { useState, useRef, useEffect } from 'react';
import { useMusic } from '@/contexts/MusicContext';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, X, Minimize2, Volume2 } from 'lucide-react';
export function GlobalMiniPlayer() {
  const { 
    songs, 
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    showMiniPlayer,
    playPause, 
    nextSong, 
    previousSong, 
    seekTo, 
    setVolume,
    setShowMiniPlayer 
  } = useMusic();
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
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
  }, [isDragging, dragOffset]);
  if (!showMiniPlayer || songs.length === 0) return null;
  const currentSongData = songs[currentSong];
  if (!currentSongData) return null;
  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    seekTo(newTime);
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
  };
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('drag-handle')) {
      setIsDragging(true);
      const rect = playerRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };
  return (
    <div
      ref={playerRef}
      className={`fixed z-50 transition-all duration-300 ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      } ${isMinimized ? 'w-16 h-16' : 'w-80 h-auto'}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="backdrop-blur-2xl bg-black/40 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        {isMinimized ? (
          <div 
            className="w-16 h-16 flex items-center justify-center drag-handle"
            onClick={() => setIsMinimized(false)}
          >
            <Image
              src={currentSongData.cover}
              alt={currentSongData.title}
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-black/60 flex items-center justify-center">
                  <Play className="w-3 h-3 text-white fill-current" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1 drag-handle">
                <Image
                  src={currentSongData.cover}
                  alt={currentSongData.title}
                  width={40}
                  height={40}
                  className="rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-white font-medium text-sm truncate">
                    {currentSongData.title}
                  </p>
                  <p className="text-white/60 text-xs truncate">
                    {currentSongData.artist}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMinimized(true);
                  }}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <Minimize2 className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMiniPlayer(false);
                  }}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
            {}
            <div className="space-y-2">
              <div 
                className="h-2 bg-white/20 rounded-full cursor-pointer"
                onClick={handleProgressClick}
              >
                <div 
                  className="h-full rounded-full transition-all"
                  style={{ 
                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    background: currentSongData.color || '#a855f7'
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
            {}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    previousSong();
                  }}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <SkipBack className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playPause();
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white fill-current" />
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSong();
                  }}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
                >
                  <SkipForward className="w-4 h-4 text-white" />
                </button>
              </div>
              {}
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-white/60" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={volume}
                  onChange={handleVolumeChange}
                  onClick={(e) => e.stopPropagation()}
                  className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
