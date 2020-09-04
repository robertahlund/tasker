import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  RefObject,
  createRef,
  useEffect,
} from "react";
import "./InputField.css";

interface InputFieldProps {
  id: string;
  labelValue?: string;
  value: string;
  type: "text" | "number" | "file" | "password";
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  valid: boolean;
  validationMessage: string;
  icon?: React.ReactNode;
  onBlur?: () => void;
  onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  id,
  labelValue,
  value,
  type,
  onInputChange,
  name,
  valid,
  validationMessage,
  icon,
  onBlur,
  onKeyPress,
}) => {
  const inputRef: RefObject<HTMLInputElement> | null | undefined = createRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  return (
    <div className="input-field-wrapper">
      {icon && icon}
      {labelValue && (
        <label className="input-field-label" htmlFor={id}>
          {labelValue}
        </label>
      )}
      <input
        className="input-field"
        id={name}
        type={type}
        value={value}
        onChange={onInputChange}
        name={name}
        onBlur={onBlur}
        onKeyDown={onKeyPress}
        ref={inputRef}
      />
    </div>
  );
};

export default InputField;
