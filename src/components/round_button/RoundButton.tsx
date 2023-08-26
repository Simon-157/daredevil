import React, { ReactNode } from 'react';
import ButtonStyles from './RoundButton.module.css'

interface RoundButtonProps {
  onClick: () => void;
  children:ReactNode
}

const RoundButton: React.FC<RoundButtonProps> = ({ onClick, children }) => {
  return (
    <button className={ButtonStyles.round__button} onClick={onClick}>
      <span className={ButtonStyles.plus__icon}>{children}</span>
    </button>
  );
};

export default RoundButton;
