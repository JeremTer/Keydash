# 🎹 Piano Chord Practice Tool

A beautiful, interactive piano chord practice application built with React, TypeScript, and Tailwind CSS.

## Features

- **Timer-Based Practice**: Configurable countdown timer (1-10 seconds) for each chord
- **Visual Piano Keyboard**: Interactive SVG piano keyboard with green chord highlighting
  - Middle C positioned at the center of the keyboard
  - Right hand notes (octave 4) highlighted on the RIGHT side of middle C
  - **Finger numbers displayed on each highlighted note** (1=thumb, 3=middle, 5=pinky)
  - All chord notes highlighted in the same color for clarity
  - Standard 1-3-5 fingering for all basic triads (root position)
  - Extended keyboard range (C3-E5) to display all chord notes correctly
- **Piano Sound Playback**: Hear each chord played automatically when it appears
  - Beautiful sound icon button to easily mute/unmute (speaker icon with sound waves)
  - Mobile-friendly large button with clear visual states (blue when on, gray when off)
  - Real piano samples (Salamander Grand Piano) using Tone.js
  - Sound stops immediately when pausing or stopping practice
  - Works correctly even when practicing a single chord repeatedly
- **Bilingual Support**: Switch between English and French notation (C, D, E vs Do, Ré, Mi)
- **Multiple Practice Modes**:
  - **Learn All**: Practice all available chords randomly (never shows the same chord twice in a row)
  - **Learn Selected**: Choose specific chords to practice
- **Customizable Filters**:
  - Chord types (Major, Minor, or both)
  - Difficulty levels (Beginner, Intermediate, Advanced, or all)
- **Visual Feedback**:
  - Chord name and timer displayed side-by-side for optimal space
  - Circular countdown timer with color-coded warnings (blue → orange → red)
  - Chord difficulty badges (blue background)
  - **Prominent popularity ratings** (yellow badge with 1-5 stars, displayed next to difficulty during gameplay, based on 1,300+ song analysis)
- **Stable Layout**: No jumping or shifting when starting, stopping, or pausing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

## Key Technical Features

- **Smart Chord Rotation**: Never shows the same chord twice in a row (unless only one chord is selected)
- **Right Hand Focus**: Visual keyboard highlights show right hand notes across octaves 3-5, properly positioned relative to middle C
- **Proper Fingering Display**: Each chord shows correct finger numbers (1-3-5 pattern for right hand triads)
  - 1 = Thumb, 2 = Index, 3 = Middle, 4 = Ring, 5 = Pinky
  - Standard fingering based on piano pedagogy best practices
  - Displayed clearly within highlighted notes for easy learning
- **Enharmonic Note Matching**: Correctly highlights chords with flats (Eb, Bb, Ab) even though keyboard shows sharps (D#, A#, G#)
- **Instant Sound Control**: Pause and Stop buttons immediately silence any playing sounds
- **Single Chord Mode**: Sound plays correctly each time even when practicing just one chord
- **Optimized Performance**: Lazy-loaded piano samples with proper async handling

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

Build for production:

```bash
npm run build
```

The build output will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Deploy to Vercel

1. Install Vercel CLI (optional):
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

Or simply:
- Push to GitHub
- Import the repository in [Vercel Dashboard](https://vercel.com)
- Vercel will auto-detect the Vite configuration and deploy

### Deploy to Other Platforms

The app is a standard Vite + React application and can be deployed to:
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

Just build the project and upload the `dist` folder.

## How to Use

1. **Configure Settings** (left panel):
   - Choose your language (English/French)
   - Select practice mode (Learn All / Learn Selected)
   - Filter chord types (Major/Minor)
   - Set difficulty level
   - Adjust countdown duration
   - Toggle chord highlighting on keyboard
   - Tap the sound button to mute/unmute piano playback (with speaker icon)

2. **Select Chords** (if using "Learn Selected" mode):
   - Click "Select Chords" button
   - Choose individual chords or select by difficulty level
   - Click "Done" when finished

3. **Start Practice**:
   - Click the "Start" button
   - A random chord will appear
   - Play the chord on your piano before time runs out
   - The app automatically moves to the next chord
   - Use Pause/Resume and Stop buttons as needed

## Project Structure

```
src/
├── components/
│   ├── ChordDisplay.tsx    # Chord name, timer, and metadata display
│   ├── ChordSelector.tsx   # Chord selection modal interface
│   ├── PianoKeyboard.tsx   # SVG piano keyboard with highlighting
│   └── Settings.tsx        # Settings panel with all controls
├── data/
│   └── chords.ts          # Chord database (24 chords) and translations
├── utils/
│   ├── chordUtils.ts      # Chord filtering and random selection logic
│   └── soundUtils.ts      # Piano sound playback with Tone.js
├── types.ts               # TypeScript type definitions
└── App.tsx                # Main application component with game logic
```

## Chord Library

The app includes **all 24 major and minor chords** (12 major + 12 minor) across all keys:
- **Beginner** (10 chords): C, G, F, D, A, E major + A, D, E, C minor
- **Intermediate** (9 chords): B, Bb, Eb, Ab, Db major + F, G, B, Bb minor
- **Advanced** (5 chords): F# major + C#, F#, G#, Eb minor

### Popularity Ratings

Chord popularity ratings are based on **real-world music analysis** of 1,300+ popular songs:

- **5 stars**: C, G, F major + A, D, E minor (most common - the "Big Four" + natural keys)
- **4 stars**: D, A, E major + C minor, Bb major, G, B minor (common in pop/jazz)
- **3 stars**: Eb, F major + F, C#, F# minor (moderate usage)
- **2 stars**: Ab, Db, B major + Bb, G#, F# minor (less common - more accidentals)
- **1 star**: Eb minor (rare - 6 flats)

Each chord includes:
- Root note
- Chord type (major/minor)
- All notes in the chord
- **Right hand fingering** (1-3-5 for all triads in root position)
- Difficulty level (based on hand position and key signature)
- **Accurate popularity rating** (based on frequency in popular music)

## Technologies Used

- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern utility-first CSS
- **Vite**: Lightning-fast build tool
- **PostCSS**: CSS processing
- **Tone.js**: Web Audio framework for piano sound synthesis

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Future Enhancements

Potential features for future versions:
- Progress tracking and statistics
- More chord types (7th, 9th, diminished, augmented)
- MIDI keyboard input support
- Custom chord sets
- Practice session history
- Adjustable sound settings (volume, instrument type)

---

Enjoy practicing your piano chords! 🎶
