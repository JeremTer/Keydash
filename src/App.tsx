/**
 * Piano Chord Practice App - Main Component
 *
 * This component manages the entire application state and game logic.
 * It orchestrates the timer, chord selection, and user interactions.
 */

import { useState, useEffect, useCallback } from 'react';
import type { GameSettings, GameState, Chord } from './types';
import { getRandomChord } from './utils/chordUtils';
import { playChord, preloadSamples, stopAllSounds } from './utils/soundUtils';
import { ChordDisplay } from './components/ChordDisplay';
import { PianoKeyboard } from './components/PianoKeyboard';
import { Settings } from './components/Settings';
import { ChordSelector } from './components/ChordSelector';

// Default settings when app first loads
const DEFAULT_SETTINGS: GameSettings = {
  language: 'en',
  gameMode: 'speed',
  chordTypes: ['major', 'minor'],
  difficulty: 'all',
  countdownDuration: 5,
  showChordOnKeyboard: true,
  playSound: true,
  selectedChords: [],
  mode: 'all',
};

function App() {
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    isPaused: false,
    currentChord: null,
    timeRemaining: 0,
    chordChangeCount: 0,
    isRevealed: false,
  });
  const [showChordSelector, setShowChordSelector] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Get a new random chord (excluding the current one to prevent repetition)
  const getNextChord = useCallback((): Chord | null => {
    return getRandomChord(settings, gameState.currentChord);
  }, [settings, gameState.currentChord]);

  // Start game
  const handleStart = async () => {
    const chord = getNextChord();
    if (!chord) {
      alert(
        settings.language === 'en'
          ? 'No chords available with current settings!'
          : 'Aucun accord disponible avec les paramètres actuels!'
      );
      return;
    }

    // Preload piano samples if sound is enabled
    if (settings.playSound) {
      await preloadSamples();
    }

    setGameState({
      isPlaying: true,
      isPaused: false,
      currentChord: chord,
      timeRemaining: settings.gameMode === 'speed' ? settings.countdownDuration : 0,
      chordChangeCount: 1, // Start at 1
      isRevealed: settings.gameMode === 'speed' ? false : (settings.showChordOnKeyboard ? true : false),
    });
  };

  // Pause game
  const handlePause = () => {
    // Stop any playing sounds immediately when pausing
    stopAllSounds();

    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  // Stop game
  const handleStop = () => {
    // Stop any playing sounds
    stopAllSounds();

    setGameState({
      isPlaying: false,
      isPaused: false,
      currentChord: null,
      timeRemaining: 0,
      chordChangeCount: 0,
      isRevealed: false,
    });
  };

  // Reveal chord (Beginner mode)
  const handleReveal = () => {
    setGameState((prev) => ({
      ...prev,
      isRevealed: true,
      chordChangeCount: prev.chordChangeCount + 1, // Trigger sound
    }));
  };

  // Next chord (Beginner mode)
  const handleNext = () => {
    const nextChord = getNextChord();
    if (!nextChord) {
      // No more chords available, stop the game
      handleStop();
      return;
    }

    setGameState((prev) => ({
      ...prev,
      currentChord: nextChord,
      isRevealed: settings.showChordOnKeyboard ? true : false,
      chordChangeCount: settings.showChordOnKeyboard ? prev.chordChangeCount + 1 : prev.chordChangeCount,
    }));
  };

  /**
   * Timer Logic - Core Game Loop
   *
   * Runs every 100ms when game is active and not paused, and ONLY in speed mode.
   * - Decrements time by 0.1 seconds
   * - When time reaches 0, loads next chord
   * - Stops game if no chords available
   */
  useEffect(() => {
    // Only run timer in speed mode
    if (!gameState.isPlaying || gameState.isPaused || settings.gameMode !== 'speed') {
      return;
    }

    const interval = setInterval(() => {
      setGameState((prev) => {
        const newTime = prev.timeRemaining - 0.1;

        if (newTime <= 0) {
          // Time's up - get next chord
          const nextChord = getNextChord();
          if (!nextChord) {
            return {
              isPlaying: false,
              isPaused: false,
              currentChord: null,
              timeRemaining: 0,
              chordChangeCount: 0,
              isRevealed: false,
            };
          }

          return {
            ...prev,
            currentChord: nextChord,
            timeRemaining: settings.countdownDuration,
            chordChangeCount: prev.chordChangeCount + 1, // Increment to trigger sound
            isRevealed: false,
          };
        }

        return {
          ...prev,
          timeRemaining: newTime,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isPaused, settings.countdownDuration, settings.gameMode, getNextChord]);

  /**
   * Sound Playback Logic
   *
   * Plays the chord sound when a new chord appears and playSound is enabled
   * Depends on chordChangeCount to trigger even when same chord repeats (single chord mode)
   * NOTE: Only depends on chordChangeCount and playSound - NOT on isPaused/isPlaying
   * This prevents sound from playing when resuming from pause
   */
  useEffect(() => {
    if (gameState.currentChord && settings.playSound && gameState.isPlaying && !gameState.isPaused && gameState.chordChangeCount > 0) {
      playChord(gameState.currentChord.notes, settings.countdownDuration);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.chordChangeCount, settings.playSound, settings.countdownDuration]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="relative text-center mb-8">
          {/* Settings Toggle Button - Mobile friendly with larger touch target */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute left-0 top-0 p-3 md:p-3 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all active:scale-95"
            aria-label={settings.language === 'en' ? 'Toggle Settings' : 'Afficher/Masquer Paramètres'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 md:w-6 md:h-6 text-gray-700 dark:text-gray-300"
            >
              <path
                fillRule="evenodd"
                d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            🎹 Keydash
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {settings.language === 'en'
              ? 'Master your piano chords with timed practice'
              : 'Maîtrisez vos accords de piano avec une pratique chronométrée'}
          </p>
        </div>

        {/* Main Content */}
        <div className={`grid grid-cols-1 ${showSettings ? 'lg:grid-cols-3' : ''} gap-6`}>
          {/* Left Column - Settings (conditionally shown) */}
          {showSettings && (
            <div className="lg:col-span-1">
              <Settings
                settings={settings}
                onSettingsChange={setSettings}
                disabled={gameState.isPlaying}
              />

              {/* Chord Selection Button */}
              {settings.mode === 'selected' && (
                <button
                  onClick={() => setShowChordSelector(true)}
                  disabled={gameState.isPlaying}
                  className="w-full mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {settings.language === 'en' ? 'Select Chords' : 'Sélectionner les accords'} (
                  {settings.selectedChords.length})
                </button>
              )}
            </div>
          )}

          {/* Right Column - Game Area (full width when settings hidden) */}
          <div className={`space-y-6 ${showSettings ? 'lg:col-span-2' : ''}`}>
            {/* Chord Display & Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <ChordDisplay
                chord={gameState.currentChord}
                timeRemaining={gameState.timeRemaining}
                totalTime={settings.countdownDuration}
                language={settings.language}
                gameMode={settings.gameMode}
              />
            </div>

            {/* Piano Keyboard */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <PianoKeyboard
                highlightedNotes={gameState.currentChord?.notes || []}
                fingering={gameState.currentChord?.fingering || []}
                showHighlight={
                  gameState.isPlaying &&
                  (settings.gameMode === 'speed'
                    ? settings.showChordOnKeyboard
                    : gameState.isRevealed)
                }
              />
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              {!gameState.isPlaying ? (
                <button
                  onClick={handleStart}
                  className="px-8 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {settings.language === 'en' ? '▶ Start' : '▶ Démarrer'}
                </button>
              ) : settings.gameMode === 'beginner' ? (
                // Beginner mode controls
                <>
                  {!gameState.isRevealed ? (
                    <button
                      onClick={handleReveal}
                      className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[180px]"
                    >
                      {settings.language === 'en' ? '👁 Reveal' : '👁 Révéler'}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="px-8 py-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[180px]"
                    >
                      {settings.language === 'en' ? '➡ Next' : '➡ Suivant'}
                    </button>
                  )}
                  <button
                    onClick={handleStop}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {settings.language === 'en' ? '⏹ Stop' : '⏹ Arrêter'}
                  </button>
                </>
              ) : (
                // Speed mode controls
                <>
                  <button
                    onClick={handlePause}
                    className="px-8 py-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105 min-w-[180px]"
                  >
                    {gameState.isPaused
                      ? settings.language === 'en'
                        ? '▶ Resume'
                        : '▶ Reprendre'
                      : settings.language === 'en'
                      ? '⏸ Pause'
                      : '⏸ Pause'}
                  </button>
                  <button
                    onClick={handleStop}
                    className="px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xl font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {settings.language === 'en' ? '⏹ Stop' : '⏹ Arrêter'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Chord Selector Modal */}
      {showChordSelector && (
        <ChordSelector
          selectedChords={settings.selectedChords}
          onSelectionChange={(chords) =>
            setSettings({ ...settings, selectedChords: chords })
          }
          language={settings.language}
          onClose={() => setShowChordSelector(false)}
        />
      )}
    </div>
  );
}

export default App;
