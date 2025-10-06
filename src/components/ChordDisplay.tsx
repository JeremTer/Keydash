import type { Chord } from '../types';
import { getChordName } from '../utils/chordUtils';

interface ChordDisplayProps {
  chord: Chord | null;
  timeRemaining: number;
  totalTime: number;
  language: 'en' | 'fr';
}

export const ChordDisplay: React.FC<ChordDisplayProps> = ({
  chord,
  timeRemaining,
  totalTime,
  language,
}) => {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isWarning = percentage < 30;
  const isDanger = percentage < 15;

  return (
    <div className="py-4 px-4 min-h-[140px]">
      <div className="flex items-center justify-between gap-6 flex-wrap md:flex-nowrap">
        {/* Left: Chord Name and Info - Always reserve space */}
        <div className="flex-1 text-center md:text-left min-h-[100px] flex flex-col justify-center">
          {chord ? (
            <>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-2">
                {getChordName(chord, language)}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-sm text-gray-500">
                <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">
                  {chord.difficulty.charAt(0).toUpperCase() + chord.difficulty.slice(1)}
                </span>
                <span className="text-yellow-500">
                  {'★'.repeat(chord.popularity)}{'☆'.repeat(5 - chord.popularity)}
                </span>
              </div>
            </>
          ) : (
            <h1 className="text-3xl md:text-4xl font-bold text-gray-400">
              {language === 'en' ? 'Press Start to Begin' : 'Appuyez sur Démarrer'}
            </h1>
          )}
        </div>

        {/* Right: Timer Circle - Always visible to prevent layout shift */}
        <div className="flex-shrink-0 w-[120px]">
          <div className="relative">
            <svg width="120" height="120" className="transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={isDanger ? '#ef4444' : isWarning ? '#f59e0b' : '#3b82f6'}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 50}`}
                strokeDashoffset={`${2 * Math.PI * 50 * (1 - percentage / 100)}`}
                strokeLinecap="round"
                className="transition-all duration-200"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-3xl font-bold ${
                  isDanger ? 'text-red-500' : isWarning ? 'text-orange-500' : 'text-blue-500'
                }`}
              >
                {timeRemaining.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
