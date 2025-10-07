/**
 * Chord Database
 *
 * Contains ALL 24 basic major and minor piano chords.
 * Total: 24 chords (12 major + 12 minor)
 * All chords are set to beginner difficulty since they are basic triads.
 *
 * Based on standard piano chord notation:
 * - Uses sharps (#) for: C#, F#
 * - Uses flats (b) for: Eb, Ab, Bb
 *
 * To add more chord types (7th, 9th, diminished, augmented, etc.):
 * 1. Add to this array with all required properties
 * 2. Add note translations to NOTE_TRANSLATIONS if needed
 * 3. Add new ChordType to types.ts
 */

import type { Chord } from '../types';

export const CHORDS: Chord[] = [
  // MAJOR CHORDS (12 total)
  {
    id: 'C-major',
    root: 'C',
    type: 'major',
    notes: ['C4', 'E4', 'G4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'C#-major',
    root: 'C#',
    type: 'major',
    notes: ['C#4', 'E#4', 'G#4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'D-major',
    root: 'D',
    type: 'major',
    notes: ['D4', 'F#4', 'A4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Eb-major',
    root: 'Eb',
    type: 'major',
    notes: ['Eb4', 'G4', 'Bb4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'E-major',
    root: 'E',
    type: 'major',
    notes: ['E4', 'G#4', 'B4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'F-major',
    root: 'F',
    type: 'major',
    notes: ['F4', 'A4', 'C5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'F#-major',
    root: 'F#',
    type: 'major',
    notes: ['F#4', 'A#4', 'C#5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'G-major',
    root: 'G',
    type: 'major',
    notes: ['G4', 'B4', 'D5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Ab-major',
    root: 'Ab',
    type: 'major',
    notes: ['Ab3', 'C4', 'Eb4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'A-major',
    root: 'A',
    type: 'major',
    notes: ['A3', 'C#4', 'E4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Bb-major',
    root: 'Bb',
    type: 'major',
    notes: ['Bb3', 'D4', 'F4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'B-major',
    root: 'B',
    type: 'major',
    notes: ['B3', 'D#4', 'F#4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },

  // MINOR CHORDS (12 total)
  {
    id: 'C-minor',
    root: 'C',
    type: 'minor',
    notes: ['C4', 'Eb4', 'G4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'C#-minor',
    root: 'C#',
    type: 'minor',
    notes: ['C#4', 'E4', 'G#4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'D-minor',
    root: 'D',
    type: 'minor',
    notes: ['D4', 'F4', 'A4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Eb-minor',
    root: 'Eb',
    type: 'minor',
    notes: ['Eb4', 'Gb4', 'Bb4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'E-minor',
    root: 'E',
    type: 'minor',
    notes: ['E4', 'G4', 'B4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'F-minor',
    root: 'F',
    type: 'minor',
    notes: ['F4', 'Ab4', 'C5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'F#-minor',
    root: 'F#',
    type: 'minor',
    notes: ['F#4', 'A4', 'C#5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'G-minor',
    root: 'G',
    type: 'minor',
    notes: ['G4', 'Bb4', 'D5'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Ab-minor',
    root: 'Ab',
    type: 'minor',
    notes: ['Ab3', 'Cb4', 'Eb4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'A-minor',
    root: 'A',
    type: 'minor',
    notes: ['A3', 'C4', 'E4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'Bb-minor',
    root: 'Bb',
    type: 'minor',
    notes: ['Bb3', 'Db4', 'F4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
  {
    id: 'B-minor',
    root: 'B',
    type: 'minor',
    notes: ['B3', 'D4', 'F#4'],
    fingering: [1, 3, 5],
    difficulty: 'beginner',
  },
];

// Note translations between English and French
export const NOTE_TRANSLATIONS: { [key: string]: { en: string; fr: string } } = {
  'C': { en: 'C', fr: 'Do' },
  'C#': { en: 'C#', fr: 'Do#' },
  'Cb': { en: 'Cb', fr: 'Dob' },
  'D': { en: 'D', fr: 'Ré' },
  'D#': { en: 'D#', fr: 'Ré#' },
  'Db': { en: 'Db', fr: 'Réb' },
  'E': { en: 'E', fr: 'Mi' },
  'E#': { en: 'E#', fr: 'Mi#' },
  'Eb': { en: 'Eb', fr: 'Mib' },
  'F': { en: 'F', fr: 'Fa' },
  'F#': { en: 'F#', fr: 'Fa#' },
  'G': { en: 'G', fr: 'Sol' },
  'G#': { en: 'G#', fr: 'Sol#' },
  'Gb': { en: 'Gb', fr: 'Solb' },
  'A': { en: 'A', fr: 'La' },
  'A#': { en: 'A#', fr: 'La#' },
  'Ab': { en: 'Ab', fr: 'Lab' },
  'B': { en: 'B', fr: 'Si' },
  'B#': { en: 'B#', fr: 'Si#' },
  'Bb': { en: 'Bb', fr: 'Sib' },
};

export const CHORD_TYPE_NAMES = {
  major: { en: 'Major', fr: 'Majeur' },
  minor: { en: 'Minor', fr: 'Mineur' },
};
