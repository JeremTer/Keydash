import type { Chord, GameSettings } from '../types';
import { CHORDS, NOTE_TRANSLATIONS, CHORD_TYPE_NAMES } from '../data/chords';

/**
 * Get a random chord from the pool based on game settings
 */
export const getRandomChord = (settings: GameSettings): Chord | null => {
  const availableChords = getAvailableChords(settings);

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
 */
export const getChordName = (chord: Chord, language: 'en' | 'fr'): string => {
  const rootNote = NOTE_TRANSLATIONS[chord.root]?.[language] || chord.root;
  const chordType = CHORD_TYPE_NAMES[chord.type][language];

  return `${rootNote} ${chordType}`;
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
