export type Genre =
  | 'Slice of Life'
  | 'Coming of Age'
  | 'Horror'
  | 'Fantasy'
  | 'Sci-Fi'
  | 'Romance'
  | 'Crime / Noir'
  | 'Literary / Experimental'
  | 'Historical Fiction'
  | 'Character Studies';

export const GENRE_LABELS: Record<Genre, string> = {
  'Slice of Life': 'Slice of Life',
  'Coming of Age': 'Coming of Age',
  'Horror': 'Horror',
  'Fantasy': 'Fantasy',
  'Sci-Fi': 'Sci-Fi',
  'Romance': 'Romance',
  'Crime / Noir': 'Crime / Noir',
  'Literary / Experimental': 'Literary / Experimental',
  'Historical Fiction': 'Historical Fiction',
  'Character Studies': 'Character Studies',
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
