import React, { FC } from "react";
import "./TaskHeading.css";
import { format } from "date-fns";
import { dateDayFormat, dayFormat } from "../../constants/constants";

interface TaskHeadingProps {
  date: Date;
}

const TaskHeading: FC<TaskHeadingProps> = ({ date }) => {
  return (
    <div className="task-item-heading">
      <div className="task-item-heading__medium">{format(date, dayFormat)}</div>
      <div className="task-item-heading__small">
        {format(date, dateDayFormat)}
      </div>
    </div>
  );
};

export default TaskHeading;
