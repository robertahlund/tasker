import React, { FC } from "react";
import "./RepeatedTasksTable.css";
import { RepeatedTask } from "../../types/types";
import RepeatedTaskTableHeader from "./RepeatedTaskTableHeader";
import RepeatedTaskTableRow from "./RepeatedTaskTableRow";

interface RepeatedTasksTableProps {
  selectedRepeatedTaskId: string;
  toggleEditMenu: (taskId: string) => void;
  selectRepeatedTaskIdForEdit: (taskId: string) => void;
  repeatedTasks: RepeatedTask[];
  removeRepeatedTask: () => Promise<void>;
}

const RepeatedTasksTable: FC<RepeatedTasksTableProps> = ({
  selectedRepeatedTaskId,
  toggleEditMenu,
  selectRepeatedTaskIdForEdit,
  repeatedTasks,
  removeRepeatedTask
}) => {
  return (
    <div className="repeated-tasks-table-wrapper">
      <RepeatedTaskTableHeader />
      {repeatedTasks.map((repeatedTask: RepeatedTask) => (
        <RepeatedTaskTableRow
          key={repeatedTask.id}
          selectedRepeatableTaskId={selectedRepeatedTaskId}
          toggleEditMenu={toggleEditMenu}
          selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
          repeatedTask={repeatedTask}
          removeRepeatedTask={removeRepeatedTask}
        />
      ))}
    </div>
  );
};

export default RepeatedTasksTable;
