import React, { useState, useRef, useCallback, useEffect } from 'react';
import Bar from './Bar';
import './Visualizer.css';

export interface SortStep {
  indices: [number, number];
  type: 'swap' | 'compare';
}

interface VisualizerProps {
  arraySize?: number;
  animationSpeed?: number;
}

const Visualizer: React.FC<VisualizerProps> = ({ 
  arraySize = 50, 
  animationSpeed = 50 
}) => {
  const [array, setArray] = useState<number[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [currentStep, setCurrentStep] = useState<SortStep | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize audio context
  const getAudioContext = useCallback((): AudioContext | null => {
    if (audioCtxRef.current === null) {
      const AudioContextClass = 
        window.AudioContext || 
        (window as any).webkitAudioContext;
      
      if (AudioContextClass) {
        try {
          audioCtxRef.current = new AudioContextClass();
        } catch (error) {
          console.warn('Audio context creation failed:', error);
          return null;
        }
      }
    }
    return audioCtxRef.current;
  }, []);

  // Play a note based on array value
  const playNote = useCallback((freq: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const duration = 0.1;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.frequency.value = freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.01, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + duration);
  }, [getAudioContext]);

  // Initialize array with random values
  const initializeArray = useCallback(() => {
    const newArray: number[] = [];
    for (let i = 0; i < arraySize; i++) {
      newArray.push(Math.random());
    }
    setArray(newArray);
    setCurrentStep(null);
    setIsSorting(false);
    
    // Cancel any ongoing animation
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, [arraySize]);

  // Bubble sort algorithm that returns steps
  const bubbleSort = useCallback((arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const arrCopy = [...arr];
    let swapped: boolean;

    do {
      swapped = false;
      for (let i = 1; i < arrCopy.length; i++) {
        if (arrCopy[i - 1] > arrCopy[i]) {
          swapped = true;
          steps.push({ indices: [i - 1, i], type: 'swap' });
          [arrCopy[i - 1], arrCopy[i]] = [arrCopy[i], arrCopy[i - 1]];
        }
      }
    } while (swapped);

    return steps;
  }, []);

  // Animate sorting steps
  const animateSorting = useCallback((steps: SortStep[], currentArray: number[]) => {
    if (steps.length === 0) {
      setCurrentStep(null);
      setIsSorting(false);
      return;
    }

    const step = steps[0];
    const remainingSteps = steps.slice(1);
    const [i, j] = step.indices;

    // Play audio notes before updating
    playNote(200 + currentArray[i] * 500);
    playNote(200 + currentArray[j] * 500);

    // Update array if it's a swap
    let newArray = [...currentArray];
    if (step.type === 'swap') {
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    setArray(newArray);
    setCurrentStep(step);

    // Schedule next step
    const timeoutId = setTimeout(() => {
      animateSorting(remainingSteps, newArray);
    }, animationSpeed);

    // Store timeout ID for cleanup
    animationRef.current = timeoutId as any;
  }, [animationSpeed, playNote]);

  // Start sorting animation
  const startSorting = useCallback(() => {
    if (isSorting || array.length === 0) return;

    setIsSorting(true);
    const steps = bubbleSort(array);
    animateSorting(steps, array);
  }, [array, isSorting, bubbleSort, animateSorting]);

  // Initialize on mount
  useEffect(() => {
    initializeArray();
  }, [initializeArray]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        clearTimeout(animationRef.current as any);
      }
    };
  }, []);

  return (
    <div className="visualizer-container">
      <div className="visualizer-bars">
        {array.map((value, index) => (
          <Bar
            key={index}
            value={value}
            isActive={
              currentStep !== null && currentStep.indices.includes(index)
            }
            stepType={currentStep?.type}
          />
        ))}
      </div>
      <div className="visualizer-controls">
        <button
          onClick={initializeArray}
          disabled={isSorting}
          className="control-button"
        >
          Initialize
        </button>
        <button
          onClick={startSorting}
          disabled={isSorting || array.length === 0}
          className="control-button"
        >
          {isSorting ? 'Sorting...' : 'Start Sorting'}
        </button>
      </div>
    </div>
  );
};

export default Visualizer;

