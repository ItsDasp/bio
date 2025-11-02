'use client';
import { Link } from '@/types';
import { useLanguage } from '@/hooks/useLanguage';
import SocialIcon from './SocialIcon';
import Image from 'next/image';
interface LinkCardProps {
  link: Link;
}
export function LinkCard({ link }: LinkCardProps) {
  const { t } = useLanguage();
  const isFeatured = link.id === '0';
  const getLinkTitle = (linkTitle: string): string => {
    const titleMap: Record<string, string> = {
      'GitHub': t.github,
      'Portfolio': t.portfolio, 
      'Twitter': t.twitter,
      'Email': t.email,
      'Discord': t.discord
    };
    return titleMap[linkTitle] || linkTitle;
  };
  const handleClick = () => {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  };
  return (
    <button
      onClick={handleClick}
      className={
        `group w-full backdrop-blur-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:-translate-y-1 relative overflow-hidden ` +
        (isFeatured ? ' p-6 lg:p-7 scale-[1.01] ' : ' p-5 ')
      }
      style={{
        boxShadow: `${isFeatured && link.color ? `0 0 0 2px ${link.color}55 inset, ` : ''}0 10px 40px ${link.color}15, 0 4px 20px rgba(0,0,0,0.1)`,
      }}
    >
      {isFeatured && (
        <div
          className="absolute top-0 left-0 right-0 h-1.5 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${link.color}66, transparent)`,
          }}
        />
      )}
      <div 
        className={`absolute inset-0 transition-opacity duration-300 ${isFeatured ? 'opacity-40' : 'opacity-0'} group-hover:opacity-100`}
        style={{
          background: `linear-gradient(135deg, ${link.color}10, transparent 50%, ${link.color}05)`,
        }}
      />
      <div className="flex items-center space-x-5 relative z-10">
        <div className="flex-shrink-0 relative">
          <div 
            className={`absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity ${isFeatured ? 'animate-pulse' : ''}`}
            style={{
              background: `linear-gradient(135deg, ${link.color}, ${link.color}80)`,
            }}
          />
          <div 
            className={`relative ${isFeatured ? 'w-16 h-16' : 'w-14 h-14'} rounded-2xl flex items-center justify-center bg-white/20 group-hover:bg-white/25 border border-white/30 transition-all duration-300 group-hover:scale-110 overflow-hidden`}
            style={{
              background: `linear-gradient(135deg, ${link.color}30, ${link.color}15)`,
            }}
          >
            {isFeatured ? (
              <Image
                src="https://i.imgur.com/JkubEXf.jpeg"
                alt="Senko Bot"
                width={isFeatured ? 56 : 48}
                height={isFeatured ? 56 : 48}
                className="rounded-xl object-cover w-14 h-14"
                priority
              />
            ) : (
              <SocialIcon 
                icon={link.icon} 
                className="w-7 h-7 text-white drop-shadow-lg" 
              />
            )}
          </div>
        </div>
        <div className="flex-1 text-left">
          <h3 className={`font-bold text-white ${isFeatured ? 'text-xl' : 'text-lg'} group-hover:text-white/95 transition-colors mb-1`}>
            {getLinkTitle(link.title)}
          </h3>
          <p className={`transition-colors ${isFeatured ? 'text-white/90 text-[0.95rem]' : 'text-white/70 group-hover:text-white/60 text-sm'}`}>
            {isFeatured ? t.discordBotPromo : t.visitLink}
          </p>
        </div>
        <div className={`flex-shrink-0 ${isFeatured ? 'w-7 h-7' : 'w-6 h-6'} text-white/60 group-hover:text-white/90 transition-all duration-300 group-hover:translate-x-2`}>
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </div>
      </div>
    </button>
  );
}
