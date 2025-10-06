/**
 * Piano Chord Practice App - Main Component
 *
 * This component manages the entire application state and game logic.
 * It orchestrates the timer, chord selection, and user interactions.
 */

import { useState, useEffect, useCallback } from 'react';
import type { GameSettings, GameState, Chord } from './types';
import { getRandomChord } from './utils/chordUtils';
import { ChordDisplay } from './components/ChordDisplay';
import { PianoKeyboard } from './components/PianoKeyboard';
import { Settings } from './components/Settings';
import { ChordSelector } from './components/ChordSelector';

// Default settings when app first loads
const DEFAULT_SETTINGS: GameSettings = {
  language: 'en',
  chordTypes: ['major', 'minor'],
  difficulty: 'all',
  countdownDuration: 5,
  showChordOnKeyboard: true,
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
  });
  const [showChordSelector, setShowChordSelector] = useState(false);

  // Get a new random chord
  const getNextChord = useCallback((): Chord | null => {
    return getRandomChord(settings);
  }, [settings]);

  // Start game
  const handleStart = () => {
    const chord = getNextChord();
    if (!chord) {
      alert(
        settings.language === 'en'
          ? 'No chords available with current settings!'
          : 'Aucun accord disponible avec les paramètres actuels!'
      );
      return;
    }

    setGameState({
      isPlaying: true,
      isPaused: false,
      currentChord: chord,
      timeRemaining: settings.countdownDuration,
    });
  };

  // Pause game
  const handlePause = () => {
    setGameState((prev) => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
  };

  // Stop game
  const handleStop = () => {
    setGameState({
      isPlaying: false,
      isPaused: false,
      currentChord: null,
      timeRemaining: 0,
    });
  };

  /**
   * Timer Logic - Core Game Loop
   *
   * Runs every 100ms when game is active and not paused.
   * - Decrements time by 0.1 seconds
   * - When time reaches 0, loads next chord
   * - Stops game if no chords available
   */
  useEffect(() => {
    if (!gameState.isPlaying || gameState.isPaused) {
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
            };
          }

          return {
            ...prev,
            currentChord: nextChord,
            timeRemaining: settings.countdownDuration,
          };
        }

        return {
          ...prev,
          timeRemaining: newTime,
        };
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState.isPlaying, gameState.isPaused, settings.countdownDuration, getNextChord]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
            🎹 {settings.language === 'en' ? 'Piano Chord Practice' : 'Pratique des Accords Piano'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {settings.language === 'en'
              ? 'Master your piano chords with timed practice'
              : 'Maîtrisez vos accords de piano avec une pratique chronométrée'}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Settings */}
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

          {/* Right Column - Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chord Display & Timer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <ChordDisplay
                chord={gameState.currentChord}
                timeRemaining={gameState.timeRemaining}
                totalTime={settings.countdownDuration}
                language={settings.language}
              />
            </div>

            {/* Piano Keyboard */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              <PianoKeyboard
                highlightedNotes={gameState.currentChord?.notes || []}
                showHighlight={settings.showChordOnKeyboard && gameState.isPlaying}
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
              ) : (
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
