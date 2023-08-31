import React, {MouseEvent} from 'react';
import styles from './Box.module.css';

interface BoxProps {
  children?: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
}

const ChallengeBox: React.FC<BoxProps> = ({ children, onClick }) => {
  return <div title='add dare' className={styles.rectangle} onClick={onClick}>{children}</div>;
};

export default ChallengeBox;
