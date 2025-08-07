import { useState, useEffect } from 'react';

/**
 * Print text with typewriter effect
 *
 * @param text The text to write
 * @param speed Writing speed in milliseconds
 *
 * @returns The printed text
 */
export function useTypewriter(text: string, speed: number = 200) {
  const [current, setCurrent] = useState<string>('');

  useEffect(() => {
    setCurrent('');

    if (!text) {
      return;
    }

    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev.length === text.length) {
          clearInterval(interval);
          return prev;
        }

        return prev + text[prev.length];
      });
    }, speed);

    return () => {
      clearInterval(interval);
    };
  }, [text, speed]);

  return current;
}
