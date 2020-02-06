import React, { FC } from "react";
import "./RepeatedTaskEditMenu.css";
import { motion } from "framer-motion";

interface RepeatedTaskEditMenuProps {
  selectRepeatedTaskIdForEdit: (taskId: string) => void;
  taskId: string;
  removeRepeatedTask: () => Promise<void>;
}

const RepeatedTaskEditMenu: FC<RepeatedTaskEditMenuProps> = ({
  selectRepeatedTaskIdForEdit,
  taskId,
  removeRepeatedTask
}) => {
  return (
    <motion.div
      className="submenu-wrapper"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="submenu-item"
        onClick={() => selectRepeatedTaskIdForEdit(taskId)}
      >
        Edit repeated task
      </div>
      <div
        className="submenu-item submenu-item__delete"
        onClick={removeRepeatedTask}
      >
        Delete repeated task
      </div>
    </motion.div>
  );
};

export default RepeatedTaskEditMenu;
