import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { computeUpdatedStreak, todayISO } from '../lib/streakUtils';
import { type StreakData } from '../types';
import { useAuth } from './useAuth';
import { useLocalStorage } from './useLocalStorage';

export function useStreak() {
  const { user } = useAuth();
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(false);
  const [guestStreak, setGuestStreak] = useLocalStorage<StreakData | null>(
    'tbp_guest_streak',
    null,
  );

  useEffect(() => {
    if (!user) {
      setStreak(guestStreak);
      return;
    }

    setLoading(true);
    supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error && error.code !== 'PGRST116') {
          console.error('Streak fetch error:', error);
        }
        setStreak(data ?? null);
        setLoading(false);
      });
  }, [user]);

  const updateStreak = useCallback(async (): Promise<StreakData> => {
    const today = todayISO();

    if (!user) {
      const updated = computeUpdatedStreak(guestStreak, today);
      if (updated) {
        const withId = { ...updated, user_id: 'guest' };
        setGuestStreak(withId);
        setStreak(withId);
        return withId;
      }
      return guestStreak ?? { user_id: 'guest', current_streak: 0, longest_streak: 0, last_written_date: today, total_sessions: 0 };
    }

    const { data: existing } = await supabase
      .from('streaks')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const updated = computeUpdatedStreak(existing ?? null, today);
    if (!updated) {
      return existing ?? { user_id: user.id, current_streak: 0, longest_streak: 0, last_written_date: today, total_sessions: 0 };
    }

    const toSave = { ...updated, user_id: user.id };
    const { data, error } = await supabase
      .from('streaks')
      .upsert(toSave, { onConflict: 'user_id' })
      .select()
      .single();

    if (error) {
      console.error('Streak update error:', error);
      return toSave;
    }

    setStreak(data);
    return data;
  }, [user, guestStreak, setGuestStreak]);

  return { streak, loading, updateStreak };
}
