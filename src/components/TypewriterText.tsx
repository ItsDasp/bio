'use client';
import { useState, useEffect } from 'react';
interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
}
export function TypewriterText({ text, speed = 50, className = '' }: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isEnabled, setIsEnabled] = useState(true);
  useEffect(() => {
    const savedTypewriter = localStorage.getItem('typewriter-effect');
    if (savedTypewriter !== null) {
      setIsEnabled(savedTypewriter === 'true');
    }
    const handleTypewriterToggle = () => {
      const newSetting = localStorage.getItem('typewriter-effect') === 'true';
      setIsEnabled(newSetting);
    };
    window.addEventListener('typewriterToggle', handleTypewriterToggle);
    return () => {
      window.removeEventListener('typewriterToggle', handleTypewriterToggle);
    };
  }, []);
  useEffect(() => {
    if (!isEnabled) {
      setDisplayText(text);
      setIsComplete(true);
      return;
    }
    setDisplayText('');
    setIsComplete(false);
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, isEnabled]);
  return (
    <span className={`${className} whitespace-pre-line`}>
      {displayText}
      {!isComplete && isEnabled && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
