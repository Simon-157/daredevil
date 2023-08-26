import InputStyles from "./Input.module.css";
import { ChangeEvent } from "react";

type InputProps = {
  type?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  style?: { [key: string]: string };
  label?: string;
  name?: string;
  value?: string;
};

const Input = ({
  type = "text",
  onChange,
  style,
  placeholder,
  label,
  name,
  value,
}: InputProps) => {
  return (
    <div
      className={InputStyles.wrapper}
      style={{ flexFlow: `${type == "text" ? "column-reverse" : "row"}` }}
    >
      <input
        value={value}
        id={label}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        style={style}
        className={InputStyles.input}
      />
      {label && <label htmlFor={label}>{label}</label>}
    </div>
  );
};

export default Input;
