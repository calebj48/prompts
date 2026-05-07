import { useEffect, useRef } from 'react';

interface WritingAreaProps {
  value: string;
  onChange: (v: string) => void;
  onFirstKeystroke: () => void;
  disabled?: boolean;
}

export function WritingArea({ value, onChange, onFirstKeystroke, disabled }: WritingAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const started = useRef(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!started.current && e.target.value.length > 0) {
      started.current = true;
      onFirstKeystroke();
    }
    onChange(e.target.value);
  };

  return (
    <div className="writing-area-wrapper">
      <textarea
        ref={ref}
        className="writing-area"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Begin here."
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        aria-label="Writing area"
      />
    </div>
  );
}
