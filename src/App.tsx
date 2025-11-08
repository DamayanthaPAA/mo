import React from 'react';
import Visualizer from './components/Visualizer';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sorting Visualizer</h1>
        <p className="App-subtitle">
          Visualize the Bubble Sort algorithm with audio feedback
        </p>
      </header>
      <main className="App-main">
        <Visualizer arraySize={50} animationSpeed={50} />
      </main>
      <footer className="App-footer">
        <p>Click "Initialize" to generate a new array, then "Start Sorting" to visualize</p>
      </footer>
    </div>
  );
};

export default App;

