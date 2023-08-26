// libraries
import { ReactNode, MouseEvent } from "react";

// styles
import ButtonStyles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  type: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  style?: { [key: string]: string };
};

const Button = ({ children, type = "solid", style, onClick }: ButtonProps) => {
  return (
    <button
      className={`${ButtonStyles.button} ${ButtonStyles[type]}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;
