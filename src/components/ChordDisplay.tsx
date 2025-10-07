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
      <div className="flex items-center justify-between gap-3 md:gap-6">
        {/* Left: Chord Name and Info - Always reserve space */}
        <div className="flex-1 text-center md:text-left min-h-[80px] md:min-h-[100px] flex flex-col justify-center">
          {chord ? (
            <>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
                {getChordName(chord, language)}
              </h1>
              <div className="flex items-center justify-center md:justify-start space-x-2 md:space-x-3 text-xs md:text-sm flex-wrap gap-y-1">
                <span className="px-2 md:px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded font-medium">
                  {chord.difficulty.charAt(0).toUpperCase() + chord.difficulty.slice(1)}
                </span>
                <span className="px-2 md:px-3 py-1 bg-yellow-100 dark:bg-yellow-900 rounded font-medium flex items-center gap-1">
                  <span className="text-yellow-700 dark:text-yellow-300 text-xs font-semibold">
                    {language === 'en' ? 'Pop' : 'Pop'}:
                  </span>
                  <span className="text-yellow-600 dark:text-yellow-400 text-sm md:text-base">
                    {'★'.repeat(chord.popularity)}{'☆'.repeat(5 - chord.popularity)}
                  </span>
                </span>
              </div>
            </>
          ) : (
            <h1 className="text-2xl md:text-4xl font-bold text-gray-400">
              {language === 'en' ? 'Press Start to Begin' : 'Appuyez sur Démarrer'}
            </h1>
          )}
        </div>

        {/* Right: Timer Circle - Smaller on mobile, always visible to prevent layout shift */}
        <div className="flex-shrink-0 w-[80px] md:w-[120px]">
          <div className="relative">
            <svg width="100%" height="100%" viewBox="0 0 120 120" className="transform -rotate-90">
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
                className={`text-2xl md:text-3xl font-bold ${
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
