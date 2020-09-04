import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  createRef,
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
  markTaskAsCompleted: (date: Date) => Promise<void>;
  isRepeated: boolean;
  date: Date;
  isActive: boolean;
  isSyncing: boolean;
  syncRepeatedTask: (taskId: string, date: Date) => Promise<void>;
  isCreateNew?: boolean;
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
  isActive,
  isSyncing,
  syncRepeatedTask,
  isCreateNew,
}) => {
  if (isActive) {
    return (
      <div
        className={`task${isCompleted ? " task--completed" : ""} ${
          isCreateNew ? " margin-bottom-10" : ""
        }`}
      >
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
            shouldAutoFocus={true}
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
              {isRepeated && (
                <RepeatedIcon
                  height="16px"
                  width="16px"
                  isSyncing={isSyncing}
                  onClickFunction={
                    isRepeated && taskId.indexOf("repeated") > -1
                      ? () => syncRepeatedTask(taskId, date)
                      : () => "null"
                  }
                />
              )}
            </div>
          </>
        )}
        {taskId === taskItemMenuId && !isEdit && (
          <TaskEditMenu
            selectTaskIdForEdit={() => setTaskItemEdit({ taskId, date })}
            markTaskAsCompleted={markTaskAsCompleted}
            removeTask={deleteTask}
            isCompleted={isCompleted}
            date={date}
          />
        )}
      </div>
    );
  } else return null;
};

export default Task;
