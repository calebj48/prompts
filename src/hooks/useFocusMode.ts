import { useCallback, useEffect, useState } from 'react';

export function useFocusMode() {
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocusMode = useCallback(() => {
    setIsFocused((prev) => !prev);
  }, []);

  const exitFocusMode = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'f' && e.shiftKey && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleFocusMode();
      }
      if (e.key === 'Escape' && isFocused) {
        exitFocusMode();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isFocused, toggleFocusMode, exitFocusMode]);

  useEffect(() => {
    if (isFocused) {
      document.body.classList.add('focus-mode');
    } else {
      document.body.classList.remove('focus-mode');
    }
    return () => document.body.classList.remove('focus-mode');
  }, [isFocused]);

  return { isFocused, toggleFocusMode, exitFocusMode };
}
