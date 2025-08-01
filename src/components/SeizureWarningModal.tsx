'use client';
import { useLanguage } from '@/hooks/useLanguage';
interface SeizureWarningModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}
export default function SeizureWarningModal({ isVisible, onConfirm, onCancel }: SeizureWarningModalProps) {
  const { t } = useLanguage();
  if (!isVisible) return null;
  return (
    <>
      {}
      <div className="fixed inset-0 bg-black z-40" />
      {}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-red-500 max-w-md w-full p-6 animate-scale-in">
          <div className="text-center">
            {}
            <div className="mx-auto flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
              {t.accessibility.seizureWarning.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm leading-relaxed font-medium">
              {t.accessibility.seizureWarning.message}
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
              <p className="text-red-800 dark:text-red-300 text-xs font-semibold">
                {t.accessibility.seizureWarning.disclaimer}
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={onCancel}
                className="w-full px-4 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                {t.accessibility.seizureWarning.cancel}
              </button>
              <button
                onClick={onConfirm}
                className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium border-2 border-red-400"
              >
                {t.accessibility.seizureWarning.confirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
