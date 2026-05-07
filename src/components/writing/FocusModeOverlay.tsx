import { useRef, useEffect } from 'react';
import { formatDuration } from '../../lib/streakUtils';

interface FocusModeOverlayProps {
  value: string;
  onChange: (v: string) => void;
  wordCount: number;
  seconds: number;
  onExit: () => void;
}

export function FocusModeOverlay({
  value,
  onChange,
  wordCount,
  seconds,
  onExit,
}: FocusModeOverlayProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  return (
    <div className="focus-overlay">
      <div className="focus-hint">Press Esc or ⌘⇧F to exit focus mode</div>
      <textarea
        ref={ref}
        className="focus-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Begin here."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Writing area (focus mode)"
      />
      <div className="focus-meta">
        {wordCount} words{seconds > 0 ? ` · ${formatDuration(seconds)}` : ''}
        <button
          onClick={onExit}
          style={{
            marginLeft: '1rem',
            background: 'none',
            border: 'none',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontFamily: 'var(--font-mono)',
          }}
        >
          exit
        </button>
      </div>
    </div>
  );
}
