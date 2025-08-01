'use client';
import { useState, useEffect, useCallback } from 'react';
export function useIdleTimer(timeout: number = 30000) {
  const [isIdle, setIsIdle] = useState(false);
  const resetTimer = useCallback(() => {
    setIsIdle(false);
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleActivity = () => {
      resetTimer();
      clearTimeout(timer);
      timer = setTimeout(() => setIsIdle(true), timeout);
    };
    const events = [
      'mousedown',
      'mousemove', 
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];
    timer = setTimeout(() => setIsIdle(true), timeout);
    events.forEach(event => {
      document.addEventListener(event, handleActivity, true);
    });
    return () => {
      clearTimeout(timer);
      events.forEach(event => {
        document.removeEventListener(event, handleActivity, true);
      });
    };
  }, [timeout, resetTimer]);
  return { isIdle, resetTimer };
}
