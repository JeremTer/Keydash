interface PianoKeyboardProps {
  highlightedNotes?: string[];
  showHighlight?: boolean;
}

// Define the piano keys with Middle C (C4) in the CENTER
// Layout: Octave 3 (left hand) | Middle C (C4) - center | Rest of Octave 4 (right hand)
// This visually shows right hand position on the RIGHT side of the keyboard
const PIANO_KEYS = [
  // Octave 3 - LEFT HAND RANGE (not highlighted)
  { note: 'C', isBlack: false, x: 0, octave: 3 },
  { note: 'C#', isBlack: true, x: 35, octave: 3 },
  { note: 'D', isBlack: false, x: 50, octave: 3 },
  { note: 'D#', isBlack: true, x: 85, octave: 3 },
  { note: 'E', isBlack: false, x: 100, octave: 3 },
  { note: 'F', isBlack: false, x: 150, octave: 3 },
  { note: 'F#', isBlack: true, x: 185, octave: 3 },
  { note: 'G', isBlack: false, x: 200, octave: 3 },
  { note: 'G#', isBlack: true, x: 235, octave: 3 },
  { note: 'A', isBlack: false, x: 250, octave: 3 },
  { note: 'A#', isBlack: true, x: 285, octave: 3 },
  { note: 'B', isBlack: false, x: 300, octave: 3 },
  // Octave 4 - RIGHT HAND RANGE (highlighted) - starts at center
  { note: 'C', isBlack: false, x: 350, octave: 4 }, // MIDDLE C - CENTER
  { note: 'C#', isBlack: true, x: 385, octave: 4 },
  { note: 'D', isBlack: false, x: 400, octave: 4 },
  { note: 'D#', isBlack: true, x: 435, octave: 4 },
  { note: 'E', isBlack: false, x: 450, octave: 4 },
  { note: 'F', isBlack: false, x: 500, octave: 4 },
  { note: 'F#', isBlack: true, x: 535, octave: 4 },
  { note: 'G', isBlack: false, x: 550, octave: 4 },
  { note: 'G#', isBlack: true, x: 585, octave: 4 },
  { note: 'A', isBlack: false, x: 600, octave: 4 },
  { note: 'A#', isBlack: true, x: 635, octave: 4 },
  { note: 'B', isBlack: false, x: 650, octave: 4 },
  // Octave 5 (just C for reference)
  { note: 'C', isBlack: false, x: 700, octave: 5 },
];

const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 180;
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_HEIGHT = 110;

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  highlightedNotes = [],
  showHighlight = true,
}) => {
  // Normalize note names for comparison (remove octave numbers if present)
  const normalizeNote = (note: string) => {
    return note.replace(/\d+/g, '');
  };

  const normalizedHighlightedNotes = highlightedNotes.map(normalizeNote);

  /**
   * Check if two notes are enharmonic equivalents
   * E.g., Eb = D#, Bb = A#, etc.
   */
  const areEnharmonic = (note1: string, note2: string) => {
    // Direct match
    if (note1 === note2) return true;

    // Enharmonic equivalents map
    const enharmonicMap: { [key: string]: string } = {
      'C#': 'Db', 'Db': 'C#',
      'D#': 'Eb', 'Eb': 'D#',
      'E#': 'F', 'F': 'E#',
      'F#': 'Gb', 'Gb': 'F#',
      'G#': 'Ab', 'Ab': 'G#',
      'A#': 'Bb', 'Bb': 'A#',
      'B#': 'C', 'C': 'B#',
      'Cb': 'B', 'B': 'Cb',
    };

    return enharmonicMap[note1] === note2;
  };

  /**
   * Check if a note should be highlighted
   * Only highlights notes in octave 4 (right hand playing position)
   * This helps learners focus on the correct hand position for playing chords
   */
  const isHighlighted = (note: string, octave: number) => {
    // Only highlight if in octave 4 (right hand - middle C range)
    if (octave !== 4) {
      return false;
    }

    const normalized = normalizeNote(note);

    // Check if the key note matches any highlighted note (including enharmonic equivalents)
    return normalizedHighlightedNotes.some(highlightedNote =>
      areEnharmonic(normalized, highlightedNote)
    );
  };

  const whiteKeys = PIANO_KEYS.filter((key) => !key.isBlack);
  const blackKeys = PIANO_KEYS.filter((key) => key.isBlack);

  return (
    <div className="flex justify-center items-center w-full px-4 py-8">
      <svg
        viewBox="0 0 750 200"
        className="w-full max-w-5xl"
        style={{ maxHeight: '300px' }}
      >
        {/* White keys */}
        {whiteKeys.map((key, index) => {
          const highlighted = showHighlight && isHighlighted(key.note, key.octave);
          return (
            <g key={`white-${key.note}-${key.octave}-${index}`}>
              <rect
                x={key.x}
                y="0"
                width={WHITE_KEY_WIDTH}
                height={WHITE_KEY_HEIGHT}
                fill={highlighted ? '#10b981' : 'white'}
                stroke="#333"
                strokeWidth="2"
                rx="3"
              />
              {highlighted && (
                <circle
                  cx={key.x + WHITE_KEY_WIDTH / 2}
                  cy={WHITE_KEY_HEIGHT - 30}
                  r="8"
                  fill="#065f46"
                />
              )}
            </g>
          );
        })}

        {/* Black keys - drawn on top */}
        {blackKeys.map((key, index) => {
          const highlighted = showHighlight && isHighlighted(key.note, key.octave);
          return (
            <g key={`black-${key.note}-${key.octave}-${index}`}>
              <rect
                x={key.x}
                y="0"
                width={BLACK_KEY_WIDTH}
                height={BLACK_KEY_HEIGHT}
                fill={highlighted ? '#10b981' : '#1a1a1a'}
                stroke="#000"
                strokeWidth="2"
                rx="2"
              />
              {highlighted && (
                <circle
                  cx={key.x + BLACK_KEY_WIDTH / 2}
                  cy={BLACK_KEY_HEIGHT - 20}
                  r="6"
                  fill="#d1fae5"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
