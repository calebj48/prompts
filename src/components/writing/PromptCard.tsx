import { type Prompt, GENRE_LABELS } from '../../types';

interface PromptCardProps {
  prompt: Prompt;
  onDifferentPrompt: () => void;
}

export function PromptCard({ prompt, onDifferentPrompt }: PromptCardProps) {
  return (
    <div className="prompt-card">
      <p className="prompt-card-text">{prompt.text}</p>
      <div className="prompt-card-footer">
        <span className="genre-badge">{GENRE_LABELS[prompt.genre]}</span>
        <span className="difficulty-badge">{prompt.difficulty}</span>
        <button
          className="btn-ghost"
          onClick={onDifferentPrompt}
          style={{ marginLeft: 'auto', padding: '0.2rem 0.75rem', fontSize: '0.8125rem' }}
        >
          Different prompt
        </button>
      </div>
    </div>
  );
}
