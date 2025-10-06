# Technical Documentation

## Architecture Overview

This is a single-page React application built with modern frontend technologies. The app follows a **component-based architecture** with clear separation of concerns.

### Tech Stack

- **React 19** - UI library with hooks for state management
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS v4** - Utility-first CSS framework with `@tailwindcss/postcss`
- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing pipeline

### Project Structure

```
/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ChordDisplay.tsx
│   │   ├── ChordSelector.tsx
│   │   ├── PianoKeyboard.tsx
│   │   └── Settings.tsx
│   ├── data/
│   │   └── chords.ts       # Chord database and translations
│   ├── utils/
│   │   └── chordUtils.ts   # Pure utility functions
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main app component (state management)
│   ├── main.tsx            # React app entry point
│   └── index.css           # Tailwind imports
├── public/                 # Static assets
├── dist/                   # Build output (generated)
├── package.json
├── tsconfig.json
├── vite.config.ts
├── postcss.config.js
└── vercel.json            # Vercel deployment config
```

---

## Core Concepts

### 1. State Management

The app uses **React's built-in hooks** for state management (no external libraries needed):

- `useState` - Local component state
- `useEffect` - Side effects (timer logic)
- `useCallback` - Memoized functions to prevent unnecessary re-renders

**Main State** (in `App.tsx`):
```typescript
// Settings state - user preferences
const [settings, setSettings] = useState<GameSettings>(...)

// Game state - current game status
const [gameState, setGameState] = useState<GameState>(...)

// UI state - modal visibility
const [showChordSelector, setShowChordSelector] = useState(false)
```

### 2. Data Flow

**Unidirectional data flow** (React best practice):

```
App.tsx (state owner)
  ↓ props
  ↓
Settings.tsx / ChordDisplay.tsx / PianoKeyboard.tsx / ChordSelector.tsx
  ↑ callbacks
  ↑
App.tsx (updates state)
```

**Example:**
1. User clicks "Start" button → `handleStart()` in App.tsx
2. App.tsx updates `gameState` with `setGameState()`
3. State change triggers re-render
4. Components receive new props and update UI

---

## Components Deep Dive

### App.tsx - Main Application Component

**Responsibility:** State management and game logic orchestration

**Key Features:**
- Manages global settings and game state
- Timer logic using `useEffect` with 100ms interval
- Generates random chords based on settings
- Handles Start/Pause/Stop actions

**Important Code Patterns:**

```typescript
// Timer runs every 100ms when game is active
useEffect(() => {
  if (!gameState.isPlaying || gameState.isPaused) return;

  const interval = setInterval(() => {
    setGameState((prev) => {
      const newTime = prev.timeRemaining - 0.1;

      // Time's up - get next chord
      if (newTime <= 0) {
        const nextChord = getNextChord();
        return { ...prev, currentChord: nextChord, timeRemaining: duration };
      }

      return { ...prev, timeRemaining: newTime };
    });
  }, 100);

  return () => clearInterval(interval); // Cleanup
}, [gameState.isPlaying, gameState.isPaused, ...]);
```

**Why this works:**
- `setGameState` with function form ensures we have the latest state
- Dependencies array ensures effect re-runs when needed
- Cleanup function prevents memory leaks

---

### ChordDisplay.tsx - Chord Name & Timer

**Responsibility:** Display current chord and countdown timer

**Key Features:**
- Shows chord name in selected language (en/fr)
- Circular SVG countdown timer
- Color-coded warnings (blue → orange → red)
- Shows difficulty and popularity stars

**SVG Circle Animation:**
```typescript
// Circle circumference = 2 * π * radius
const circumference = 2 * Math.PI * 70;

// Offset based on percentage remaining
strokeDashoffset={circumference * (1 - percentage / 100)}
```

**How it works:**
- `strokeDasharray` sets the total dash length (full circle)
- `strokeDashoffset` controls how much is "hidden"
- As time decreases, offset increases, creating countdown effect

---

### PianoKeyboard.tsx - SVG Piano Component

**Responsibility:** Render piano keyboard with highlighted chord notes

**Key Features:**
- 2 octaves + 1 note (25 keys total)
- White keys drawn first, black keys on top (z-index via SVG order)
- Highlights notes in blue (white keys) and red (black keys)
- Responsive SVG that scales to container

**Note Matching Logic:**
```typescript
const isHighlighted = (note: string) => {
  const normalized = normalizeNote(note);
  return (
    normalizedHighlightedNotes.includes(normalized) ||
    normalizedHighlightedNotes.includes(normalized.replace('b', '#')) ||
    normalizedHighlightedNotes.includes(normalized.replace('#', 'b'))
  );
};
```

**Why enharmonic matching:**
- `Db` and `C#` are the same pitch
- Chords might use either notation
- This ensures highlights work regardless of notation choice

**SVG Positioning:**
- White keys: x = 0, 50, 100, 150... (50px apart)
- Black keys: x = 35, 85, 135... (offset from white keys)
- ViewBox: `0 0 750 200` makes it easy to position keys

---

### Settings.tsx - Settings Panel

**Responsibility:** User preferences UI

**Key Features:**
- Language toggle (EN ↔ FR)
- Practice mode selection
- Chord type filters (major/minor)
- Difficulty filters
- Duration slider (1-10s)
- Show/hide chord toggle

**State Updates:**
```typescript
const handleLanguageToggle = () => {
  onSettingsChange({
    ...settings,
    language: settings.language === 'en' ? 'fr' : 'en',
  });
};
```

**Immutable State Updates:**
- Spread operator (`...settings`) creates a new object
- Only the changed property is updated
- React detects change and re-renders

---

### ChordSelector.tsx - Chord Selection Modal

**Responsibility:** Allow users to select specific chords for practice

**Key Features:**
- Modal overlay with backdrop
- Grouped by difficulty
- Quick actions (Select All, by difficulty)
- Visual selection state
- Scroll-able content area

**Chord Toggle Logic:**
```typescript
const toggleChord = (chordId: string) => {
  if (selectedChords.includes(chordId)) {
    // Remove chord
    onSelectionChange(selectedChords.filter((id) => id !== chordId));
  } else {
    // Add chord
    onSelectionChange([...selectedChords, chordId]);
  }
};
```

**Fixed Height with Scroll:**
```css
max-height: calc(90vh - 200px)
overflow-y: auto
```
- Ensures modal fits on screen
- Content scrolls independently
- Header/footer remain fixed

---

## Data Layer

### types.ts - TypeScript Type Definitions

**Core Types:**

```typescript
// User preferences
export interface GameSettings {
  language: 'en' | 'fr';
  chordTypes: ChordType[];        // ['major', 'minor']
  difficulty: Difficulty | 'all'; // Filtering
  countdownDuration: number;      // 1-10 seconds
  showChordOnKeyboard: boolean;
  selectedChords: string[];       // For "Learn Selected" mode
  mode: 'all' | 'selected';
}

// Current game status
export interface GameState {
  isPlaying: boolean;
  isPaused: boolean;
  currentChord: Chord | null;
  timeRemaining: number;
}

// Chord data structure
export interface Chord {
  id: string;                    // "C-major"
  root: string;                  // "C"
  type: ChordType;               // "major" | "minor"
  notes: string[];               // ["C", "E", "G"]
  difficulty: Difficulty;        // "beginner" | "intermediate" | "advanced"
  popularity: number;            // 1-5 (for stars)
}
```

**Why these types:**
- `GameSettings` - everything user can configure
- `GameState` - ephemeral runtime state
- `Chord` - single source of truth for chord data
- Separation makes state management clearer

---

### data/chords.ts - Chord Database

**27 Chords Total:**
- **Beginner (10):** C, G, F, D, A, E major + A, D, E, C minor
- **Intermediate (9):** B, Bb, Eb, Ab, Db major + F, G, B, Bb minor
- **Advanced (8):** Gb, C#, F# major + C#, F#, G#, Eb, Ab minor

**Data Structure:**
```typescript
export const CHORDS: Chord[] = [
  {
    id: 'C-major',
    root: 'C',
    type: 'major',
    notes: ['C', 'E', 'G'],
    difficulty: 'beginner',
    popularity: 5,
  },
  // ... more chords
];
```

**Note Translations:**
```typescript
export const NOTE_TRANSLATIONS = {
  'C': { en: 'C', fr: 'Do' },
  'D': { en: 'D', fr: 'Ré' },
  'E': { en: 'E', fr: 'Mi' },
  // ... etc
};
```

**Design Decisions:**
- Hardcoded data (no API) for simplicity and speed
- Each chord has explicit notes (no calculation needed)
- Popularity helps users focus on common chords
- Easy to extend (add more chords, add 7th chords, etc.)

---

### utils/chordUtils.ts - Pure Utility Functions

**Key Functions:**

```typescript
// Get random chord based on filters
export const getRandomChord = (settings: GameSettings): Chord | null

// Apply all filters (mode, type, difficulty)
export const getAvailableChords = (settings: GameSettings): Chord[]

// Translate chord name to selected language
export const getChordName = (chord: Chord, language: 'en' | 'fr'): string

// Get chords grouped by difficulty
export const getChordsByDifficulty = () => { beginner, intermediate, advanced }
```

**Pure Functions:**
- No side effects
- Same input → same output
- Easy to test
- Reusable across components

**Filtering Logic:**
```typescript
export const getAvailableChords = (settings: GameSettings): Chord[] => {
  let filtered = CHORDS;

  // Filter by selected chords (if mode === 'selected')
  if (settings.mode === 'selected') {
    filtered = filtered.filter(c => settings.selectedChords.includes(c.id));
  }

  // Filter by chord type (major/minor)
  if (settings.chordTypes.length > 0) {
    filtered = filtered.filter(c => settings.chordTypes.includes(c.type));
  }

  // Filter by difficulty
  if (settings.difficulty !== 'all') {
    filtered = filtered.filter(c => c.difficulty === settings.difficulty);
  }

  return filtered;
};
```

---

## Styling Approach

### Tailwind CSS v4

**Key Classes Used:**

- **Layout:** `flex`, `grid`, `container`, `mx-auto`
- **Spacing:** `p-{n}`, `m-{n}`, `gap-{n}`
- **Colors:** `bg-blue-500`, `text-gray-800`, `dark:bg-gray-800`
- **Responsive:** `md:text-6xl`, `lg:col-span-2`
- **Interactive:** `hover:bg-blue-600`, `transition-colors`, `transform`, `scale-105`

**Dark Mode Support:**
```css
dark:bg-gray-800
dark:text-white
```
- Automatic based on system preference
- No toggle needed (Tailwind handles it)

**Gradient Background:**
```css
bg-gradient-to-br from-blue-50 to-indigo-100
dark:from-gray-900 dark:to-gray-800
```

**Why Tailwind:**
- No separate CSS files to maintain
- Responsive design built-in
- Consistent design system
- Small production bundle (unused styles purged)

---

## Build & Deployment

### Vite Configuration

**Why Vite:**
- ⚡ Fast HMR (Hot Module Replacement)
- 📦 Optimized production builds
- 🔧 Zero config for React + TypeScript
- 🎯 Native ESM support

**Build Process:**
1. TypeScript compilation (`tsc -b`)
2. Vite bundling and optimization
3. Output to `dist/` folder

**Build Commands:**
```bash
npm run dev     # Dev server with HMR
npm run build   # Production build
npm run preview # Preview production build locally
```

### Vercel Deployment

**vercel.json Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

**Deployment Steps:**
1. Push code to GitHub
2. Import repo in Vercel dashboard
3. Vercel auto-detects Vite config
4. Automatic builds on every push

**Why Vercel:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs

---

## Design Patterns & Principles

### KISS (Keep It Simple, Stupid)

✅ **Applied:**
- No complex state management library (Redux, MobX)
- Plain React hooks for state
- Simple data structures (arrays, objects)
- No over-engineered abstractions

### DRY (Don't Repeat Yourself)

✅ **Applied:**
- Utility functions in `chordUtils.ts`
- Reusable TypeScript types
- Shared constants (`NOTE_TRANSLATIONS`)
- Component props for configuration

### SOLID Principles

✅ **Single Responsibility:**
- Each component has one job
- `App.tsx` = state management
- `PianoKeyboard.tsx` = visual rendering
- `chordUtils.ts` = pure logic

✅ **Open/Closed:**
- Easy to add new chords (just modify `CHORDS` array)
- Easy to add new languages (add to `NOTE_TRANSLATIONS`)
- Components accept props for flexibility

✅ **Interface Segregation:**
- TypeScript interfaces are minimal
- Props interfaces only include what's needed
- No "god objects"

---

## Performance Considerations

### React Optimization

**useCallback for Memoization:**
```typescript
const getNextChord = useCallback((): Chord | null => {
  return getRandomChord(settings);
}, [settings]);
```
- Prevents function recreation on every render
- Stable reference for `useEffect` dependencies

**Conditional Rendering:**
```typescript
{!gameState.isPlaying ? (
  <StartButton />
) : (
  <PauseStopButtons />
)}
```
- Only render what's needed
- Reduces DOM operations

### Bundle Size

**Production Build:**
- CSS: ~20.5 KB (gzipped: 4.55 KB)
- JS: ~214 KB (gzipped: 65.6 KB)

**Optimizations:**
- Tree-shaking (unused code removed)
- Tailwind purges unused styles
- Vite code-splitting
- SVG inline (no extra requests)

### Timer Performance

**100ms Interval:**
```typescript
setInterval(() => { ... }, 100)
```
- Updates every 0.1s for smooth countdown
- Low CPU usage
- Cleanup prevents memory leaks

---

## Testing Strategy

### Manual Testing Checklist

- [ ] Start game with different settings
- [ ] Pause/Resume functionality
- [ ] Timer counts down correctly
- [ ] Chord changes automatically at 0
- [ ] Language toggle works
- [ ] Chord selector opens/closes
- [ ] Keyboard highlights correct notes
- [ ] Responsive on mobile/tablet/desktop
- [ ] Dark mode renders correctly

### Future: Automated Testing

**Recommended Tools:**
- **Vitest** - Unit tests for utils
- **React Testing Library** - Component tests
- **Playwright** - E2E tests

**Example Test:**
```typescript
// utils/chordUtils.test.ts
test('filters chords by difficulty', () => {
  const settings = { difficulty: 'beginner', ... };
  const chords = getAvailableChords(settings);
  expect(chords.every(c => c.difficulty === 'beginner')).toBe(true);
});
```

---

## Browser Compatibility

**Supported Browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari (iOS 14+)
- Chrome Android

**Features Used:**
- ES6+ (Vite transpiles for older browsers)
- CSS Grid & Flexbox
- SVG
- CSS Variables (Tailwind)

---

## Extending the App

### Adding New Chords

1. Open `src/data/chords.ts`
2. Add to `CHORDS` array:
```typescript
{
  id: 'C-major7',
  root: 'C',
  type: 'major7', // Add to ChordType in types.ts
  notes: ['C', 'E', 'G', 'B'],
  difficulty: 'intermediate',
  popularity: 4,
}
```
3. Update TypeScript types if needed

### Adding New Languages

1. Update `types.ts`:
```typescript
export type Language = 'en' | 'fr' | 'es';
```

2. Update `NOTE_TRANSLATIONS`:
```typescript
'C': { en: 'C', fr: 'Do', es: 'Do' }
```

3. Update UI strings in components

### Adding Sound Playback

**Approach:**
1. Add audio library (e.g., Tone.js)
2. Create `AudioPlayer` utility
3. Trigger on chord change:
```typescript
useEffect(() => {
  if (currentChord) {
    playChord(currentChord.notes);
  }
}, [currentChord]);
```

### Adding MIDI Input

**Approach:**
1. Use Web MIDI API
2. Create `useMIDI` hook
3. Compare pressed notes with `currentChord.notes`
4. Auto-advance on correct chord

---

## Common Issues & Solutions

### Issue: Tailwind styles not applying

**Solution:** Check `postcss.config.js`:
```js
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // v4 uses this
    autoprefixer: {},
  },
}
```

### Issue: TypeScript errors on imports

**Solution:** Use type-only imports:
```typescript
import type { Chord, GameSettings } from './types';
```

### Issue: Timer drift

**Current:** 100ms interval might drift over time

**Solution:** Use `requestAnimationFrame` or track actual elapsed time:
```typescript
const startTime = Date.now();
const elapsed = Date.now() - startTime;
```

---

## File-by-File Breakdown

| File | Lines | Purpose | Complexity |
|------|-------|---------|------------|
| `App.tsx` | ~220 | Main app logic | Medium |
| `ChordDisplay.tsx` | ~80 | Display chord & timer | Low |
| `PianoKeyboard.tsx` | ~130 | SVG keyboard | Medium |
| `Settings.tsx` | ~200 | Settings UI | Low |
| `ChordSelector.tsx` | ~180 | Chord selection modal | Medium |
| `chordUtils.ts` | ~70 | Utility functions | Low |
| `chords.ts` | ~200 | Chord data | None (data) |
| `types.ts` | ~40 | TypeScript types | None (types) |

**Total:** ~1,120 lines of code (excluding comments)

---

## Key Takeaways

1. **Simple State Management** - React hooks are sufficient for this app
2. **Type Safety** - TypeScript prevents runtime errors
3. **Component Composition** - Small, focused components
4. **Separation of Concerns** - Data, logic, and UI are separate
5. **Performance** - Optimized re-renders with useCallback
6. **Scalability** - Easy to add new features
7. **Modern Tooling** - Vite + Tailwind = fast development

---

## Resources & References

- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)

---

**Questions or want to contribute?** Check the main README.md for contribution guidelines!
