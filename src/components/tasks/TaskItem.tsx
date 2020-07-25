import React, {
  FC,
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
} from "react";
import "./TaskItem.css";
import TaskHeading from "./TaskHeading";
import Task from "./Task";
import AddIcon from "../icons/AddIcon";
import { Task as TaskType, TaskItemEdit } from "../../types/types";

interface TaskItemProps {
  date: Date;
  isCreateNew: boolean;
  setCreateNew: () => void;
  saveTask: (event?: KeyboardEvent<HTMLInputElement>) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  newTaskContent: string;
  onKeyPress: (event: KeyboardEvent<HTMLInputElement>) => void;
  tasks: TaskType[];
  setTaskItemMenuId: Dispatch<SetStateAction<string | null>>;
  taskItemMenuId: string | null;
  setTaskItemEdit: Dispatch<SetStateAction<TaskItemEdit>>;
  taskItemEdit: TaskItemEdit;
  deleteTask: () => Promise<void>;
  markTaskAsCompleted: () => Promise<void>;
}

const TaskItem: FC<TaskItemProps> = ({
  date,
  isCreateNew,
  setCreateNew,
  onInputChange,
  newTaskContent,
  onKeyPress,
  tasks,
  saveTask,
  setTaskItemMenuId,
  taskItemMenuId,
  setTaskItemEdit,
  deleteTask,
  taskItemEdit,
  markTaskAsCompleted,
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
            saveTask={saveTask}
            setTaskItemMenuId={setTaskItemMenuId}
            taskItemMenuId={taskItemMenuId}
            taskId=""
            setTaskItemEdit={setTaskItemEdit}
            deleteTask={deleteTask}
            isCompleted={false}
            markTaskAsCompleted={markTaskAsCompleted}
            isRepeated={false}
            date={date}
          />
        )}
        {tasks.map((task: TaskType) => (
          <Task
            isEdit={taskItemEdit.taskId === task.id}
            onInputChange={onInputChange}
            newTaskContent={newTaskContent}
            taskContent={task.content}
            onKeyPress={onKeyPress}
            saveTask={saveTask}
            key={task.id}
            setTaskItemMenuId={setTaskItemMenuId}
            taskItemMenuId={taskItemMenuId}
            taskId={task.id}
            setTaskItemEdit={setTaskItemEdit}
            deleteTask={deleteTask}
            isCompleted={task.isCompleted}
            markTaskAsCompleted={markTaskAsCompleted}
            isRepeated={task.isRepeated}
            date={date}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskItem;
