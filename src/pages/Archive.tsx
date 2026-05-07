import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { type Genre, GENRE_LABELS, type WritingSession } from '../types';
import { GENRES } from '../lib/prompts';
import { useAuth } from '../hooks/useAuth';
import { SessionGrid } from '../components/archive/SessionGrid';
import { SessionViewModal } from '../components/archive/SessionViewModal';

export function Archive() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<WritingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterGenre, setFilterGenre] = useState<Genre | ''>('');
  const [selected, setSelected] = useState<WritingSession | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    supabase
      .from('writing_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (!error && data) setSessions(data as WritingSession[]);
        setLoading(false);
      });
  }, [user]);

  const filtered = filterGenre
    ? sessions.filter((s) => s.genre === filterGenre)
    : sessions;

  return (
    <div className="page-container">
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 className="heading-serif" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Archive
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
          {sessions.length} session{sessions.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="archive-filters">
        <select
          className="filter-select"
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value as Genre | '')}
        >
          <option value="">All genres</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {GENRE_LABELS[g]}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading…</div>
      ) : (
        <SessionGrid sessions={filtered} onSelect={setSelected} />
      )}

      {selected && (
        <SessionViewModal session={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
