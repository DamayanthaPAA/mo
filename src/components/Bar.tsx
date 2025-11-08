import React from 'react';
import './Bar.css';

export interface BarProps {
  value: number;
  isActive: boolean;
  stepType?: 'swap' | 'compare';
}

const Bar: React.FC<BarProps> = ({ value, isActive, stepType }) => {
  const height = `${value * 100}%`;
  
  const getBarColor = (): string => {
    if (isActive && stepType === 'swap') {
      return '#ff4444'; // Red for swap
    }
    if (isActive && stepType === 'compare') {
      return '#ffeb3b'; // Yellow for compare
    }
    return '#2c3e50'; // Default dark blue-gray
  };

  return (
    <div
      className="bar"
      style={{
        height,
        backgroundColor: getBarColor(),
      }}
      title={`Value: ${value.toFixed(3)}`}
    />
  );
};

export default Bar;

