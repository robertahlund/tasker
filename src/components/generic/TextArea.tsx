import React, { ChangeEvent, FC } from "react";
import "./TextArea.css";

interface TextAreaProps {
  id: string;
  labelValue?: string;
  value: string;
  onInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  valid: boolean;
  validationMessage: string;
  rows: number;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  labelValue,
  value,
  onInputChange,
  name,
  valid,
  validationMessage,
  rows
}) => {
  return (
    <div className="textarea-wrapper">
      {labelValue && (
        <label className="textarea-label" htmlFor={id}>
          {labelValue}
        </label>
      )}
      <textarea
        className="textarea"
        id={name}
        value={value}
        onChange={onInputChange}
        name={name}
        rows={rows}
      />
    </div>
  );
};

export default TextArea;
