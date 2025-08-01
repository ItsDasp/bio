'use client';
import { useState, useEffect } from 'react';
import AccessibilityModal from './AccessibilityModal';
import AdaptiveBackground from './AdaptiveBackground';
interface AccessibilityProviderProps {
  children: React.ReactNode;
}
export default function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const hasAnswered = localStorage.getItem('seizure-preference-answered');
    if (!hasAnswered) {
      setShowModal(true);
    }
  }, []);
  const handleAccessibilityResponse = (hasSeizureRisk: boolean) => {
    setShowModal(false);
    window.dispatchEvent(new CustomEvent('accessibilityPreferenceSet', {
      detail: { hasSeizureRisk }
    }));
  };
  return (
    <>
      <AdaptiveBackground>
        {children}
      </AdaptiveBackground>
      {showModal && (
        <AccessibilityModal onComplete={handleAccessibilityResponse} />
      )}
    </>
  );
}
