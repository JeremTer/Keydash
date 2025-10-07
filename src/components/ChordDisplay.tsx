import type { Chord, GameMode } from '../types';
import { getChordName } from '../utils/chordUtils';

interface ChordDisplayProps {
  chord: Chord | null;
  timeRemaining: number;
  totalTime: number;
  language: 'en' | 'fr';
  gameMode?: GameMode;
}

export const ChordDisplay: React.FC<ChordDisplayProps> = ({
  chord,
  timeRemaining,
  totalTime,
  language,
  gameMode = 'speed',
}) => {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isWarning = percentage < 30;
  const isDanger = percentage < 15;

  return (
    <div className="py-4 px-4 min-h-[140px]">
      <div className="flex items-center justify-between gap-3 md:gap-6">
        {/* Left: Chord Name and Info - Always reserve space */}
        <div className={`flex-1 ${gameMode === 'speed' ? 'text-center md:text-left' : 'text-center'} min-h-[80px] md:min-h-[100px] flex flex-col justify-center`}>
          {chord ? (
            <>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 dark:text-white mb-1 md:mb-2">
                {getChordName(chord, language)}
              </h1>
            </>
          ) : (
            <h1 className="text-2xl md:text-4xl font-bold text-gray-400">
              {language === 'en' ? 'Press Start to Begin' : 'Appuyez sur Démarrer'}
            </h1>
          )}
        </div>

        {/* Right: Timer Circle - Only show in speed mode */}
        {gameMode === 'speed' && (
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
        )}
      </div>
    </div>
  );
};
