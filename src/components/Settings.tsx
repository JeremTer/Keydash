/**
 * Settings Component
 *
 * User preferences panel with mode-aware controls.
 * - Game Mode selector (Beginner Learning / Speed Practice)
 * - Language selection
 * - Chord type and difficulty filters
 * - Conditional settings based on game mode (e.g., countdown duration only in Speed mode)
 */
import type { GameSettings, ChordType, GameMode } from '../types';

interface SettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  disabled?: boolean; // Disabled during active game session
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
  disabled = false,
}) => {
  const handleLanguageChange = (language: 'en' | 'fr') => {
    onSettingsChange({
      ...settings,
      language,
    });
  };

  const handleGameModeChange = (gameMode: GameMode) => {
    onSettingsChange({
      ...settings,
      gameMode,
    });
  };

  const handleChordTypeChange = (type: ChordType) => {
    const newTypes = settings.chordTypes.includes(type)
      ? settings.chordTypes.filter((t) => t !== type)
      : [...settings.chordTypes, type];

    onSettingsChange({
      ...settings,
      chordTypes: newTypes,
    });
  };

  const handleDurationChange = (duration: number) => {
    onSettingsChange({
      ...settings,
      countdownDuration: duration,
    });
  };

  const handleShowChordToggle = () => {
    onSettingsChange({
      ...settings,
      showChordOnKeyboard: !settings.showChordOnKeyboard,
    });
  };

  const handlePlaySoundToggle = () => {
    onSettingsChange({
      ...settings,
      playSound: !settings.playSound,
    });
  };

  const handleModeChange = (mode: 'all' | 'selected') => {
    onSettingsChange({
      ...settings,
      mode,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        {settings.language === 'en' ? 'Settings' : 'Paramètres'}
      </h2>

      {/* Language Selection */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Language' : 'Langue'}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleLanguageChange('en')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.language === 'en'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            English 🇬🇧
          </button>
          <button
            onClick={() => handleLanguageChange('fr')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.language === 'fr'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Français 🇫🇷
          </button>
        </div>
      </div>

      {/* Game Mode Selection */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Game Mode' : 'Mode de jeu'}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleGameModeChange('beginner')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.gameMode === 'beginner'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Beginner Learning' : 'Apprentissage'}
          </button>
          <button
            onClick={() => handleGameModeChange('speed')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.gameMode === 'speed'
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Speed Practice' : 'Pratique rapide'}
          </button>
        </div>
      </div>

      {/* Practice Mode */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Practice Mode' : 'Mode de pratique'}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleModeChange('all')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.mode === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Learn All' : 'Tous'}
          </button>
          <button
            onClick={() => handleModeChange('selected')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.mode === 'selected'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Learn Selected' : 'Sélection'}
          </button>
        </div>
      </div>

      {/* Chord Types */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Chord Types' : 'Types d\'accords'}
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleChordTypeChange('major')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.chordTypes.includes('major')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Major' : 'Majeur'}
          </button>
          <button
            onClick={() => handleChordTypeChange('minor')}
            disabled={disabled}
            className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
              settings.chordTypes.includes('minor')
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {settings.language === 'en' ? 'Minor' : 'Mineur'}
          </button>
        </div>
      </div>

      {/* Countdown Duration - Only for Speed Mode */}
      {settings.gameMode === 'speed' && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
            {settings.language === 'en' ? 'Countdown Duration' : 'Durée du compte à rebours'}:{' '}
            {settings.countdownDuration}s
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={settings.countdownDuration}
            onChange={(e) => handleDurationChange(Number(e.target.value))}
            disabled={disabled}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1s</span>
            <span>10s</span>
          </div>
        </div>
      )}

      {/* Show Chord on Keyboard */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {settings.gameMode === 'speed'
            ? settings.language === 'en'
              ? 'Show chord on keyboard'
              : 'Afficher l\'accord sur le clavier'
            : settings.language === 'en'
            ? 'Auto-reveal chord'
            : 'Révéler l\'accord automatiquement'}
        </label>
        <button
          onClick={handleShowChordToggle}
          disabled={disabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.showChordOnKeyboard ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.showChordOnKeyboard ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Play Sound */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Sound' : 'Son'}
        </label>
        <button
          onClick={handlePlaySoundToggle}
          disabled={disabled}
          className={`w-full px-4 py-3 rounded-lg transition-all font-medium flex items-center justify-center gap-2 ${
            settings.playSound
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {/* Sound Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            {settings.playSound ? (
              // Speaker with sound waves (unmuted)
              <>
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
              </>
            ) : (
              // Speaker with X (muted)
              <>
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM17.78 9.22a.75.75 0 10-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 001.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 101.06-1.06L20.56 12l1.72-1.72a.75.75 0 00-1.06-1.06l-1.72 1.72-1.72-1.72z" />
              </>
            )}
          </svg>
          <span>
            {settings.playSound
              ? settings.language === 'en'
                ? 'Sound On'
                : 'Son activé'
              : settings.language === 'en'
              ? 'Sound Off'
              : 'Son désactivé'}
          </span>
        </button>
      </div>
    </div>
  );
};
