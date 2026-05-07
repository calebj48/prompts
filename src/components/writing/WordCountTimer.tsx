import { formatDuration } from '../../lib/streakUtils';

interface WordCountTimerProps {
  wordCount: number;
  seconds: number;
  canSave: boolean;
  isSaving: boolean;
  isFocused: boolean;
  onSave: () => void;
  onToggleFocus: () => void;
}

export function WordCountTimer({
  wordCount,
  seconds,
  canSave,
  isSaving,
  isFocused,
  onSave,
  onToggleFocus,
}: WordCountTimerProps) {
  return (
    <div className="writing-meta">
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <span className="writing-meta-stat">
          <span>{wordCount}</span> words
        </span>
        {seconds > 0 && (
          <span className="writing-meta-stat">
            <span>{formatDuration(seconds)}</span>
          </span>
        )}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          className="btn-ghost"
          onClick={onToggleFocus}
          title="Focus mode (⌘⇧F)"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8125rem' }}
        >
          {isFocused ? 'Exit focus' : 'Focus'}
        </button>
        <button
          className="btn-primary"
          onClick={onSave}
          disabled={!canSave || isSaving}
          style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}
          title={canSave ? 'Save your session' : 'Write at least 10 words to save'}
        >
          {isSaving ? 'Saving…' : 'Save & finish'}
        </button>
      </div>
    </div>
  );
}
