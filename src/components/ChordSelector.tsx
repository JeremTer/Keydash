import type { Chord } from '../types';
import { CHORDS } from '../data/chords';
import { getChordName, getChordsByDifficulty } from '../utils/chordUtils';

interface ChordSelectorProps {
  selectedChords: string[];
  onSelectionChange: (chordIds: string[]) => void;
  language: 'en' | 'fr';
  onClose: () => void;
}

export const ChordSelector: React.FC<ChordSelectorProps> = ({
  selectedChords,
  onSelectionChange,
  language,
  onClose,
}) => {
  const chordsByDifficulty = getChordsByDifficulty();

  const toggleChord = (chordId: string) => {
    if (selectedChords.includes(chordId)) {
      onSelectionChange(selectedChords.filter((id) => id !== chordId));
    } else {
      onSelectionChange([...selectedChords, chordId]);
    }
  };

  const selectAll = () => {
    onSelectionChange(CHORDS.map((c) => c.id));
  };

  const deselectAll = () => {
    onSelectionChange([]);
  };

  const selectDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => {
    const diffChords = chordsByDifficulty[difficulty].map((c) => c.id);
    const newSelection = [...new Set([...selectedChords, ...diffChords])];
    onSelectionChange(newSelection);
  };

  const renderChordButton = (chord: Chord) => {
    const isSelected = selectedChords.includes(chord.id);
    return (
      <button
        key={chord.id}
        onClick={() => toggleChord(chord.id)}
        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
          isSelected
            ? 'bg-blue-500 text-white shadow-md scale-105'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
      >
        <div className="flex flex-col items-center">
          <span>{getChordName(chord, language)}</span>
        </div>
      </button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {language === 'en' ? 'Select Chords to Practice' : 'Sélectionner les accords'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-b dark:border-gray-700 flex flex-wrap gap-2">
          <button
            onClick={selectAll}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
          >
            {language === 'en' ? 'Select All' : 'Tout sélectionner'}
          </button>
          <button
            onClick={deselectAll}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            {language === 'en' ? 'Deselect All' : 'Tout désélectionner'}
          </button>
          <div className="flex-1" />
          <button
            onClick={() => selectDifficulty('beginner')}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
          >
            {language === 'en' ? '+ Beginner' : '+ Débutant'}
          </button>
          <button
            onClick={() => selectDifficulty('intermediate')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors text-sm"
          >
            {language === 'en' ? '+ Intermediate' : '+ Intermédiaire'}
          </button>
          <button
            onClick={() => selectDifficulty('advanced')}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
          >
            {language === 'en' ? '+ Advanced' : '+ Avancé'}
          </button>
        </div>

        {/* Chord List */}
        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          <div className="space-y-6">
            {/* Beginner */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                {language === 'en' ? 'Beginner' : 'Débutant'} ({chordsByDifficulty.beginner.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {chordsByDifficulty.beginner.map(renderChordButton)}
              </div>
            </div>

            {/* Intermediate */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                {language === 'en' ? 'Intermediate' : 'Intermédiaire'} ({chordsByDifficulty.intermediate.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {chordsByDifficulty.intermediate.map(renderChordButton)}
              </div>
            </div>

            {/* Advanced */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 flex items-center">
                <span className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
                {language === 'en' ? 'Advanced' : 'Avancé'} ({chordsByDifficulty.advanced.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                {chordsByDifficulty.advanced.map(renderChordButton)}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {selectedChords.length} {language === 'en' ? 'chords selected' : 'accords sélectionnés'}
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            {language === 'en' ? 'Done' : 'Terminé'}
          </button>
        </div>
      </div>
    </div>
  );
};
