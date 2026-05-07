import { type Genre, GENRE_LABELS } from '../../types';
import { GENRES } from '../../lib/prompts';

interface GenreFilterProps {
  selected: Genre | null;
  onChange: (genre: Genre | null) => void;
}

export function GenreFilter({ selected, onChange }: GenreFilterProps) {
  return (
    <div className="genre-filter">
      <button
        className={`genre-tab${selected === null ? ' genre-tab--active' : ''}`}
        onClick={() => onChange(null)}
      >
        Daily
      </button>
      {GENRES.map((genre) => (
        <button
          key={genre}
          className={`genre-tab${selected === genre ? ' genre-tab--active' : ''}`}
          onClick={() => onChange(genre)}
        >
          {GENRE_LABELS[genre]}
        </button>
      ))}
    </div>
  );
}
