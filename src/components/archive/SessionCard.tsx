import { type WritingSession, GENRE_LABELS } from '../../types';

interface SessionCardProps {
  session: WritingSession;
  onClick: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function SessionCard({ session, onClick }: SessionCardProps) {
  return (
    <div className="session-card" onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className="session-card-meta">
        <span className="genre-badge">{GENRE_LABELS[session.genre]}</span>
        <span className="mono" style={{ color: 'var(--color-text-muted)' }}>
          {formatDate(session.created_at)}
        </span>
      </div>
      <p className="session-card-excerpt">{session.body}</p>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <span className="label-caps">{session.word_count} words</span>
      </div>
    </div>
  );
}
