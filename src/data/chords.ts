/**
 * Chord Database
 *
 * Contains ALL 24 major and minor piano chords (12 major + 12 minor).
 * One chord for each of the 12 chromatic notes.
 * Total: 24 chords (10 beginner, 9 intermediate, 5 advanced)
 *
 * Note: Enharmonic equivalents (e.g., F#/Gb, C#/Db) are represented by
 * the most commonly used notation for each chord type.
 *
 * To add more chord types (7th, 9th, etc.):
 * 1. Add to this array with all required properties
 * 2. Add note translations to NOTE_TRANSLATIONS if needed
 * 3. Add new ChordType to types.ts
 */

import type { Chord } from '../types';

export const CHORDS: Chord[] = [
  // BEGINNER - MAJOR CHORDS (Most popular)
  {
    id: 'C-major',
    root: 'C',
    type: 'major',
    notes: ['C', 'E', 'G'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'G-major',
    root: 'G',
    type: 'major',
    notes: ['G', 'B', 'D'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'F-major',
    root: 'F',
    type: 'major',
    notes: ['F', 'A', 'C'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'D-major',
    root: 'D',
    type: 'major',
    notes: ['D', 'F#', 'A'],
    difficulty: 'beginner',
    popularity: 4,
  },
  {
    id: 'A-major',
    root: 'A',
    type: 'major',
    notes: ['A', 'C#', 'E'],
    difficulty: 'beginner',
    popularity: 4,
  },
  {
    id: 'E-major',
    root: 'E',
    type: 'major',
    notes: ['E', 'G#', 'B'],
    difficulty: 'beginner',
    popularity: 4,
  },

  // BEGINNER - MINOR CHORDS
  {
    id: 'A-minor',
    root: 'A',
    type: 'minor',
    notes: ['A', 'C', 'E'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'D-minor',
    root: 'D',
    type: 'minor',
    notes: ['D', 'F', 'A'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'E-minor',
    root: 'E',
    type: 'minor',
    notes: ['E', 'G', 'B'],
    difficulty: 'beginner',
    popularity: 5,
  },
  {
    id: 'C-minor',
    root: 'C',
    type: 'minor',
    notes: ['C', 'Eb', 'G'],
    difficulty: 'beginner',
    popularity: 4,
  },

  // INTERMEDIATE - MAJOR CHORDS
  {
    id: 'B-major',
    root: 'B',
    type: 'major',
    notes: ['B', 'D#', 'F#'],
    difficulty: 'intermediate',
    popularity: 2, // 5 sharps - less common
  },
  {
    id: 'Bb-major',
    root: 'Bb',
    type: 'major',
    notes: ['Bb', 'D', 'F'],
    difficulty: 'intermediate',
    popularity: 4, // Very common in jazz and pop
  },
  {
    id: 'Eb-major',
    root: 'Eb',
    type: 'major',
    notes: ['Eb', 'G', 'Bb'],
    difficulty: 'intermediate',
    popularity: 3, // Common in brass/wind music
  },
  {
    id: 'Ab-major',
    root: 'Ab',
    type: 'major',
    notes: ['Ab', 'C', 'Eb'],
    difficulty: 'intermediate',
    popularity: 2, // 4 flats - moderate usage
  },
  {
    id: 'Db-major',
    root: 'Db',
    type: 'major',
    notes: ['Db', 'F', 'Ab'],
    difficulty: 'intermediate',
    popularity: 2, // 5 flats - less common
  },

  // INTERMEDIATE - MINOR CHORDS
  {
    id: 'F-minor',
    root: 'F',
    type: 'minor',
    notes: ['F', 'Ab', 'C'],
    difficulty: 'intermediate',
    popularity: 3, // Relative to Ab major
  },
  {
    id: 'G-minor',
    root: 'G',
    type: 'minor',
    notes: ['G', 'Bb', 'D'],
    difficulty: 'intermediate',
    popularity: 4, // Very common in pop/jazz
  },
  {
    id: 'B-minor',
    root: 'B',
    type: 'minor',
    notes: ['B', 'D', 'F#'],
    difficulty: 'intermediate',
    popularity: 4, // Relative to D major, common
  },
  {
    id: 'Bb-minor',
    root: 'Bb',
    type: 'minor',
    notes: ['Bb', 'Db', 'F'],
    difficulty: 'intermediate',
    popularity: 2, // Relative to Db major
  },

  // ADVANCED - MAJOR CHORDS
  {
    id: 'F#-major',
    root: 'F#',
    type: 'major',
    notes: ['F#', 'A#', 'C#'],
    difficulty: 'advanced',
    popularity: 2, // 6 sharps - rare
  },

  // ADVANCED - MINOR CHORDS
  {
    id: 'C#-minor',
    root: 'C#',
    type: 'minor',
    notes: ['C#', 'E', 'G#'],
    difficulty: 'advanced',
    popularity: 3, // Relative to E major, occasionally used
  },
  {
    id: 'F#-minor',
    root: 'F#',
    type: 'minor',
    notes: ['F#', 'A', 'C#'],
    difficulty: 'advanced',
    popularity: 3, // Relative to A major, occasionally used
  },
  {
    id: 'G#-minor',
    root: 'G#',
    type: 'minor',
    notes: ['G#', 'B', 'D#'],
    difficulty: 'advanced',
    popularity: 2, // Relative to B major, rare
  },
  {
    id: 'Eb-minor',
    root: 'Eb',
    type: 'minor',
    notes: ['Eb', 'Gb', 'Bb'],
    difficulty: 'advanced',
    popularity: 1, // 6 flats - very rare
  },
];

// Note translations between English and French
export const NOTE_TRANSLATIONS: { [key: string]: { en: string; fr: string } } = {
  'C': { en: 'C', fr: 'Do' },
  'C#': { en: 'C#', fr: 'Do#' },
  'Db': { en: 'Db', fr: 'Réb' },
  'D': { en: 'D', fr: 'Ré' },
  'D#': { en: 'D#', fr: 'Ré#' },
  'Eb': { en: 'Eb', fr: 'Mib' },
  'E': { en: 'E', fr: 'Mi' },
  'E#': { en: 'E#', fr: 'Mi#' },
  'F': { en: 'F', fr: 'Fa' },
  'F#': { en: 'F#', fr: 'Fa#' },
  'Gb': { en: 'Gb', fr: 'Solb' },
  'G': { en: 'G', fr: 'Sol' },
  'G#': { en: 'G#', fr: 'Sol#' },
  'Ab': { en: 'Ab', fr: 'Lab' },
  'A': { en: 'A', fr: 'La' },
  'A#': { en: 'A#', fr: 'La#' },
  'Bb': { en: 'Bb', fr: 'Sib' },
  'B': { en: 'B', fr: 'Si' },
  'Cb': { en: 'Cb', fr: 'Dob' },
};

export const CHORD_TYPE_NAMES = {
  major: { en: 'Major', fr: 'Majeur' },
  minor: { en: 'Minor', fr: 'Mineur' },
};
