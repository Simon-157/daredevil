import React from 'react';
import styles from './Box.module.css';

interface BoxProps {
  children?: React.ReactNode;
}

const ChallengeBox: React.FC<BoxProps> = ({ children }) => {
  return <div className={styles.rectangle}>{children}</div>;
};

export default ChallengeBox;
