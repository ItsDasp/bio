'use client';
import { useState, useEffect } from 'react';
import { translations } from '@/lib/i18n';
export function useLanguage() {
  const [language, setLanguage] = useState<'en' | 'es'>('es');
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as 'en' | 'es';
    if (savedLanguage && ['en', 'es'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.startsWith('es') ? 'es' : 'en';
      setLanguage(browserLang);
    }
  }, []);
  const setAndSaveLanguage = (lang: 'en' | 'es') => {
    if (lang !== language) {
      localStorage.setItem('language', lang);
      window.location.reload();
    }
  };
  const t = translations[language];
  return { language, setLanguage: setAndSaveLanguage, t };
}
