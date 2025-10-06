# 🎹 Piano Chord Practice Tool

A beautiful, interactive piano chord practice application built with React, TypeScript, and Tailwind CSS.

## Features

- **Timer-Based Practice**: Configurable countdown timer (1-10 seconds) for each chord
- **Visual Piano Keyboard**: Interactive SVG piano keyboard with green chord highlighting
  - All chord notes highlighted in the same color for clarity
  - 2-octave keyboard range
- **Bilingual Support**: Switch between English and French notation (C, D, E vs Do, Ré, Mi)
- **Multiple Practice Modes**:
  - **Learn All**: Practice all available chords randomly
  - **Learn Selected**: Choose specific chords to practice
- **Customizable Filters**:
  - Chord types (Major, Minor, or both)
  - Difficulty levels (Beginner, Intermediate, Advanced, or all)
- **Visual Feedback**:
  - Chord name and timer displayed side-by-side for optimal space
  - Circular countdown timer with color-coded warnings (blue → orange → red)
  - Chord difficulty badges
  - **Research-based popularity ratings** (1-5 stars based on 1,300+ song analysis)
- **Stable Layout**: No jumping or shifting when starting, stopping, or pausing
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations

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
│   ├── ChordDisplay.tsx    # Chord name and timer display
│   ├── ChordSelector.tsx   # Chord selection modal
│   ├── PianoKeyboard.tsx   # SVG piano keyboard
│   └── Settings.tsx        # Settings panel
├── data/
│   └── chords.ts          # Chord data and translations
├── utils/
│   └── chordUtils.ts      # Chord filtering and selection logic
├── types.ts               # TypeScript type definitions
└── App.tsx                # Main application component
```

## Chord Library

The app includes **all 24 major and minor chords** (12 major + 12 minor) across all keys:
- **Beginner** (10 chords): C, G, F, D, A, E major + A, D, E, C minor
- **Intermediate** (9 chords): B, Bb, Eb, Ab, Db major + F, G, B, Bb minor
- **Advanced** (8 chords): Gb, C#, F# major + C#, F#, G#, Eb, Ab minor

### Popularity Ratings

Chord popularity ratings are based on **real-world music analysis** of 1,300+ popular songs:

- **5 stars**: C, G, F major + A, D, E minor (most common - the "Big Four" + natural keys)
- **4 stars**: D, A, E major + C minor, Bb major, G, B minor (common in pop/jazz)
- **3 stars**: Eb major, F, C#, F# minor (moderate usage)
- **2 stars**: Ab, Db, B major + Bb, G#, F# minor (less common - more accidentals)
- **1 star**: Gb, C# major + Eb, Ab minor (rare - many accidentals)

Each chord includes:
- Root note
- Chord type (major/minor)
- All notes in the chord
- Difficulty level (based on hand position and key signature)
- **Accurate popularity rating** (based on frequency in popular music)

## Technologies Used

- **React 19**: Latest React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Modern utility-first CSS
- **Vite**: Lightning-fast build tool
- **PostCSS**: CSS processing

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## Future Enhancements

Potential features for future versions:
- Sound playback for chords
- Progress tracking and statistics
- More chord types (7th, 9th, diminished, augmented)
- MIDI keyboard input support
- Custom chord sets
- Practice session history

---

Enjoy practicing your piano chords! 🎶
