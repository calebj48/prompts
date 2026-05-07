import { type StreakData } from '../types';

export const ENCOURAGEMENT_LINES = [
  'You showed up.',
  'The page was blank. Now it isn\'t.',
  'That\'s one more day the silence didn\'t win.',
  'Good words. More tomorrow.',
  'Something true lived in that.',
  'The habit is the practice.',
  'One more.',
  'That\'s the whole job.',
  'You made something from nothing.',
  'Not every day has to be a masterpiece.',
  'Keep going.',
  'You\'re writing. That matters.',
  'The streak is real now.',
  'Whatever it was, it counted.',
  'Show up tomorrow and do it again.',
  'That\'s how writers write.',
  'The discipline is the point.',
  'Blank pages don\'t write themselves. You did.',
  'Another day, another draft.',
  'The work is its own reward. Today you remembered.',
];

export function getEncouragementLine(totalSessions: number): string {
  return ENCOURAGEMENT_LINES[totalSessions % ENCOURAGEMENT_LINES.length];
}

export function todayISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function isSameDay(a: string, b: string): boolean {
  return a.slice(0, 10) === b.slice(0, 10);
}

function isConsecutiveDay(lastDate: string, today: string): boolean {
  const last = new Date(lastDate + 'T00:00:00');
  const now = new Date(today + 'T00:00:00');
  const diffMs = now.getTime() - last.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
  return diffDays === 1;
}

export function computeUpdatedStreak(
  existing: StreakData | null,
  today: string,
): StreakData | null {
  if (!existing) {
    return {
      user_id: '',
      current_streak: 1,
      longest_streak: 1,
      last_written_date: today,
      total_sessions: 1,
    };
  }

  if (isSameDay(existing.last_written_date, today)) {
    return null;
  }

  const continued = isConsecutiveDay(existing.last_written_date, today);
  const newCurrent = continued ? existing.current_streak + 1 : 1;
  const newLongest = Math.max(newCurrent, existing.longest_streak);

  return {
    ...existing,
    current_streak: newCurrent,
    longest_streak: newLongest,
    last_written_date: today,
    total_sessions: existing.total_sessions + 1,
  };
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
