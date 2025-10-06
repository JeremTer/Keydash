import type { GameSettings, ChordType, Difficulty } from '../types';

interface SettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  disabled?: boolean;
}

export const Settings: React.FC<SettingsProps> = ({
  settings,
  onSettingsChange,
  disabled = false,
}) => {
  const handleLanguageToggle = () => {
    onSettingsChange({
      ...settings,
      language: settings.language === 'en' ? 'fr' : 'en',
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

  const handleDifficultyChange = (difficulty: Difficulty | 'all') => {
    onSettingsChange({
      ...settings,
      difficulty,
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

      {/* Language Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {settings.language === 'en' ? 'Language' : 'Langue'}
        </label>
        <button
          onClick={handleLanguageToggle}
          disabled={disabled}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {settings.language === 'en' ? 'English 🇬🇧' : 'Français 🇫🇷'}
        </button>
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

      {/* Difficulty */}
      <div>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
          {settings.language === 'en' ? 'Difficulty' : 'Difficulté'}
        </label>
        <div className="grid grid-cols-2 gap-2">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map((diff) => (
            <button
              key={diff}
              onClick={() => handleDifficultyChange(diff)}
              disabled={disabled}
              className={`px-4 py-2 rounded-lg transition-colors ${
                settings.difficulty === diff
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {diff === 'all'
                ? settings.language === 'en'
                  ? 'All'
                  : 'Tous'
                : diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Countdown Duration */}
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

      {/* Show Chord on Keyboard */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {settings.language === 'en' ? 'Show chord on keyboard' : 'Afficher l\'accord sur le clavier'}
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
    </div>
  );
};
