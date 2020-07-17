import React, {FC} from 'react';
import './Task.css';

interface TaskProps {

}

const Task: FC<TaskProps> = () => {
  return (
    <div className="task">
      <span className="task-content">
        Testeroni for 50 min
      </span>
    </div>
  );
};

export default Task;