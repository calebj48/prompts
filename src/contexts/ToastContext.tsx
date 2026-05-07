import { createContext, useCallback, useRef, useState } from 'react';
import { type ToastMessage } from '../types';

interface ToastContextValue {
  toasts: ToastMessage[];
  addToast: (
    message: string,
    type: ToastMessage['type'],
    options?: { duration?: number; cta?: ToastMessage['cta'] },
  ) => void;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const timeouts = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const t = timeouts.current.get(id);
    if (t) {
      clearTimeout(t);
      timeouts.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (
      message: string,
      type: ToastMessage['type'],
      options?: { duration?: number; cta?: ToastMessage['cta'] },
    ) => {
      const id = crypto.randomUUID();
      const duration = options?.duration ?? 4500;
      setToasts((prev) => [...prev, { id, message, type, duration, cta: options?.cta }]);
      const t = setTimeout(() => removeToast(id), duration);
      timeouts.current.set(id, t);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}
