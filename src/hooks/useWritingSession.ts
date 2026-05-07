import { useCallback, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { getEncouragementLine } from '../lib/streakUtils';
import { type GuestSession, type Prompt, type SessionStats } from '../types';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';
import { useStreak } from './useStreak';
import { useToast } from './useToast';

interface UseWritingSessionReturn {
  body: string;
  setBody: (v: string) => void;
  wordCount: number;
  canSave: boolean;
  isSaving: boolean;
  sessionStats: SessionStats | null;
  clearStats: () => void;
  saveSession: (prompt: Prompt, seconds: number) => Promise<void>;
}

export function useWritingSession(): UseWritingSessionReturn {
  const { user, openAuthModal } = useAuth();
  const { addToast } = useToast();
  const { updateStreak } = useStreak();
  const [body, setBody] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats | null>(null);
  const [, setGuestSessions] = useLocalStorage<GuestSession[]>(
    'tbp_guest_sessions',
    [],
  );

  const wordCount = useMemo(() => {
    const trimmed = body.trim();
    return trimmed === '' ? 0 : trimmed.split(/\s+/).length;
  }, [body]);

  const canSave = wordCount >= 10;

  const clearStats = useCallback(() => {
    setSessionStats(null);
    setBody('');
  }, []);

  const saveSession = useCallback(
    async (prompt: Prompt, seconds: number) => {
      if (!canSave || isSaving) return;
      setIsSaving(true);

      try {
        const updatedStreak = await updateStreak();
        const stats: SessionStats = {
          word_count: wordCount,
          duration_seconds: seconds,
          current_streak: updatedStreak.current_streak,
          longest_streak: updatedStreak.longest_streak,
          is_new_streak_record:
            updatedStreak.current_streak > 0 &&
            updatedStreak.current_streak === updatedStreak.longest_streak &&
            updatedStreak.current_streak > 1,
          encouragement: getEncouragementLine(updatedStreak.total_sessions),
        };

        if (!user) {
          const guestSession: GuestSession = {
            prompt_id: prompt.id,
            prompt_text: prompt.text,
            genre: prompt.genre,
            body,
            word_count: wordCount,
            duration_seconds: seconds,
            saved_at: new Date().toISOString(),
          };
          setGuestSessions((prev) => [guestSession, ...(prev ?? [])]);

          const alreadyNudged = sessionStorage.getItem('tbp_nudge_shown');
          if (!alreadyNudged) {
            sessionStorage.setItem('tbp_nudge_shown', '1');
            addToast(
              'Your writing is saved locally. Create an account to keep it forever.',
              'info',
              {
                duration: 7000,
                cta: { label: 'Create account', action: () => openAuthModal('signup') },
              },
            );
          }
        } else {
          const { error } = await supabase.from('writing_sessions').insert({
            user_id: user.id,
            prompt_id: prompt.id,
            prompt_text: prompt.text,
            genre: prompt.genre,
            body,
            word_count: wordCount,
            duration_seconds: seconds,
            created_at: new Date().toISOString(),
          });
          if (error) throw error;
        }

        setSessionStats(stats);
      } catch (err) {
        console.error('Save error:', err);
        addToast('Something went wrong saving your session.', 'error');
      } finally {
        setIsSaving(false);
      }
    },
    [body, canSave, isSaving, user, wordCount, updateStreak, addToast, openAuthModal, setGuestSessions],
  );

  return { body, setBody, wordCount, canSave, isSaving, sessionStats, clearStats, saveSession };
}
