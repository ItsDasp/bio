'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import SeizureWarningModal from './SeizureWarningModal';
interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}
export function Settings({ isOpen, onClose }: SettingsProps) {
  const { language, setLanguage, t } = useLanguage();
  const [animatedBackground, setAnimatedBackground] = useState(true);
  const [typewriterEffect, setTypewriterEffect] = useState(true);
  const [showSeizureWarning, setShowSeizureWarning] = useState(false);
  useEffect(() => {
    const hasSeizureRisk = localStorage.getItem('has-seizure-risk') === 'true';
    const savedAnimatedBg = localStorage.getItem('animated-background');
    const savedTypewriter = localStorage.getItem('typewriter-effect');
    if (savedAnimatedBg !== null) {
      setAnimatedBackground(savedAnimatedBg === 'true');
    } else {
      setAnimatedBackground(!hasSeizureRisk);
    }
    if (savedTypewriter !== null) {
      setTypewriterEffect(savedTypewriter === 'true');
    }
  }, [isOpen]); // Actualizar cuando se abra el modal
  const handleAnimatedBackgroundToggle = () => {
    const hasSeizureRisk = localStorage.getItem('has-seizure-risk') === 'true';
    if (!animatedBackground && hasSeizureRisk) {
      setShowSeizureWarning(true);
      return;
    }
    toggleAnimatedBackground();
  };
  const toggleAnimatedBackground = () => {
    const newValue = !animatedBackground;
    setAnimatedBackground(newValue);
    localStorage.setItem('animated-background', newValue.toString());
    window.dispatchEvent(new CustomEvent('animatedBackgroundToggle'));
  };
  const handleSeizureWarningConfirm = () => {
    setShowSeizureWarning(false);
    toggleAnimatedBackground();
  };
  const handleSeizureWarningCancel = () => {
    setShowSeizureWarning(false);
  };
  const handleTypewriterToggle = () => {
    const newValue = !typewriterEffect;
    setTypewriterEffect(newValue);
    localStorage.setItem('typewriter-effect', newValue.toString());
    window.dispatchEvent(new CustomEvent('typewriterToggle'));
  };
  const handleLanguageChange = (newLang: 'en' | 'es') => {
    setLanguage(newLang);
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      {}
      <div className="relative w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl animate-scale-in">
        {}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">{t.settings}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="m18 6-12 12"/>
              <path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        {}
        <div className="space-y-6">
          {}
          <div>
            <h3 className="text-white font-medium mb-3">{t.language}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleLanguageChange('en')}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  language === 'en' 
                    ? 'bg-white/20 border border-white/30 text-white' 
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                🇺🇸 {t.english}
              </button>
              <button
                onClick={() => handleLanguageChange('es')}
                className={`flex-1 p-3 rounded-xl transition-all ${
                  language === 'es' 
                    ? 'bg-white/20 border border-white/30 text-white' 
                    : 'bg-white/5 border border-white/10 text-white/60 hover:bg-white/10'
                }`}
              >
                🇪🇸 {t.spanish}
              </button>
            </div>
          </div>
          {}
          <div>
            <h3 className="text-white font-medium mb-3">{t.accessibilityTitle}</h3>
            <div className="space-y-3">
              {}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">{t.animatedBackground}</p>
                  <p className="text-white/60 text-xs">Disable for seizure sensitivity</p>
                </div>
                <button
                  onClick={handleAnimatedBackgroundToggle}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    animatedBackground ? 'bg-purple-500' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      animatedBackground ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              {}
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-white font-medium">{t.typewriterEffect}</p>
                  <p className="text-white/60 text-xs">{t.animatedBioText}</p>
                </div>
                <button
                  onClick={handleTypewriterToggle}
                  className={`relative w-12 h-6 rounded-full transition-all ${
                    typewriterEffect ? 'bg-purple-500' : 'bg-white/20'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 bg-white rounded-full transition-transform top-0.5 ${
                      typewriterEffect ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="mt-6 pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs text-center">
            Settings are saved locally in your browser
          </p>
        </div>
      </div>
      {}
      <SeizureWarningModal
        isVisible={showSeizureWarning}
        onConfirm={handleSeizureWarningConfirm}
        onCancel={handleSeizureWarningCancel}
      />
    </div>
  );
}
