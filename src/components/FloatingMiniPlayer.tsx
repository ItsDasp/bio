'use client';
import { useState, useRef, useEffect } from 'react';
import { useMusic } from '@/contexts/MusicContext';
import { X, Play, Pause, SkipBack, SkipForward, VolumeX, Volume1, Minimize } from 'lucide-react';
import Image from 'next/image';

export function FloatingMiniPlayer() {
  const { 
    currentSong, 
    songs, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    togglePlayPause, 
    nextSong, 
    previousSong,
    setVolume 
  } = useMusic();
  
  const [isMinimized, setIsMinimized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = dragRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
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

  if (!songs[currentSong]) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={dragRef}
      className="fixed bottom-4 right-4 z-50 cursor-move"
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      onMouseDown={handleMouseDown}
    >
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-2xl max-w-sm">
        {isMinimized ? (
          <div className="flex items-center gap-3">
            <Image
              src={songs[currentSong]?.cover || '/default-cover.jpg'}
              alt={songs[currentSong]?.title || 'Song cover'}
              width={48}
              height={48}
              className="rounded-lg object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">
                {songs[currentSong]?.title}
              </p>
              <p className="text-gray-400 text-xs truncate">
                {songs[currentSong]?.artist}
              </p>
            </div>
            <button
              onClick={togglePlayPause}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMinimized(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={songs[currentSong]?.cover || '/default-cover.jpg'}
                  alt={songs[currentSong]?.title || 'Song cover'}
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
                />
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">
                    {songs[currentSong]?.title}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {songs[currentSong]?.artist}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                <Minimize className="w-4 h-4" />
              </button>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-1">
              <div 
                className="h-1 rounded-full transition-all duration-300"
                style={{ 
                  width: `${progress}%`,
                  backgroundColor: songs[currentSong]?.color || '#a855f7'
                }}
              />
            </div>
            
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={previousSong}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                disabled={currentSong === 0}
              >
                <SkipBack className="w-4 h-4" />
              </button>
              
              <button
                onClick={togglePlayPause}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={nextSong}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
                disabled={currentSong === songs.length - 1}
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVolume(volume === 0 ? 70 : 0)}
                className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors text-white"
              >
                {volume === 0 ? <VolumeX className="w-3 h-3" /> : <Volume1 className="w-3 h-3" />}
              </button>
              
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="flex-1 h-1 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, ${songs[currentSong]?.color || '#a855f7'} 0%, ${songs[currentSong]?.color || '#a855f7'} ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              
              <span className="text-white text-xs min-w-[2rem] text-center">
                {volume}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}