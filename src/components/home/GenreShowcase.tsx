import { useEffect, useRef, useState } from 'react';
import { GENRES } from '../../lib/prompts';
import { getShowcasePrompt } from '../../lib/promptUtils';
import { GENRE_LABELS } from '../../types';

const INTERVAL_MS = 3000;

export function GenreShowcase() {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = (next: number) => {
    setIndex(next);
    setKey((k) => k + 1);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % GENRES.length;
        setKey((k) => k + 1);
        return next;
      });
    }, INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const genre = GENRES[index];
  const showcase = getShowcasePrompt(genre);

  return (
    <section className="genre-showcase">
      <div className="genre-showcase-inner">
        <div className="label-caps" style={{ marginBottom: '1rem' }}>
          Genres
        </div>
        <div key={key}>
          <div className="showcase-genre-label">{GENRE_LABELS[genre]}</div>
          <p className="showcase-prompt">"{showcase.text}"</p>
        </div>
        <div className="showcase-dots">
          {GENRES.map((_, i) => (
            <button
              key={i}
              className={`showcase-dot${i === index ? ' showcase-dot--active' : ''}`}
              onClick={() => advance(i)}
              aria-label={`Show ${GENRE_LABELS[GENRES[i]]}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
