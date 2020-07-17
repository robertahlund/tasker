import React, {FC} from 'react';
import './TaskItem.css';
import TaskHeading from "./TaskHeading";
import Task from "./Task";
import AddIcon from "../icons/AddIcon";

interface TaskItemProps {
  date: Date;
}

const TaskItem: FC<TaskItemProps> = ({ date }) => {
  return (
    <div className="task-item">
      <TaskHeading date={date}/>
      <AddIcon height="18px" width="18px"/>
      <div className="task-item-container">
        <Task/>
        <Task/>
        <Task/>
      </div>
    </div>
  );
};

export default TaskItem;