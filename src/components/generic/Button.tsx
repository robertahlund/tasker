import React, {FC, SyntheticEvent} from "react";
import "./Button.css";

interface ButtonProps {
  type: "button" | "submit";
  text: string;
  onSubmit:
    | ((event: SyntheticEvent) => Promise<void>)
    | ((event: SyntheticEvent) => void);
  loading?: boolean;
  disabled?: boolean;
}

const Button: FC<ButtonProps> = ({
                                   type,
                                   text,
                                   onSubmit,
                                   loading,
                                   disabled
                                 }) => (
  <button
    type={type}
    onClick={onSubmit}
    onSubmit={onSubmit}
    className="button"
    disabled={disabled}
  >
    {text}
  </button>
);

export default Button;
