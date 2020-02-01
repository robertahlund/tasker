import React, { FC } from "react";
import "./RepeatedTasksTable.css";
import { RepeatedTask } from "../../types/types";
import RepeatedTaskTableHeader from "./RepeatedTaskTableHeader";
import RepeatedTaskTableRow from "./RepeatedTaskTableRow";
import LoadingIcon from "../icons/LoadingIcon";

interface RepeatedTasksTableProps {
  selectedRepeatedTaskId: string;
  toggleEditMenu: (taskId: string) => void;
  selectRepeatedTaskIdForEdit: (taskId: string) => void;
  repeatedTasks: RepeatedTask[];
  removeRepeatedTask: () => Promise<void>;
  repeatedTasksLoading: boolean;
}

const RepeatedTasksTable: FC<RepeatedTasksTableProps> = ({
  selectedRepeatedTaskId,
  toggleEditMenu,
  selectRepeatedTaskIdForEdit,
  repeatedTasks,
  removeRepeatedTask,
  repeatedTasksLoading
}) => {
  return (
    <div className="repeated-tasks-table-wrapper">
      <RepeatedTaskTableHeader />
      {repeatedTasksLoading ? (
        <div className="repeated-tasks-table-loading-wrapper">
          <LoadingIcon height="48px" width="48px" />
        </div>
      ) : (
        repeatedTasks.length > 0 ? (
          repeatedTasks.map((repeatedTask: RepeatedTask) => (
            <RepeatedTaskTableRow
              key={repeatedTask.id}
              selectedRepeatableTaskId={selectedRepeatedTaskId}
              toggleEditMenu={toggleEditMenu}
              selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
              repeatedTask={repeatedTask}
              removeRepeatedTask={removeRepeatedTask}
            />
          ))
        ) : (
          <div className="repeated-tasks-table-empty-wrapper">No results found.</div>
        )
      )}
    </div>
  );
};

export default RepeatedTasksTable;
