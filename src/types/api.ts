import type { Solution } from './solution';

/**
 * Represents a difficulty level returned by the getDifficulties API endpoint
 * @interface Difficulty
 */
export interface Difficulty {
  id: string;
  name: string;
}

/**
 * Represents a game session returned by the API when starting a new game
 * @interface GameSession
 * 
 * @example
 * ```json
 * {
 *   "sessionId": "abc123-def456",
 *   "difficulty": { "id": "medium", "name": "Medium" },
 *   "wordLength": 5
 * }
 * ```
 */
export interface GameSession {
  sessionId: string;
  difficulty: Difficulty;
  wordLenght: number;
}

export interface CheckWordRequest {
  sessionId: string;
  word: string
}

/**
 * Represents the result for each letter when checking a word
 * @interface LetterResult
 */
export interface LetterResult {
  /** The letter that was checked */
  letter: string;
  /** Whether the letter is correct, in the word but wrong position, or not in the word */
  solution: Solution;
}

/**
 * Response from the check-word API endpoint
 * Returns an array of letter results for each letter in the submitted word
 * @type CheckWordResponse
 */
export type CheckWordResponse = LetterResult[];

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}