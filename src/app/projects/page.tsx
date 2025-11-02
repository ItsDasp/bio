"use client";
import AccessibilityProvider from '@/components/AccessibilityProvider';
import { useLanguage } from '@/hooks/useLanguage';
import { profileData } from '@/lib/config';
import Image from 'next/image';

function ProjectsContent() {
  const { t } = useLanguage();
  const senko = profileData.links.find(l => l.id === '0' && l.isActive);

  return (
    <div className="relative z-10 py-24 px-6">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <div className="mb-2">
          <h1 className="text-white font-bold text-2xl">{t.projects}</h1>
        </div>

        {senko && (
          <button
            onClick={() => window.open(senko.url, '_blank', 'noopener,noreferrer')}
            className="group w-full backdrop-blur-2xl bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 rounded-3xl p-6 lg:p-8 transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl relative overflow-hidden text-left"
            style={{
              boxShadow: `0 0 0 2px ${senko.color}40 inset, 0 10px 40px ${senko.color}15, 0 4px 20px rgba(0,0,0,0.1)`,
            }}
          >
            <div 
              className="absolute inset-0 opacity-35 group-hover:opacity-50 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${senko.color}10, transparent 50%, ${senko.color}05)`,
              }}
            />
              <div className="relative z-10 grid grid-cols-[auto,1fr,auto] items-center gap-6">
              <div className="flex-shrink-0 relative">
                <div 
                  className="absolute inset-0 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"
                  style={{
                    background: `linear-gradient(135deg, ${senko.color}, ${senko.color}80)`,
                  }}
                />
                <div 
                  className="relative w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center bg-white/20 group-hover:bg-white/25 border border-white/30 transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${senko.color}30, ${senko.color}15)`,
                  }}
                >
                  <Image
                    src="https://i.imgur.com/JkubEXf.jpeg"
                    alt="Senko Bot"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-white text-2xl font-bold mb-1">Senko Bot</h2>
                <p className="text-white/90 text-[0.95rem] mb-4">{t.discordBotPromo}</p>
                <div className="flex flex-wrap items-center gap-2 mb-0">
                  <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/85">{t.moderation}</span>
                  <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-white/10 border border-white/20 text-white/85">{t.utilities}</span>
                </div>
              </div>
              {/* No extra CTA button; the whole card is clickable to keep the layout clean */}
              <div className="flex-shrink-0 w-8 h-8 text-white/80 group-hover:text-white transition-all duration-300 group-hover:translate-x-2 justify-self-end">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <AccessibilityProvider>
      <ProjectsContent />
    </AccessibilityProvider>
  );
}
