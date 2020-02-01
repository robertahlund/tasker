import React, { FC, SyntheticEvent } from "react";
import "./Button.css";
import LoadingIcon from "../icons/LoadingIcon";

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
    {loading ? <LoadingIcon height="16px" width="16px" /> : text }
  </button>
);

export default Button;
