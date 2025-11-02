'use client';
import { profileData } from '@/lib/config';
import { LinkCard } from './LinkCard';
import { MusicPlayer } from './MusicPlayer';
import { TypewriterText } from './TypewriterText';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import { useEffect, useState } from 'react';
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
export function ProfileSection() {
  const { t } = useLanguage();
  const activeLinks = profileData.links.filter(link => link.isActive && link.id !== '0');
  const [songs, setSongs] = useState<Song[]>([]);
  useEffect(() => {
    fetch('/music/playlist.json')
      .then(res => res.json())
      .then(data => setSongs(data))
      .catch(err => console.error('Error loading playlist:', err));
  }, []);
  return (
    <div className="min-h-screen relative z-10">
      {}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6 pt-24">
        <div className="w-full max-w-lg mx-auto space-y-6">
          {}
          <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            {}
            <div className="text-center space-y-6">
              {}
              <div className="relative w-28 h-28 mx-auto">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-md opacity-60"></div>
                <Image
                  src={profileData.avatar}
                  alt={t.name}
                  width={112}
                  height={112}
                  className="relative w-full h-full rounded-full object-cover border-4 border-white/40 shadow-2xl"
                  priority
                />
              </div>
              {}
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-white drop-shadow-lg flex items-center justify-center gap-3">
                  {t.name}
                  <span className="text-2xl animate-bounce-subtle"></span>
                </h1>
                <TypewriterText 
                  text={t.bio}
                  className="text-white/90 text-lg font-medium leading-relaxed max-w-sm mx-auto block"
                  speed={50}
                />
              </div>
            </div>
          </div>
          {}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <h2 className="text-white/80 font-semibold text-lg mb-2">{t.connectWithMe}</h2>
              <p className="text-white/60 text-sm">{t.findMeOnPlatforms}</p>
            </div>
            {activeLinks.map((link, index) => (
              <div
                key={link.id}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="animate-slide-up"
              >
                <LinkCard link={link} />
              </div>
            ))}
          </div>
          {}
          {songs.length > 0 && (
            <div className="pt-4">
              <MusicPlayer songs={songs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
