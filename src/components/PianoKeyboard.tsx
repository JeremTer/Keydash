interface PianoKeyboardProps {
  highlightedNotes?: string[];
  fingering?: number[];
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
  // Octave 5 - Extended to show high chord notes
  { note: 'C', isBlack: false, x: 700, octave: 5 },
  { note: 'C#', isBlack: true, x: 735, octave: 5 },
  { note: 'D', isBlack: false, x: 750, octave: 5 },
  { note: 'D#', isBlack: true, x: 785, octave: 5 },
  { note: 'E', isBlack: false, x: 800, octave: 5 },
];

const WHITE_KEY_WIDTH = 50;
const WHITE_KEY_HEIGHT = 180;
const BLACK_KEY_WIDTH = 30;
const BLACK_KEY_HEIGHT = 110;

export const PianoKeyboard: React.FC<PianoKeyboardProps> = ({
  highlightedNotes = [],
  fingering = [],
  showHighlight = true,
}) => {
  // Parse note into name and octave (e.g., "C4" -> {name: "C", octave: 4})
  const parseNote = (note: string): { name: string; octave: number } => {
    const match = note.match(/^([A-G][#b]?)(\d+)$/);
    if (match) {
      return { name: match[1], octave: parseInt(match[2]) };
    }
    // Fallback if no octave specified
    return { name: note, octave: 4 };
  };

  // Create a mapping from "note+octave" to finger number
  const noteToFinger: { [key: string]: number } = {};
  highlightedNotes.forEach((note, index) => {
    if (fingering[index]) {
      noteToFinger[note] = fingering[index];
    }
  });

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
   * Matches both note name (with enharmonic equivalents) and exact octave
   */
  const isHighlighted = (keyNote: string, keyOctave: number) => {
    // Check if any highlighted note matches this key
    return highlightedNotes.some(highlightedNote => {
      const parsed = parseNote(highlightedNote);

      // Must match octave exactly
      if (parsed.octave !== keyOctave) {
        return false;
      }

      // Check if note names match (including enharmonic equivalents)
      return areEnharmonic(keyNote, parsed.name);
    });
  };

  /**
   * Get finger number for a note+octave (considering enharmonic equivalents)
   */
  const getFingerNumber = (keyNote: string, keyOctave: number): number | null => {
    // Check each highlighted note for a match
    for (const [noteWithOctave, fingerNum] of Object.entries(noteToFinger)) {
      const parsed = parseNote(noteWithOctave);

      // Must match octave
      if (parsed.octave !== keyOctave) {
        continue;
      }

      // Check if note names match (including enharmonic equivalents)
      if (areEnharmonic(keyNote, parsed.name)) {
        return fingerNum;
      }
    }

    return null;
  };

  const whiteKeys = PIANO_KEYS.filter((key) => !key.isBlack);
  const blackKeys = PIANO_KEYS.filter((key) => key.isBlack);

  return (
    <div className="flex justify-center items-center w-full px-4 py-8">
      <svg
        viewBox="0 0 850 200"
        className="w-full max-w-5xl"
        style={{ maxHeight: '300px' }}
      >
        {/* White keys */}
        {whiteKeys.map((key, index) => {
          const highlighted = showHighlight && isHighlighted(key.note, key.octave);
          const fingerNum = highlighted ? getFingerNumber(key.note, key.octave) : null;
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
              {highlighted && fingerNum && (
                <>
                  {/* Finger number circle */}
                  <circle
                    cx={key.x + WHITE_KEY_WIDTH / 2}
                    cy={WHITE_KEY_HEIGHT - 30}
                    r="12"
                    fill="#065f46"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  {/* Finger number text */}
                  <text
                    x={key.x + WHITE_KEY_WIDTH / 2}
                    y={WHITE_KEY_HEIGHT - 30}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="16"
                    fontWeight="bold"
                    fill="#fff"
                  >
                    {fingerNum}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* Black keys - drawn on top */}
        {blackKeys.map((key, index) => {
          const highlighted = showHighlight && isHighlighted(key.note, key.octave);
          const fingerNum = highlighted ? getFingerNumber(key.note, key.octave) : null;
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
              {highlighted && fingerNum && (
                <>
                  {/* Finger number circle */}
                  <circle
                    cx={key.x + BLACK_KEY_WIDTH / 2}
                    cy={BLACK_KEY_HEIGHT - 20}
                    r="10"
                    fill="#065f46"
                    stroke="#fff"
                    strokeWidth="2"
                  />
                  {/* Finger number text */}
                  <text
                    x={key.x + BLACK_KEY_WIDTH / 2}
                    y={BLACK_KEY_HEIGHT - 20}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="14"
                    fontWeight="bold"
                    fill="#fff"
                  >
                    {fingerNum}
                  </text>
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
