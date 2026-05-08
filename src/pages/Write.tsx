import { useState, useCallback, useRef } from 'react';
import { type Genre, type Prompt } from '../types';
import { getDailyPrompt, getPromptForGenre } from '../lib/promptUtils';
import { prompts } from '../lib/prompts';
import { GenreFilter } from '../components/writing/GenreFilter';
import { PromptCard } from '../components/writing/PromptCard';
import { WritingArea } from '../components/writing/WritingArea';
import { WordCountTimer } from '../components/writing/WordCountTimer';
import { FocusModeOverlay } from '../components/writing/FocusModeOverlay';
import { SessionStatsModal } from '../components/writing/SessionStatsModal';
import { useWritingSession } from '../hooks/useWritingSession';
import { useTimer } from '../hooks/useTimer';
import { useFocusMode } from '../hooks/useFocusMode';

export function Write() {
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>(() => getDailyPrompt());
  const seenIdsRef = useRef<string[]>([]);

  const { body, setBody, wordCount, canSave, isSaving, sessionStats, clearStats, saveSession } =
    useWritingSession();
  const { seconds, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const { isFocused, toggleFocusMode, exitFocusMode } = useFocusMode();

  const handleGenreChange = useCallback((genre: Genre | null) => {
    seenIdsRef.current = [];
    setSelectedGenre(genre);
    if (genre === null) {
      setCurrentPrompt(getDailyPrompt());
    } else {
      const prompt = getPromptForGenre(genre);
      seenIdsRef.current = [prompt.id];
      setCurrentPrompt(prompt);
    }
  }, []);

  const handleDifferentPrompt = useCallback(() => {
    if (selectedGenre === null) {
      setCurrentPrompt(getDailyPrompt());
      return;
    }
    const next = getPromptForGenre(selectedGenre, seenIdsRef.current);
    const genreSize = prompts.filter((p) => p.genre === selectedGenre).length;
    if (seenIdsRef.current.length >= genreSize - 1) {
      seenIdsRef.current = [next.id]; // full cycle complete, reset
    } else {
      seenIdsRef.current = [...seenIdsRef.current, next.id];
    }
    setCurrentPrompt(next);
  }, [selectedGenre]);

  const handleSave = useCallback(async () => {
    stopTimer();
    await saveSession(currentPrompt, seconds);
  }, [stopTimer, saveSession, currentPrompt, seconds]);

  const handleClearStats = useCallback(() => {
    clearStats();
    resetTimer();
    setCurrentPrompt(getDailyPrompt());
    setSelectedGenre(null);
  }, [clearStats, resetTimer]);

  if (isFocused) {
    return (
      <FocusModeOverlay
        value={body}
        onChange={setBody}
        wordCount={wordCount}
        seconds={seconds}
        onExit={exitFocusMode}
      />
    );
  }

  return (
    <div className="write-page">
      <div className="genre-filter">
        <GenreFilter selected={selectedGenre} onChange={handleGenreChange} />
      </div>
      <div className="write-content">
        <div className="prompt-area">
          <PromptCard prompt={currentPrompt} onDifferentPrompt={handleDifferentPrompt} />
        </div>
        <WritingArea
          value={body}
          onChange={setBody}
          onFirstKeystroke={startTimer}
          disabled={isSaving}
        />
        <div className="write-toolbar">
          <WordCountTimer
            wordCount={wordCount}
            seconds={seconds}
            canSave={canSave}
            isSaving={isSaving}
            isFocused={isFocused}
            onSave={handleSave}
            onToggleFocus={toggleFocusMode}
          />
        </div>
      </div>

      {sessionStats && (
        <SessionStatsModal
          stats={sessionStats}
          onClose={handleClearStats}
          onWriteAgain={handleClearStats}
        />
      )}
    </div>
  );
}
