import React, {ChangeEvent, FC} from "react";
import "./InputField.css"

interface InputFieldProps {
  id: string;
  labelValue?: string;
  value: string;
  type: "text" | "number" | "file" | "password";
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  valid: boolean;
  validationMessage: string;
  icon?: React.ReactNode
}

const InputField: FC<InputFieldProps> = ({id, labelValue, value, type, onInputChange, name, valid, validationMessage, icon}) => {
  return (
    <div className="input-field-wrapper">
      {icon && icon}
      {labelValue && <label className="input-field-label" htmlFor={id}>{labelValue}</label>}
      <input className="input-field" id={name} type={type} value={value} onChange={onInputChange} name={name}/>
    </div>
  );
};

export default InputField;