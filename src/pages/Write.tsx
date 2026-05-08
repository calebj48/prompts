import { useState, useCallback, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { type Genre, type Prompt } from '../types';
import { getDailyPrompt, getPromptForGenre } from '../lib/promptUtils';
import { prompts } from '../lib/prompts';
import { supabase } from '../lib/supabase';
import { GenreFilter } from '../components/writing/GenreFilter';
import { PromptCard } from '../components/writing/PromptCard';
import { WritingArea } from '../components/writing/WritingArea';
import { WordCountTimer } from '../components/writing/WordCountTimer';
import { FocusModeOverlay } from '../components/writing/FocusModeOverlay';
import { SessionStatsModal } from '../components/writing/SessionStatsModal';
import { useWritingSession } from '../hooks/useWritingSession';
import { useAuth } from '../hooks/useAuth';
import { useTimer } from '../hooks/useTimer';
import { useFocusMode } from '../hooks/useFocusMode';

function getInitialPrompt(promptId?: string): Prompt {
  if (promptId) {
    return prompts.find((p) => p.id === promptId) ?? getDailyPrompt();
  }
  return getDailyPrompt();
}

export function Write() {
  const location = useLocation();
  const variationPromptId = (location.state as { promptId?: string } | null)?.promptId;

  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>(() =>
    getInitialPrompt(variationPromptId),
  );
  const seenIdsRef = useRef<string[]>(variationPromptId ? [variationPromptId] : []);
  const writtenIdsRef = useRef<Set<string>>(new Set());

  const { user } = useAuth();
  const { body, setBody, wordCount, canSave, isSaving, sessionStats, clearStats, saveSession } =
    useWritingSession();
  const { seconds, start: startTimer, stop: stopTimer, reset: resetTimer } = useTimer();
  const { isFocused, toggleFocusMode, exitFocusMode } = useFocusMode();

  // Load previously written prompt IDs to exclude from reroll pool
  useEffect(() => {
    if (user) {
      supabase
        .from('writing_sessions')
        .select('prompt_id')
        .eq('user_id', user.id)
        .then(({ data }) => {
          if (data) {
            writtenIdsRef.current = new Set(data.map((r) => r.prompt_id as string));
          }
        });
    } else {
      try {
        const raw = localStorage.getItem('tbp_guest_sessions');
        if (raw) {
          const sessions = JSON.parse(raw) as Array<{ prompt_id: string }>;
          writtenIdsRef.current = new Set(sessions.map((s) => s.prompt_id));
        }
      } catch {
        // ignore malformed localStorage
      }
    }
  }, [user]);

  const handleGenreChange = useCallback((genre: Genre | null) => {
    seenIdsRef.current = [];
    setSelectedGenre(genre);
    if (genre === null) {
      setCurrentPrompt(getDailyPrompt());
    } else {
      const excluded = [...writtenIdsRef.current];
      const prompt = getPromptForGenre(genre, excluded);
      seenIdsRef.current = [prompt.id];
      setCurrentPrompt(prompt);
    }
  }, []);

  const handleDifferentPrompt = useCallback(() => {
    if (selectedGenre === null) {
      setCurrentPrompt(getDailyPrompt());
      return;
    }
    const genrePool = prompts.filter((p) => p.genre === selectedGenre);
    // Combine session-seen IDs with written IDs, but only exclude written ones if unwritten prompts remain
    const unwritten = genrePool.filter((p) => !writtenIdsRef.current.has(p.id));
    const baseExclude = unwritten.length > 1
      ? [...writtenIdsRef.current, ...seenIdsRef.current]
      : seenIdsRef.current;

    const next = getPromptForGenre(selectedGenre, baseExclude);
    const unwrittenAfterPick = unwritten.filter((p) => p.id !== next.id);
    if (unwrittenAfterPick.length === 0 || seenIdsRef.current.length >= genrePool.length - 1) {
      seenIdsRef.current = [next.id];
    } else {
      seenIdsRef.current = [...seenIdsRef.current, next.id];
    }
    setCurrentPrompt(next);
  }, [selectedGenre]);

  const handleSave = useCallback(async () => {
    stopTimer();
    await saveSession(currentPrompt, seconds);
    writtenIdsRef.current.add(currentPrompt.id);
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
