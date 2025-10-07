/**
 * Sound Utility for Piano Chord Playback
 *
 * Uses Tone.js with real piano samples (Salamander Grand Piano).
 * Converts note names (e.g., "C", "E", "G") to MIDI-like format (e.g., "C4", "E4", "G4")
 * and plays them as a chord using sampled piano sounds.
 */

import * as Tone from 'tone';

let sampler: Tone.Sampler | null = null;
let samplerLoadingPromise: Promise<Tone.Sampler> | null = null;
let activeNotes: string[] = [];

/**
 * Initialize the sampler with real piano samples (lazily loaded on first use)
 * Uses Salamander Grand Piano samples hosted on CDN
 */
const getSampler = async (): Promise<Tone.Sampler> => {
  // If sampler already exists and is loaded, return it
  if (sampler && sampler.loaded) {
    return sampler;
  }

  // If sampler is currently loading, wait for it
  if (samplerLoadingPromise) {
    return samplerLoadingPromise;
  }

  // Create a new loading promise
  samplerLoadingPromise = new Promise((resolve) => {
    // Create sampler with piano samples
    // Using samples from tonejs-instruments (Salamander Grand Piano)
    sampler = new Tone.Sampler(
      {
        A0: 'A0.mp3',
        C1: 'C1.mp3',
        'D#1': 'Ds1.mp3',
        'F#1': 'Fs1.mp3',
        A1: 'A1.mp3',
        C2: 'C2.mp3',
        'D#2': 'Ds2.mp3',
        'F#2': 'Fs2.mp3',
        A2: 'A2.mp3',
        C3: 'C3.mp3',
        'D#3': 'Ds3.mp3',
        'F#3': 'Fs3.mp3',
        A3: 'A3.mp3',
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
        C5: 'C5.mp3',
        'D#5': 'Ds5.mp3',
        'F#5': 'Fs5.mp3',
        A5: 'A5.mp3',
        C6: 'C6.mp3',
        'D#6': 'Ds6.mp3',
        'F#6': 'Fs6.mp3',
        A6: 'A6.mp3',
        C7: 'C7.mp3',
        'D#7': 'Ds7.mp3',
        'F#7': 'Fs7.mp3',
        A7: 'A7.mp3',
        C8: 'C8.mp3',
      },
      {
        release: 1,
        baseUrl: 'https://tonejs.github.io/audio/salamander/',
        onload: () => {
          resolve(sampler!);
        },
      }
    ).toDestination();
  });

  return samplerLoadingPromise;
};

/**
 * Convert note name to Tone.js format with octave
 * Examples: "C" -> "C4", "F#" -> "F#4", "Bb" -> "Bb4"
 */
const noteToToneFormat = (note: string): string => {
  // Default to octave 4 for middle range piano notes
  return `${note}4`;
};

/**
 * Play a chord given an array of note names
 * @param notes - Array of note names (e.g., ["C", "E", "G"])
 */
export const playChord = async (notes: string[]) => {
  try {
    // Stop any currently playing notes first
    stopAllSounds();

    // Start Tone.js audio context (required for web audio)
    await Tone.start();

    // Get the sampler (will wait for it to load if needed)
    const loadedSampler = await getSampler();

    // Convert note names to Tone.js format
    const toneNotes = notes.map(noteToToneFormat);

    // Ensure sampler is loaded before playing
    if (loadedSampler.loaded) {
      // Track active notes
      activeNotes = [...toneNotes];

      // Use triggerAttack instead of triggerAttackRelease for better control
      loadedSampler.triggerAttack(toneNotes);

      // Schedule release after 2 seconds
      setTimeout(() => {
        if (activeNotes.length > 0) {
          loadedSampler.triggerRelease(activeNotes);
          activeNotes = [];
        }
      }, 2000);
    } else {
      // Sampler not fully loaded yet, wait and try again
      setTimeout(() => {
        if (loadedSampler.loaded) {
          activeNotes = [...toneNotes];
          loadedSampler.triggerAttack(toneNotes);
          setTimeout(() => {
            if (activeNotes.length > 0) {
              loadedSampler.triggerRelease(activeNotes);
              activeNotes = [];
            }
          }, 2000);
        }
      }, 500);
    }
  } catch (error) {
    console.error('Error playing chord:', error);
  }
};

/**
 * Preload the piano samples
 * Call this when the user starts the game to ensure samples are ready
 */
export const preloadSamples = async () => {
  try {
    await Tone.start();
    await getSampler();
  } catch (error) {
    console.error('Error preloading samples:', error);
  }
};

/**
 * Stop all currently playing sounds immediately
 */
export const stopAllSounds = () => {
  if (sampler && activeNotes.length > 0) {
    // Immediately release all active notes
    sampler.triggerRelease(activeNotes);
    activeNotes = [];
  }
};
