import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import "./Task.css";
import InputField from "../generic/InputField";

interface TaskProps {
  isEdit: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskContent: string;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  taskContent: string;
}

const Task: FC<TaskProps> = ({
  isEdit,
  onInputChange,
  newTaskContent,
  onKeyPress,
  taskContent,
}) => {
  return (
    <div className="task">
      {isEdit ? (
        <InputField
          id="task-edit"
          name="task-edit"
          onInputChange={onInputChange}
          onBlur={() => null}
          type="text"
          valid={true}
          validationMessage=""
          value={newTaskContent}
          onKeyPress={onKeyPress}
        />
      ) : (
        <span className="task-content">{taskContent}</span>
      )}
    </div>
  );
};

export default Task;
