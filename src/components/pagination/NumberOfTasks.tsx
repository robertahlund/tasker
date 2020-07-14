import React, { FC } from "react";
import "./NumberOfTasks.css";

interface NumberOfTasksProps {
  firstTaskNumber: number;
  lastTaskNumber: number;
  totalNumberOfTasks: number;
}

const NumberOfTasks: FC<NumberOfTasksProps> = ({
  firstTaskNumber,
  lastTaskNumber,
  totalNumberOfTasks
}) => {
  return (
    <div className="number-of-tasks-container">
      <span className="number-of-tasks-content">
        {totalNumberOfTasks > 0 ? (
          <>
          Showing {firstTaskNumber}-{lastTaskNumber > totalNumberOfTasks ? totalNumberOfTasks : lastTaskNumber} tasks out of {totalNumberOfTasks}.
          </>
        ) : (
          <>
            Showing 0 tasks out of 0.
          </>
        )}
      </span>
    </div>
  );
};

export default NumberOfTasks;
