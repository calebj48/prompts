import { type WritingSession } from '../../types';
import { SessionCard } from './SessionCard';

interface SessionGridProps {
  sessions: WritingSession[];
  onSelect: (session: WritingSession) => void;
}

export function SessionGrid({ sessions, onSelect }: SessionGridProps) {
  if (sessions.length === 0) {
    return (
      <div className="empty-state">
        <h3>No sessions yet</h3>
        <p>Your writing will appear here after you save your first session.</p>
      </div>
    );
  }

  return (
    <div className="session-grid">
      {sessions.map((s) => (
        <SessionCard key={s.id} session={s} onClick={() => onSelect(s)} />
      ))}
    </div>
  );
}
