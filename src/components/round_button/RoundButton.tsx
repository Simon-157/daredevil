import React, { ReactNode } from 'react';
import ButtonStyles from './RoundButton.module.css'

interface RoundButtonProps {
  onClick: () => void;
  children:ReactNode;
  style?: { [key: string]: string };
}

const RoundButton: React.FC<RoundButtonProps> = ({ onClick, style, children }) => {
  return (
    <button    style={style} className={ButtonStyles.round__button} onClick={onClick}>
      <span className={ButtonStyles.plus__icon}>{children}</span>
    </button>
  );
};

export default RoundButton;
