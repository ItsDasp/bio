'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
interface AccessibilityModalProps {
  onComplete: (hasSeizureRisk: boolean) => void;
}
export default function AccessibilityModal({ onComplete }: AccessibilityModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();
  useEffect(() => {
    const hasAnswered = localStorage.getItem('seizure-preference-answered');
    if (!hasAnswered) {
      setIsVisible(true);
    }
  }, []);
  const handleResponse = (hasSeizureRisk: boolean) => {
    localStorage.setItem('seizure-preference-answered', 'true');
    localStorage.setItem('has-seizure-risk', hasSeizureRisk.toString());
    localStorage.setItem('animated-background', (!hasSeizureRisk).toString());
    onComplete(hasSeizureRisk);
    setIsVisible(false);
  };
  if (!isVisible) return null;
  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black z-40" />
      {/* Modal content (excluded from search snippets) */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        data-nosnippet
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-warning-title"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-md w-full p-6 animate-scale-in">
          <div className="text-center">
            {/* Warning icon */}
            <div className="mx-auto flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
              <svg className="w-6 h-6 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 id="accessibility-warning-title" className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {t.accessibility.warning.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">
              {t.accessibility.warning.description}
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleResponse(true)}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
              >
                {t.accessibility.warning.yes}
              </button>
              <button
                onClick={() => handleResponse(false)}
                className="w-full px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors font-medium"
              >
                {t.accessibility.warning.no}
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              {t.accessibility.warning.note}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
