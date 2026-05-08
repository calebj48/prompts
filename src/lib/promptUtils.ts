import { type Genre, type Prompt } from '../types';
import { GENRES, prompts } from './prompts';

function dateSeed(date: Date): number {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const str = `${y}${m}${d}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash * 31) + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function getDailyGenre(date: Date): Genre {
  const seed = dateSeed(date);
  const yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdaySeed = dateSeed(yesterday);
  const yesterdayGenre = GENRES[yesterdaySeed % GENRES.length];
  const eligible = GENRES.filter((g) => g !== yesterdayGenre);
  return eligible[seed % eligible.length];
}

export function getDailyPrompt(date: Date = new Date()): Prompt {
  const seed = dateSeed(date);
  const genre = getDailyGenre(date);
  const genrePrompts = prompts.filter((p) => p.genre === genre);
  return genrePrompts[seed % genrePrompts.length];
}

export function getPromptForGenre(genre: Genre, excludeIds: string[] = []): Prompt {
  const genrePrompts = prompts.filter((p) => p.genre === genre);
  const eligible = genrePrompts.filter((p) => !excludeIds.includes(p.id));
  const pool = eligible.length > 0 ? eligible : genrePrompts;
  return pool[Math.floor(Math.random() * pool.length)];
}

export function getRandomPrompt(): Prompt {
  return prompts[Math.floor(Math.random() * prompts.length)];
}

export function getShowcasePrompt(genre: Genre): Prompt {
  const genrePrompts = prompts.filter((p) => p.genre === genre && p.difficulty !== 'hard');
  return genrePrompts[0] ?? prompts.filter((p) => p.genre === genre)[0];
}
