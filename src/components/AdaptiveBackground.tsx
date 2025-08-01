'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
interface AdaptiveBackgroundProps {
  children: React.ReactNode;
}
export default function AdaptiveBackground({ children }: AdaptiveBackgroundProps) {
  const [animatedBackground, setAnimatedBackground] = useState(false); // Empezar con false por seguridad
  useEffect(() => {
    const updateBackgroundState = () => {
      const hasSeizureRisk = localStorage.getItem('has-seizure-risk') === 'true';
      const savedAnimatedBg = localStorage.getItem('animated-background');
      let useAnimatedBg;
      if (savedAnimatedBg !== null) {
        useAnimatedBg = savedAnimatedBg === 'true';
      } else {
        useAnimatedBg = !hasSeizureRisk;
        localStorage.setItem('animated-background', (!hasSeizureRisk).toString());
      }
      setAnimatedBackground(useAnimatedBg);
    };
    updateBackgroundState();
    const handleAnimatedBackgroundToggle = () => {
      updateBackgroundState();
    };
    const handleAccessibilityPreferenceSet = () => {
      updateBackgroundState();
    };
    window.addEventListener('animatedBackgroundToggle', handleAnimatedBackgroundToggle);
    window.addEventListener('accessibilityPreferenceSet', handleAccessibilityPreferenceSet);
    return () => {
      window.removeEventListener('animatedBackgroundToggle', handleAnimatedBackgroundToggle);
      window.removeEventListener('accessibilityPreferenceSet', handleAccessibilityPreferenceSet);
    };
  }, []);
  if (!animatedBackground) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
        {}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-purple-800/40 via-indigo-800/30 to-purple-900/50"
            style={{
              animation: 'gentlePulse 12s ease-in-out infinite alternate'
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-tr from-indigo-900/30 via-purple-700/20 to-blue-800/40"
            style={{
              animation: 'gentlePulse 16s ease-in-out infinite alternate-reverse'
            }}
          />
        </div>
        {}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
            style={{
              animation: 'gentleFloat 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl"
            style={{
              animation: 'gentleFloat 25s ease-in-out infinite reverse'
            }}
          />
          <div 
            className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-500/6 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: 'gentleFloat 30s ease-in-out infinite'
            }}
          />
        </div>
        {}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
                               radial-gradient(circle at 70% 30%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
                               radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.1) 0%, transparent 40%)`,
              animation: 'gentleShift 40s ease-in-out infinite alternate'
            }}
          />
        </div>
        {}
        <div className="absolute inset-0 bg-black/10"></div>
        {children}
      </div>
    );
  }
  return (
    <div className="min-h-screen relative overflow-hidden">
      {}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.gif"
          alt="Animated Background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/20 to-blue-900/30"></div>
      </div>
      {children}
    </div>
  );
}
