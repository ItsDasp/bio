'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { useMusic } from '@/contexts/MusicContext';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react';
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
interface MusicScreensaverProps {
  song: Song;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onClose: () => void;
  onPlayPause: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  formatTime: (time: number) => string;
}
export function MusicScreensaver({
  song,
  isPlaying,
  currentTime,
  duration,
  onClose,
  onPlayPause,
  onPrevious,
  onNext,
  onProgressClick,
  formatTime
}: MusicScreensaverProps) {
  const { t } = useLanguage();
  const { songs, currentSong, volume, setVolume } = useMusic();
  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    setVolume(newVolume);
  };
  const handleMute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(0.7); // Restore to 70%
    }
  };
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in fade-in duration-1000"
      onClick={onClose}
    >
      <div 
        className="max-w-2xl w-full mx-4 p-8 rounded-3xl bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 duration-700"
        onClick={(e) => e.stopPropagation()}
      >
        {}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-full bg-primary-500/20">
            <Music className="w-6 h-6 text-primary-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{t.musicTitle}</h2>
            <p className="text-gray-400">{songs.length} {t.songs}</p>
          </div>
        </div>
        {}
        <div className="mb-8">
          {}
          <div className="text-center mb-6">
            <div className="relative group inline-block mb-4">
              <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-2xl mx-auto">
                <Image
                  src={song.cover || '/music/covers/default.jpg'}
                  alt={song.title || ''}
                  width={192}
                  height={192}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div 
                className="absolute inset-0 rounded-2xl opacity-20"
                style={{ backgroundColor: song.color || '#8b5cf6' }}
              />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {song.title}
            </h3>
            <p className="text-xl text-gray-300 mb-6">
              {song.artist}
            </p>
          </div>
          {}
          <div className="mb-6">
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden mb-2">
              <div 
                className="h-full bg-gradient-to-r transition-all duration-300 ease-out"
                style={{ 
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${song.color || '#8b5cf6'}, ${song.color || '#8b5cf6'}80)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          {}
          <div className="flex items-center justify-center gap-8 mb-6">
            <button
              onClick={onPrevious}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
              disabled={currentSong === 0}
            >
              <SkipBack className="w-6 h-6" />
            </button>
            <button
              onClick={onPlayPause}
              className="p-5 rounded-full transition-all text-white shadow-xl hover:shadow-2xl transform hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${song.color || '#8b5cf6'}, ${song.color || '#8b5cf6'}80)`
              }}
            >
              {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
            </button>
            <button
              onClick={onNext}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white disabled:opacity-50"
              disabled={currentSong === songs.length - 1}
            >
              <SkipForward className="w-6 h-6" />
            </button>
          </div>
          {}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={handleMute}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
            >
              {volume === 0 ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5 6 9H2v6h4l5 4V5z"/>
                  <line x1="23" y1="9" x2="17" y2="15"/>
                  <line x1="17" y1="9" x2="23" y2="15"/>
                </svg>
              ) : volume < 0.5 ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5 6 9H2v6h4l5 4V5z"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 5 6 9H2v6h4l5 4V5z"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
              )}
            </button>
            <div className="w-32">
              <div 
                className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden relative"
                onClick={handleVolumeChange}
              >
                <div 
                  className="h-full rounded-full transition-all duration-200"
                  style={{ 
                    width: `${volume * 100}%`,
                    background: `linear-gradient(90deg, ${song.color || '#8b5cf6'}, ${song.color || '#8b5cf6'}80)`
                  }}
                />
                <div 
                  className="absolute top-1/2 w-3 h-3 bg-white rounded-full transform -translate-y-1/2 shadow-lg opacity-0 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
                  style={{ 
                    left: `calc(${volume * 100}% - 6px)`,
                    background: song.color || '#8b5cf6'
                  }}
                />
              </div>
            </div>
            <span className="text-white/60 text-sm font-medium min-w-[2.5rem] text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
        {}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Click anywhere to close
          </p>
        </div>
      </div>
    </div>
  );
}
