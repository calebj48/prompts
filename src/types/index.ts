export type Genre =
  | 'slice-of-life'
  | 'coming-of-age'
  | 'horror'
  | 'fantasy'
  | 'sci-fi'
  | 'romance'
  | 'noir'
  | 'literary'
  | 'historical'
  | 'character';

export const GENRE_LABELS: Record<Genre, string> = {
  'slice-of-life': 'Slice of Life',
  'coming-of-age': 'Coming of Age',
  horror: 'Horror',
  fantasy: 'Fantasy',
  'sci-fi': 'Sci-Fi',
  romance: 'Romance',
  noir: 'Crime / Noir',
  literary: 'Literary',
  historical: 'Historical',
  character: 'Character Study',
};

export interface Prompt {
  id: string;
  genre: Genre;
  text: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
}

export interface WritingSession {
  id: string;
  user_id: string;
  prompt_id: string;
  prompt_text: string;
  genre: Genre;
  body: string;
  word_count: number;
  duration_seconds: number;
  created_at: string;
}

export interface GuestSession {
  prompt_id: string;
  prompt_text: string;
  genre: Genre;
  body: string;
  word_count: number;
  duration_seconds: number;
  saved_at: string;
}

export interface StreakData {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_written_date: string;
  total_sessions: number;
}

export interface SessionStats {
  word_count: number;
  duration_seconds: number;
  current_streak: number;
  longest_streak: number;
  is_new_streak_record: boolean;
  encouragement: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
  cta?: { label: string; action: () => void };
}

export interface AuthModalState {
  isOpen: boolean;
  mode: 'signin' | 'signup' | 'magic-link';
}
