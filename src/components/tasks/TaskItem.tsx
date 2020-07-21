import React, { FC, ChangeEvent, KeyboardEvent } from "react";
import "./TaskItem.css";
import TaskHeading from "./TaskHeading";
import Task from "./Task";
import AddIcon from "../icons/AddIcon";
import { Task as TaskType } from "../../types/types";

interface TaskItemProps {
  date: Date;
  isCreateNew: boolean;
  setCreateNew: () => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskContent: string;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  tasks: TaskType[];
}

const TaskItem: FC<TaskItemProps> = ({
  date,
  isCreateNew,
  setCreateNew,
  onInputChange,
  newTaskContent,
  onKeyPress,
  tasks,
}) => {
  return (
    <div className="task-item">
      <TaskHeading date={date} />
      <AddIcon height="18px" width="18px" onClickFunction={setCreateNew} />
      <div className="task-item-container">
        {isCreateNew && (
          <Task
            isEdit={isCreateNew}
            onInputChange={onInputChange}
            newTaskContent={newTaskContent}
            taskContent={newTaskContent}
            onKeyPress={onKeyPress}
          />
        )}
        {tasks.map((task: TaskType) => (
          <Task
            isEdit={false}
            onInputChange={onInputChange}
            newTaskContent={task.content}
            taskContent={task.content}
            onKeyPress={onKeyPress}
            key={task.id}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
