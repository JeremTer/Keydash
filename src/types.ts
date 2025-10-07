/**
 * TypeScript Type Definitions
 *
 * Core types for the Piano Chord Practice app.
 * - GameMode: Speed Practice or Beginner Learning
 * - GameSettings: User preferences
 * - GameState: Runtime game state (includes mode-specific fields)
 * - Chord: Chord data structure with notes, fingering, and metadata
 */

export type Language = 'en' | 'fr';

export type ChordType = 'major' | 'minor';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface Note {
  en: string; // C, D, E, F, G, A, B
  fr: string; // Do, Ré, Mi, Fa, Sol, La, Si
  midi: number; // MIDI note number
}

export interface Chord {
  id: string;
  root: string; // Root note (e.g., "C", "D", "E")
  type: ChordType;
  notes: string[]; // Array of note names (e.g., ["C", "E", "G"])
  fingering: number[]; // Right hand finger numbers (1=thumb, 2=index, 3=middle, 4=ring, 5=pinky)
  difficulty: Difficulty;
}

export type GameMode = 'speed' | 'beginner';

export interface GameSettings {
  language: Language;
  gameMode: GameMode; // Speed Practice (timed) or Beginner Learning (reveal)
  chordTypes: ChordType[]; // Which chord types to include
  difficulty: Difficulty | 'all';
  countdownDuration: number; // seconds
  showChordOnKeyboard: boolean;
  playSound: boolean; // Play piano sound when chord appears
  selectedChords: string[]; // Chord IDs for "Learn Selected" mode
  mode: 'all' | 'selected';
}

export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentChord: Chord | null;
  timeRemaining: number;
  chordChangeCount: number; // Increments each time chord changes (for sound triggering)
  isRevealed: boolean; // For beginner mode: whether the chord has been revealed
}
