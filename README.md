# Sorting Visualizer - React TypeScript

A modern, interactive sorting algorithm visualizer built with React and TypeScript. This application visualizes the Bubble Sort algorithm with real-time audio feedback and smooth animations.

## Features

- 🎨 **Visual Sorting Animation**: Watch the Bubble Sort algorithm in action with color-coded bars
- 🔊 **Audio Feedback**: Hear the sorting process through frequency-based audio tones
- ⚛️ **React Components**: Clean component architecture with TypeScript
- 🎯 **Component-Based Design**: Separate `Visualizer` and `Bar` components
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎭 **Modern UI**: Beautiful gradient design with smooth transitions

## Project Structure

```
sorting-visualizer-react/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── Bar.tsx         # Bar component (individual bar)
│   │   ├── Bar.css         # Bar styles
│   │   ├── Visualizer.tsx  # Visualizer component (main logic)
│   │   └── Visualizer.css  # Visualizer styles
│   ├── App.tsx             # Main App component
│   ├── App.css             # App styles
│   ├── index.tsx           # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js) or **yarn** package manager

You can check if you have them installed by running:
```bash
node --version
npm --version
# or
yarn --version
```

## Installation Steps

### Step 1: Install Dependencies

Choose one of the following methods:

**Using npm:**
```bash
npm install
```

**Using yarn:**
```bash
yarn install
```

This will install all required dependencies including:
- React 18.2.0
- React DOM 18.2.0
- TypeScript 4.9.5
- React Scripts 5.0.1
- Type definitions for React

### Step 2: Start Development Server

**Using npm:**
```bash
npm start
```

**Using yarn:**
```bash
yarn start
```

The application will automatically open in your browser at `http://localhost:3000`. If it doesn't open automatically, navigate to that URL manually.

The development server includes:
- Hot module replacement (changes reflect immediately)
- Error overlay in the browser
- Source maps for debugging

### Step 3: Build for Production

To create an optimized production build:

**Using npm:**
```bash
npm run build
```

**Using yarn:**
```bash
yarn build
```

This creates a `build` folder with optimized production files ready for deployment.

### Step 4: Run Tests (Optional)

**Using npm:**
```bash
npm test
```

**Using yarn:**
```bash
yarn test
```

## Usage Instructions

1. **Initialize Array**: Click the "Initialize" button to generate a new random array of 50 values
2. **Start Sorting**: Click the "Start Sorting" button to begin the visualization
3. **Watch & Listen**: 
   - Bars will change color during sorting (red for swaps, yellow for comparisons)
   - Audio tones will play based on the values being compared
   - The animation will complete automatically

### Controls

- **Initialize Button**: Generates a new random array and resets the visualizer
- **Start Sorting Button**: Begins the bubble sort animation (disabled during sorting)

## Component Architecture

### Bar Component (`src/components/Bar.tsx`)

A functional React component that represents a single bar in the visualization.

**Props:**
- `value: number` - The normalized value (0-1) determining bar height
- `isActive: boolean` - Whether this bar is currently being compared/swapped
- `stepType?: 'swap' | 'compare'` - The type of operation being performed

**Features:**
- Dynamic height based on value
- Color changes based on state (red for swap, yellow for compare)
- Smooth transitions
- Tooltip showing exact value

### Visualizer Component (`src/components/Visualizer.tsx`)

The main component that manages the sorting logic and animation.

**Props:**
- `arraySize?: number` - Number of elements in the array (default: 50)
- `animationSpeed?: number` - Delay between steps in milliseconds (default: 50)

**Features:**
- Array initialization with random values
- Bubble sort algorithm implementation
- Step-by-step animation
- Audio feedback using Web Audio API
- State management for sorting process
- Cleanup on unmount

## Technical Details

### Sorting Algorithm

The visualizer uses the **Bubble Sort** algorithm:
- Time Complexity: O(n²)
- Space Complexity: O(1)
- Stable sorting algorithm

### Audio System

- Uses Web Audio API for sound generation
- Frequency range: 200-700 Hz (based on array values)
- Each comparison plays two tones simultaneously
- Cross-browser compatible (includes webkit fallback)

### TypeScript Types

All components are fully typed with TypeScript interfaces:
- `BarProps` - Props for Bar component
- `SortStep` - Structure for sorting steps
- `VisualizerProps` - Props for Visualizer component

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

**Note**: Audio features require user interaction in some browsers due to autoplay policies.

## Troubleshooting

### Issue: Dependencies won't install

**Solution**: Clear npm/yarn cache and try again:
```bash
npm cache clean --force
# or
yarn cache clean
npm install
```

### Issue: Port 3000 is already in use

**Solution**: The app will automatically try the next available port, or you can specify one:
```bash
PORT=3001 npm start
```

### Issue: Audio not playing

**Solution**: 
- Ensure you've interacted with the page (clicked a button)
- Check browser console for audio context errors
- Some browsers require user interaction before playing audio

### Issue: TypeScript errors

**Solution**: Ensure all dependencies are installed:
```bash
npm install
# or
yarn install
```

## Development Notes

- The project uses Create React App with TypeScript template
- All components follow React functional component patterns with hooks
- CSS modules are used for component-specific styling
- The code follows React best practices and TypeScript strict mode

## Future Enhancements

Potential improvements for future versions:
- Additional sorting algorithms (Quick Sort, Merge Sort, etc.)
- Adjustable array size and animation speed controls
- Comparison counter and time elapsed display
- Multiple algorithm comparison mode
- Export/import array functionality

## License

This project is created for educational purposes as part of a university web programming course.

## Author

Student - University Web Programming Course

---

**Happy Sorting! 🎉**

