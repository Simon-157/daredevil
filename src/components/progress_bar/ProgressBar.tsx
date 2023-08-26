import React from 'react';
import BarStyles from './ProgressBar.module.css'

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  const progressStyle = {
    width: `${value}%`,
  };

  return (
    <div className={BarStyles.progress__bar}>
      <div className={BarStyles.progress} style={progressStyle}></div>
    </div>
  );
};

export default ProgressBar;
