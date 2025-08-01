'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { languages } from '@/lib/i18n';
import { Languages } from 'lucide-react';
import { useState } from 'react';
export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
        aria-label={t.language}
      >
        <Languages className="w-5 h-5" />
        <span className="text-sm font-medium">
          {languages.find(l => l.code === language)?.flag}
        </span>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-3 ${
                language === lang.code ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : ''
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span className="text-sm">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
