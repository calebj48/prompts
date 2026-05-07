import { useEffect, useRef, useState } from 'react';
import { type ToastMessage } from '../../types';

interface ToastProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

export function Toast({ toast, onRemove }: ToastProps) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = () => {
    setExiting(true);
    timerRef.current = setTimeout(() => onRemove(toast.id), 200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const icon =
    toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : '·';

  return (
    <div className={`toast toast--${toast.type}${exiting ? ' toast--exiting' : ''}`}>
      <span className="toast-icon mono" aria-hidden="true">
        {icon}
      </span>
      <div className="toast-message">
        {toast.message}
        {toast.cta && (
          <div>
            <button
              className="toast-cta"
              onClick={() => {
                toast.cta!.action();
                handleClose();
              }}
            >
              {toast.cta.label}
            </button>
          </div>
        )}
      </div>
      <button className="toast-close" onClick={handleClose} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
