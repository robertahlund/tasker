import React, { FC } from "react";
import "./TaskFilter.css";
import { taskFilters } from "../../constants/constants";
import { TaskFilter as TaskFilterEnum } from "../../enums/enums";
import TaskFilterItem from "./TaskFilterItem";

interface TaskFilterProps {
  selectedTaskItem: TaskFilterEnum;
  onTaskFilterChange: (filter: TaskFilterEnum) => void;
}

const TaskFilter: FC<TaskFilterProps> = ({
  selectedTaskItem,
  onTaskFilterChange
}) => {
  return (
    <div className="tasks-filter">
      {taskFilters.types.map((taskFilter: TaskFilterEnum) => {
        return (
          <TaskFilterItem
            isActive={selectedTaskItem === taskFilter}
            onTaskFilterChange={onTaskFilterChange}
            taskFilterItem={taskFilter}
            key={taskFilter}
          />
        );
      })}
    </div>
  );
};

export default TaskFilter;
