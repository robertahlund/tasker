import React, {FC, SyntheticEvent} from "react";
import "./Button.css";

interface ButtonProps {
    type: 'button' | 'submit';
    text: string;
    onSubmit: ((event: SyntheticEvent) => Promise<void>) | ((event: SyntheticEvent) => void);
    loading?: boolean;
}

const Button: FC<ButtonProps> = ({ type, text, onSubmit, loading}) => (
    <button type={type} onClick={onSubmit} onSubmit={onSubmit} className="button">
        {text}
    </button>
);

export default Button;