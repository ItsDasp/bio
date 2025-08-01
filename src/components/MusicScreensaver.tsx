'use client';
import { useMusic } from '@/contexts/MusicContext';
import { useLanguage } from '@/hooks/useLanguage';
import { Play, Pause, SkipBack, SkipForward, VolumeX, Volume1 } from 'lucide-react';
import { useState } from 'react';

interface MusicScreensaverProps {
  song: {
    title: string;
    artist: string;
    cover: string;
    color: string;
  };
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSeek: (time: number) => void;
  onClose: () => void;
  formatTime: (time: number) => string;
}

export function MusicScreensaver({
  song,
  isPlaying,
  currentTime,
  duration,
  onTogglePlay,
  onPrevious,
  onNext,
  onSeek,
  onClose,
  formatTime
}: MusicScreensaverProps) {
  const { t } = useLanguage();
  const { volume, setVolume, currentSong } = useMusic();
  const [previousVolume, setPreviousVolume] = useState(70);

  const handleMute = () => {
    if (volume === 0) {
      setVolume(previousVolume);
    } else {
      setPreviousVolume(volume);
      setVolume(0);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) {
      setPreviousVolume(newVolume);
    }
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
      onClick={onClose}
      style={{ 
        background: `linear-gradient(135deg, ${song.color}20 0%, #000000 50%, ${song.color}10 100%)`
      }}
    >
      <div 
        className="text-center max-w-2xl mx-auto p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative mb-8">
          <img
            src={song.cover}
            alt={song.title}
            className="w-80 h-80 mx-auto rounded-2xl shadow-2xl object-cover"
            style={{ 
              boxShadow: `0 25px 50px -12px ${song.color}40` 
            }}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">{song.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{song.artist}</p>
          
          <div>
            <h2 className="text-2xl font-bold text-white">{t.musicTitle}</h2>
          </div>
        </div>

        <div className="mb-8">
          <div 
            className="w-full bg-white/20 rounded-full h-2 cursor-pointer mb-4"
            onClick={handleProgressBarClick}
          >
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${progress}%`,
                backgroundColor: song.color 
              }}
            />
          </div>
          
          <div className="flex justify-between text-sm text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-8 mb-8">
          <button
            onClick={onPrevious}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            disabled={currentSong === 0}
          >
            <SkipBack className="w-6 h-6" />
          </button>
          
          <button
            onClick={onTogglePlay}
            className="p-4 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 text-white"
            style={{ backgroundColor: `${song.color}40` }}
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </button>
          
          <button
            onClick={onNext}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
            disabled={currentSong === 0}
          >
            <SkipForward className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleMute}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
          >
            {volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume1 className="w-5 h-5" />
            )}
          </button>
          
          <div className="flex items-center gap-3">
            <span className="text-white text-sm">0</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-32 h-1 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${song.color} 0%, ${song.color} ${volume}%, rgba(255,255,255,0.2) ${volume}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <span className="text-white text-sm">100</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{t.clickToClose}</p>
      </div>
    </div>
  );
}