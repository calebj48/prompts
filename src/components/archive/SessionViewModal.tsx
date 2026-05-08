import { useNavigate } from 'react-router-dom';
import { type WritingSession, GENRE_LABELS } from '../../types';
import { Modal } from '../ui/Modal';
import { formatDuration } from '../../lib/streakUtils';

interface SessionViewModalProps {
  session: WritingSession;
  onClose: () => void;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function SessionViewModal({ session, onClose }: SessionViewModalProps) {
  const navigate = useNavigate();

  const handleWriteVariation = () => {
    onClose();
    navigate('/write', { state: { promptId: session.prompt_id } });
  };

  return (
    <Modal isOpen onClose={onClose} overlayClassName="session-view-overlay">
      <div className="session-view-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span className="genre-badge">{GENRE_LABELS[session.genre]}</span>
            <span className="mono" style={{ color: 'var(--color-text-muted)', alignSelf: 'center' }}>
              {formatDate(session.created_at)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.25rem', lineHeight: 1, flexShrink: 0 }}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <blockquote className="session-view-prompt">
          {session.prompt_text}
        </blockquote>

        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
          <span className="label-caps">{session.word_count} words</span>
          {session.duration_seconds > 0 && (
            <span className="label-caps">{formatDuration(session.duration_seconds)}</span>
          )}
        </div>

        <div className="session-view-body">{session.body}</div>

        <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-surface)' }}>
          <button className="btn-ghost" onClick={handleWriteVariation} style={{ fontSize: '0.875rem' }}>
            Write another variation on this prompt
          </button>
        </div>
      </div>
    </Modal>
  );
}
