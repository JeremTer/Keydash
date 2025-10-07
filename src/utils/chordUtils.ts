import type { Chord, GameSettings } from '../types';
import { CHORDS, NOTE_TRANSLATIONS } from '../data/chords';

/**
 * Get a random chord from the pool based on game settings
 * Excludes the previous chord to prevent repetition
 */
export const getRandomChord = (settings: GameSettings, excludeChord?: Chord | null): Chord | null => {
  let availableChords = getAvailableChords(settings);

  if (availableChords.length === 0) {
    return null;
  }

  // Exclude the previous chord if provided (prevent same chord twice in a row)
  if (excludeChord && availableChords.length > 1) {
    availableChords = availableChords.filter((chord) => chord.id !== excludeChord.id);
  }

  // If no chords left after filtering, return null
  if (availableChords.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * availableChords.length);
  return availableChords[randomIndex];
};

/**
 * Filter chords based on game settings
 */
export const getAvailableChords = (settings: GameSettings): Chord[] => {
  let filtered = CHORDS;

  // Filter by mode (all or selected)
  if (settings.mode === 'selected' && settings.selectedChords.length > 0) {
    filtered = filtered.filter((chord) => settings.selectedChords.includes(chord.id));
  }

  // Filter by chord type
  if (settings.chordTypes.length > 0) {
    filtered = filtered.filter((chord) => settings.chordTypes.includes(chord.type));
  }

  // Filter by difficulty
  if (settings.difficulty !== 'all') {
    filtered = filtered.filter((chord) => chord.difficulty === settings.difficulty);
  }

  return filtered;
};

/**
 * Get chord name in the specified language
 * Major chords: just the root note (e.g., "C", "D")
 * Minor chords: root note + "m" (e.g., "Cm", "Dm")
 */
export const getChordName = (chord: Chord, language: 'en' | 'fr'): string => {
  const rootNote = NOTE_TRANSLATIONS[chord.root]?.[language] || chord.root;

  // Major chords: just the root note
  if (chord.type === 'major') {
    return rootNote;
  }

  // Minor chords: root note + "m"
  return `${rootNote}m`;
};

/**
 * Get note name in the specified language
 */
export const getNoteName = (note: string, language: 'en' | 'fr'): string => {
  return NOTE_TRANSLATIONS[note]?.[language] || note;
};

/**
 * Get all chords grouped by difficulty
 */
export const getChordsByDifficulty = () => {
  return {
    beginner: CHORDS.filter((c) => c.difficulty === 'beginner'),
    intermediate: CHORDS.filter((c) => c.difficulty === 'intermediate'),
    advanced: CHORDS.filter((c) => c.difficulty === 'advanced'),
  };
};
