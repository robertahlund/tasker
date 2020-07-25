import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import "./Task.css";
import InputField from "../generic/InputField";
import SubMenuIcon from "../icons/SubMenuIcon";
import RepeatedIcon from "../icons/RepeatedIcon";
import TaskEditMenu from "./TaskEditMenu";
import { TaskItemEdit } from "../../types/types";

interface TaskProps {
  isEdit: boolean;
  isCompleted: boolean;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskContent: string;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  taskContent: string;
  saveTask: (event?: KeyboardEvent<HTMLInputElement>) => void;
  setTaskItemMenuId: Dispatch<SetStateAction<string | null>>;
  taskItemMenuId: string | null;
  taskId: string;
  setTaskItemEdit: Dispatch<SetStateAction<TaskItemEdit>>;
  deleteTask: () => Promise<void>;
  markTaskAsCompleted: () => Promise<void>;
  isRepeated: boolean;
  date: Date;
}

const Task: FC<TaskProps> = ({
  isEdit,
  isCompleted,
  onInputChange,
  newTaskContent,
  onKeyPress,
  taskContent,
  saveTask,
  setTaskItemMenuId,
  taskItemMenuId,
  taskId,
  setTaskItemEdit,
  deleteTask,
  markTaskAsCompleted,
  isRepeated,
  date,
}) => {
  return (
    <div className={`task${isCompleted ? " task--completed" : ""}`}>
      {isEdit ? (
        <InputField
          id="task-edit"
          name="task-edit"
          onInputChange={onInputChange}
          onBlur={() => saveTask(undefined)}
          type="text"
          valid={true}
          validationMessage=""
          value={newTaskContent}
          onKeyPress={onKeyPress}
        />
      ) : (
        <>
          <span className="task-content__text">{taskContent}</span>
          <div className="task-content__icon-container">
            <SubMenuIcon
              height="16px"
              width="16px"
              onClickFunction={() =>
                taskId === taskItemMenuId
                  ? setTaskItemMenuId(null)
                  : setTaskItemMenuId(taskId)
              }
            />
            {isRepeated && <RepeatedIcon height="16px" width="16px" />}
          </div>
        </>
      )}
      {taskId === taskItemMenuId && !isEdit && (
        <TaskEditMenu
          selectTaskIdForEdit={() => setTaskItemEdit({ taskId, date })}
          markTaskAsCompleted={markTaskAsCompleted}
          removeTask={deleteTask}
          isCompleted={isCompleted}
        />
      )}
    </div>
  );
};

export default Task;
