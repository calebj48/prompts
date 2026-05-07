import { type SessionStats } from '../../types';
import { formatDuration } from '../../lib/streakUtils';
import { Modal } from '../ui/Modal';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface SessionStatsModalProps {
  stats: SessionStats;
  onClose: () => void;
  onWriteAgain: () => void;
}

export function SessionStatsModal({ stats, onClose, onWriteAgain }: SessionStatsModalProps) {
  const { user, openAuthModal } = useAuth();

  return (
    <Modal isOpen onClose={onClose} overlayClassName="stats-overlay">
      <div className="stats-panel">
        <p className="stats-encouragement">
          {stats.encouragement}
        </p>
        <div className="stats-grid">
          <div className="stats-item">
            <div className="stats-value">{stats.word_count}</div>
            <div className="stats-label">Words</div>
          </div>
          <div className="stats-item">
            <div className="stats-value">{formatDuration(stats.duration_seconds)}</div>
            <div className="stats-label">Time</div>
          </div>
          <div className="stats-item">
            <div className="stats-value stats-value--accent">
              {stats.current_streak}
              {stats.is_new_streak_record && (
                <span className="stats-record-badge">Record</span>
              )}
            </div>
            <div className="stats-label">Day streak</div>
          </div>
          <div className="stats-item">
            <div className="stats-value">{stats.longest_streak}</div>
            <div className="stats-label">Longest streak</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={onWriteAgain}>
            Write again tomorrow
          </button>
          {user ? (
            <Link to="/archive" className="btn-ghost" onClick={onClose}>
              View archive
            </Link>
          ) : (
            <button
              className="btn-ghost"
              onClick={() => {
                onClose();
                openAuthModal('signup');
              }}
            >
              Save your streak
            </button>
          )}
          <button className="btn-ghost" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
