import type { Chord } from '../types';
import { getChordName } from '../utils/chordUtils';

interface ChordDisplayProps {
  chord: Chord | null;
  timeRemaining: number;
  totalTime: number;
  language: 'en' | 'fr';
  isPlaying: boolean;
}

export const ChordDisplay: React.FC<ChordDisplayProps> = ({
  chord,
  timeRemaining,
  totalTime,
  language,
  isPlaying,
}) => {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isWarning = percentage < 30;
  const isDanger = percentage < 15;

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8">
      {/* Chord Name */}
      <div className="text-center">
        {chord && isPlaying ? (
          <>
            <h1 className="text-6xl md:text-8xl font-bold text-gray-800 dark:text-white mb-2">
              {getChordName(chord, language)}
            </h1>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                {chord.difficulty.charAt(0).toUpperCase() + chord.difficulty.slice(1)}
              </span>
              <span className="text-yellow-500">
                {'★'.repeat(chord.popularity)}{'☆'.repeat(5 - chord.popularity)}
              </span>
            </div>
          </>
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold text-gray-400">
            {language === 'en' ? 'Press Start to Begin' : 'Appuyez sur Démarrer'}
          </h1>
        )}
      </div>

      {/* Timer Circle */}
      {isPlaying && chord && (
        <div className="relative">
          <svg width="160" height="160" className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="10"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke={isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#3b82f6'}
              strokeWidth="10"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - percentage / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-200"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={`text-4xl font-bold ${
                isDanger ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-blue-500'
              }`}
            >
              {timeRemaining.toFixed(1)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
