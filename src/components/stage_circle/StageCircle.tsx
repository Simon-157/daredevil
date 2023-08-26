
import React from 'react';

//styles
import CircleStyles from './Stage.module.css'

interface StageCircleProps {
  stage: number;
}

const StageCircle: React.FC<StageCircleProps> = ({ stage }) => {
  return (
    <div className={CircleStyles.stageCircleContainer}>
      {[1, 2, 3].map((num) => (
        <div
          key={num}
          className={`${CircleStyles.stageCircle} ${num === stage ? `${CircleStyles.activeStageCircle}` : ''}`}
        >
          {num}
        </div>
      ))}
    </div>
  );
};

export default StageCircle;
