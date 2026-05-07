import { Link } from 'react-router-dom';
import { type Prompt, GENRE_LABELS } from '../../types';

interface HeroProps {
  dailyPrompt: Prompt;
}

export function Hero({ dailyPrompt }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-tagline">The blank page<br />is the practice.</h1>
        <p className="hero-sub">
          A daily writing prompt. Show up, write something real, track your streak.
          No account required to start.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <Link to="/write" className="btn-primary">
            Write today's prompt
          </Link>
          <Link to="/about" className="btn-ghost">
            What is this?
          </Link>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <span className="label-caps">Today's prompt</span>
        </div>
        <div className="prompt-card" style={{ maxWidth: '600px' }}>
          <p className="prompt-card-text">{dailyPrompt.text}</p>
          <div className="prompt-card-footer">
            <span className="genre-badge">{GENRE_LABELS[dailyPrompt.genre]}</span>
            <span className="difficulty-badge">{dailyPrompt.difficulty}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
