'use client';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { Settings } from './Settings';
import { Home, Settings as SettingsIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export function Header() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [showSettings, setShowSettings] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/5 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {}
          <nav className="flex items-center space-x-2">
            <Link
              href="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                pathname === '/' 
                  ? 'bg-white/15 text-white shadow-lg backdrop-blur-sm border border-white/20' 
                  : 'hover:bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-sm font-medium">{t.home}</span>
            </Link>
          </nav>
          {}
          <button
            onClick={() => setShowSettings(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/10"
          >
            <SettingsIcon className="w-4 h-4" />
            <span className="text-sm font-medium">{t.settings}</span>
          </button>
        </div>
      </header>
      {}
      <Settings 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </>
  );
}
