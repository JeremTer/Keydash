interface PianoKeyboardProps {
  highlightedNotes?: string[];
  showHighlight?: boolean;
}

// Define the piano keys for 2 octaves (C4 to C6)
const PIANO_KEYS = [
  // Octave 4
  { note: 'C', isBlack: false, x: 0 },
  { note: 'C#', isBlack: true, x: 35 },
  { note: 'D', isBlack: false, x: 50 },
  { note: 'D#', isBlack: true, x: 85 },
  { note: 'E', isBlack: false, x: 100 },
  { note: 'F', isBlack: false, x: 150 },
  { note: 'F#', isBlack: true, x: 185 },
  { note: 'G', isBlack: false, x: 200 },
  { note: 'G#', isBlack: true, x: 235 },
  { note: 'A', isBlack: false, x: 250 },
  { note: 'A#', isBlack: true, x: 285 },
  { note: 'B', isBlack: false, x: 300 },
  // Octave 5
  { note: 'C', isBlack: false, x: 350 },
  { note: 'C#', isBlack: true, x: 385 },
  { note: 'D', isBlack: false, x: 400 },
  { note: 'D#', isBlack: true, x: 435 },
  { note: 'E', isBlack: false, x: 450 },
  { note: 'F', isBlack: false, x: 500 },
  { note: 'F#', isBlack: true, x: 535 },
  { note: 'G', isBlack: false, x: 550 },
  { note: 'G#', isBlack: true, x: 585 },
  { note: 'A', isBlack: false, x: 600 },
  { note: 'A#', isBlack: true, x: 635 },
  { note: 'B', isBlack: false, x: 650 },
  // Octave 6 (just C)
  { note: 'C', isBlack: false, x: 700 },
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

  const isHighlighted = (note: string) => {
    const normalized = normalizeNote(note);
    // Check if the note (without accidentals) or with sharp/flat is in the highlighted list
    return (
      normalizedHighlightedNotes.includes(normalized) ||
      normalizedHighlightedNotes.includes(normalized.replace('b', '#')) ||
      normalizedHighlightedNotes.includes(normalized.replace('#', 'b'))
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
          const highlighted = showHighlight && isHighlighted(key.note);
          return (
            <g key={`white-${key.note}-${index}`}>
              <rect
                x={key.x}
                y="0"
                width={WHITE_KEY_WIDTH}
                height={WHITE_KEY_HEIGHT}
                fill={highlighted ? '#60a5fa' : 'white'}
                stroke="#333"
                strokeWidth="2"
                rx="3"
              />
              {highlighted && (
                <circle
                  cx={key.x + WHITE_KEY_WIDTH / 2}
                  cy={WHITE_KEY_HEIGHT - 30}
                  r="8"
                  fill="#1e40af"
                />
              )}
            </g>
          );
        })}

        {/* Black keys - drawn on top */}
        {blackKeys.map((key, index) => {
          const highlighted = showHighlight && isHighlighted(key.note);
          return (
            <g key={`black-${key.note}-${index}`}>
              <rect
                x={key.x}
                y="0"
                width={BLACK_KEY_WIDTH}
                height={BLACK_KEY_HEIGHT}
                fill={highlighted ? '#ef4444' : '#1a1a1a'}
                stroke="#000"
                strokeWidth="2"
                rx="2"
              />
              {highlighted && (
                <circle
                  cx={key.x + BLACK_KEY_WIDTH / 2}
                  cy={BLACK_KEY_HEIGHT - 20}
                  r="6"
                  fill="#fee"
                />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
