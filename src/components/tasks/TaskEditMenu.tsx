import React, { FC } from "react";
import "./TaskEditMenu.css";
import { motion } from "framer-motion";

interface TaskEditMenuProps {
  selectTaskIdForEdit: () => void;
  removeTask: () => Promise<void>;
  markTaskAsCompleted: (date: Date) => Promise<void>;
  isCompleted: boolean;
  date: Date;
}

const TaskEditMenu: FC<TaskEditMenuProps> = ({
  selectTaskIdForEdit,
  removeTask,
  markTaskAsCompleted,
  isCompleted,
  date,
}) => {
  return (
    <motion.div
      className={`submenu-wrapper${
        isCompleted ? " submenu-wrapper-offset" : ""
      }`}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isCompleted && (
        <div className="submenu-item" onClick={selectTaskIdForEdit}>
          Edit task
        </div>
      )}
      <div className="submenu-item" onClick={() => markTaskAsCompleted(date)}>
        {isCompleted ? "Mark as incomplete" : "Mark as completed"}
      </div>
      <div className="submenu-item submenu-item__delete" onClick={removeTask}>
        Delete task
      </div>
    </motion.div>
  );
};

export default TaskEditMenu;
