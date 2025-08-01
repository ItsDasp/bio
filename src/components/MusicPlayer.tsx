'use client';

import { useState, useEffect } from 'react';
import { useMusic } from '@/contexts/MusicContext';
import { useLanguage } from '@/hooks/useLanguage';
import { useIdleTimer } from '@/hooks/useIdleTimer';
import { MusicScreensaver } from './MusicScreensaver';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward, Expand, Volume2, VolumeX } from 'lucide-react';

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

interface MusicPlayerProps {
  songs: Song[];
}

export function MusicPlayer({ songs }: MusicPlayerProps) {
  const { t } = useLanguage();
  const { 
    initializeSongs, 
    songs: contextSongs,
    currentSong, 
    isPlaying, 
    currentTime, 
    duration, 
    volume,
    playPause, 
    nextSong, 
    previousSong, 
    seekTo, 
    setVolume,
    playSong
  } = useMusic();

  const [isExpanded, setIsExpanded] = useState(false);
  const [forceScreensaver, setForceScreensaver] = useState(false);

  useEffect(() => {
    if (songs.length > 0) {
      initializeSongs(songs);
    }
  }, [songs, initializeSongs]);

  const { isIdle, resetTimer } = useIdleTimer(30000);

  const showScreensaver = (isIdle || forceScreensaver) && isPlaying && contextSongs.length > 0;

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
    const newTime = (clickX / rect.width) * duration;
    seekTo(newTime);
    resetTimer();
  };

  const handleVolumeChange = (e: React.MouseEvent<HTMLDivElement>) => {
    resetTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setVolume(newVolume);
  };

  const handleSongSelect = (index: number) => {
    playSong(index);
    resetTimer();
  };

  const handlePrevious = () => {
    previousSong();
    resetTimer();
  };

  const handleNext = () => {
    nextSong();
    resetTimer();
  };

  const handlePlayPause = () => {
    playPause();
    resetTimer();
  };

  const forceShowScreensaver = () => {
    setIsExpanded(false);
    setForceScreensaver(true);
  };

  const closeScreensaver = () => {
    resetTimer();
    setForceScreensaver(false);
  };

  if (contextSongs.length === 0) return null;

  const currentSongData = contextSongs[currentSong];
  if (!currentSongData) return null;

  if (showScreensaver) {
    return (
      <MusicScreensaver
        song={currentSongData}
        isPlaying={isPlaying}
        currentTime={currentTime}
        duration={duration}
        onTogglePlay={handlePlayPause}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onSeek={seekTo}
        onClose={closeScreensaver}
        formatTime={formatTime}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div 
        className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:bg-white/10"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🎵</span>
            </div>
            <div>
              <h3 className="text-white font-semibold text-base">{t.musicTitle}</h3>
              <p className="text-white/60 text-xs">
                {isPlaying ? `♪ ${currentSongData.title}` : `${contextSongs.length} ${t.songs}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isExpanded && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePlayPause();
                }}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white" />
                )}
              </button>
            )}
            <div className={`text-white/60 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-2xl p-6 space-y-6 animate-slide-up">
          <div 
            className="relative overflow-hidden rounded-2xl p-6 text-center"
            style={{
              background: `linear-gradient(135deg, ${currentSongData.color}20, ${currentSongData.color}10)`,
            }}
          >
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden relative">
                {currentSongData.cover ? (
                  <Image
                    src={currentSongData.cover}
                    alt={`${currentSongData.title} cover`}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center text-xs text-white"
                    style={{ background: currentSongData.color }}
                  >
                    🎵
                  </div>
                )}
                <div 
                  className={`w-full h-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center ${currentSongData.cover ? 'absolute inset-0 -z-10' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${currentSongData.color}, ${currentSongData.color}80)`,
                  }}
                >
                  <span className="text-white text-3xl">🎵</span>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold text-xl mb-1">{currentSongData.title}</h4>
                <p className="text-white/80 text-lg">{currentSongData.artist}</p>
              </div>

              <div className="space-y-2">
                <div 
                  className="w-full h-2 bg-white/20 rounded-full cursor-pointer overflow-hidden"
                  onClick={handleProgressClick}
                >
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-300"
                    style={{ 
                      width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                      background: `linear-gradient(90deg, ${currentSongData.color}, ${currentSongData.color}80)`
                    }}
                  />
                </div>
                <div className="flex justify-between text-white/70 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={forceShowScreensaver}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                  title={t.openFullscreen}
                >
                  <Expand className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
                >
                  <SkipBack className="w-4 h-4 text-white" />
                </button>

                <button
                  onClick={handlePlayPause}
                  className="w-12 h-12 bg-white/30 hover:bg-white/40 rounded-xl flex items-center justify-center transition-all hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 text-white" />
                  ) : (
                    <Play className="w-6 h-6 text-white" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all"
                >
                  <SkipForward className="w-4 h-4 text-white" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setVolume(volume > 0 ? 0 : 70)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all"
                  >
                    {volume > 0 ? (
                      <Volume2 className="w-4 h-4 text-white" />
                    ) : (
                      <VolumeX className="w-4 h-4 text-white" />
                    )}
                  </button>

                  <div 
                    className="w-16 h-2 bg-white/20 rounded-full cursor-pointer"
                    onClick={handleVolumeChange}
                  >
                    <div 
                      className="h-full bg-white rounded-full transition-all"
                      style={{ width: `${volume}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white/80 font-medium text-sm mb-3">Playlist</h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {contextSongs.map((song, index) => (
                <div
                  key={song.id}
                  onClick={() => handleSongSelect(index)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    index === currentSong 
                      ? 'bg-white/20 border border-white/30' 
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                    {song.cover ? (
                      <Image
                        src={song.cover}
                        alt={song.title}
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div 
                        className="w-full h-full flex items-center justify-center text-xs text-white"
                        style={{ background: song.color }}
                      >
                        🎵
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{song.title}</p>
                    <p className="text-white/60 text-xs truncate">{song.artist}</p>
                  </div>
                  <div className="text-white/40 text-xs">{song.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
