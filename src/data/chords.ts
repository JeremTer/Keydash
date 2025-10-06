/**
 * Chord Database
 *
 * Contains all available piano chords for practice.
 * Total: 27 chords (10 beginner, 9 intermediate, 8 advanced)
 *
 * To add more chords:
 * 1. Add to this array with all required properties
 * 2. Add note translations to NOTE_TRANSLATIONS if needed
 * 3. Consider adding new ChordType if it's a new type (e.g., 7th chords)
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
    popularity: 3,
  },
  {
    id: 'Bb-major',
    root: 'Bb',
    type: 'major',
    notes: ['Bb', 'D', 'F'],
    difficulty: 'intermediate',
    popularity: 4,
  },
  {
    id: 'Eb-major',
    root: 'Eb',
    type: 'major',
    notes: ['Eb', 'G', 'Bb'],
    difficulty: 'intermediate',
    popularity: 4,
  },
  {
    id: 'Ab-major',
    root: 'Ab',
    type: 'major',
    notes: ['Ab', 'C', 'Eb'],
    difficulty: 'intermediate',
    popularity: 3,
  },
  {
    id: 'Db-major',
    root: 'Db',
    type: 'major',
    notes: ['Db', 'F', 'Ab'],
    difficulty: 'intermediate',
    popularity: 3,
  },

  // INTERMEDIATE - MINOR CHORDS
  {
    id: 'F-minor',
    root: 'F',
    type: 'minor',
    notes: ['F', 'Ab', 'C'],
    difficulty: 'intermediate',
    popularity: 4,
  },
  {
    id: 'G-minor',
    root: 'G',
    type: 'minor',
    notes: ['G', 'Bb', 'D'],
    difficulty: 'intermediate',
    popularity: 4,
  },
  {
    id: 'B-minor',
    root: 'B',
    type: 'minor',
    notes: ['B', 'D', 'F#'],
    difficulty: 'intermediate',
    popularity: 3,
  },
  {
    id: 'Bb-minor',
    root: 'Bb',
    type: 'minor',
    notes: ['Bb', 'Db', 'F'],
    difficulty: 'intermediate',
    popularity: 3,
  },

  // ADVANCED - MAJOR CHORDS
  {
    id: 'Gb-major',
    root: 'Gb',
    type: 'major',
    notes: ['Gb', 'Bb', 'Db'],
    difficulty: 'advanced',
    popularity: 2,
  },
  {
    id: 'C#-major',
    root: 'C#',
    type: 'major',
    notes: ['C#', 'E#', 'G#'],
    difficulty: 'advanced',
    popularity: 2,
  },
  {
    id: 'F#-major',
    root: 'F#',
    type: 'major',
    notes: ['F#', 'A#', 'C#'],
    difficulty: 'advanced',
    popularity: 2,
  },

  // ADVANCED - MINOR CHORDS
  {
    id: 'C#-minor',
    root: 'C#',
    type: 'minor',
    notes: ['C#', 'E', 'G#'],
    difficulty: 'advanced',
    popularity: 3,
  },
  {
    id: 'F#-minor',
    root: 'F#',
    type: 'minor',
    notes: ['F#', 'A', 'C#'],
    difficulty: 'advanced',
    popularity: 3,
  },
  {
    id: 'G#-minor',
    root: 'G#',
    type: 'minor',
    notes: ['G#', 'B', 'D#'],
    difficulty: 'advanced',
    popularity: 2,
  },
  {
    id: 'Eb-minor',
    root: 'Eb',
    type: 'minor',
    notes: ['Eb', 'Gb', 'Bb'],
    difficulty: 'advanced',
    popularity: 2,
  },
  {
    id: 'Ab-minor',
    root: 'Ab',
    type: 'minor',
    notes: ['Ab', 'Cb', 'Eb'],
    difficulty: 'advanced',
    popularity: 2,
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
