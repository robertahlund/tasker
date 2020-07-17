import React, { FC } from "react";
import "./TaskFilterItem.css";
import { TaskFilter } from "../../enums/enums";

interface TaskFilterItemProps {
  taskFilterItem: TaskFilter;
  onTaskFilterChange: (filter: TaskFilter) => void;
  isActive: boolean;
}

const TaskFilterItem: FC<TaskFilterItemProps> = ({
  isActive,
  onTaskFilterChange,
  taskFilterItem
}) => {
  return (
    <div className={`task-filter-item ${isActive ? "task-filter-item--active" : ""}`} onClick={() => onTaskFilterChange(taskFilterItem)}>
      <span>{taskFilterItem}</span>
    </div>
  );
};

export default TaskFilterItem;
