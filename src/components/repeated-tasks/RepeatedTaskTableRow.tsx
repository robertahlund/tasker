import React, { FC } from "react";
import "./RepeatedTaskTableRow.css";
import SubMenuIcon from "../icons/SubMenuIcon";
import RepeatedTaskEditMenu from "./RepeatedTaskEditMenu";
import { RepeatedTask } from "../../types/types";

interface RepeatedTaskTableRowProps {
  selectedRepeatableTaskId: string;
  toggleEditMenu: (taskId: string) => void;
  selectRepeatedTaskIdForEdit: (taskId: string) => void;
  repeatedTask: RepeatedTask;
  removeRepeatedTask: () => Promise<void>;
}

const RepeatedTaskTableRow: FC<RepeatedTaskTableRowProps> = ({
  selectedRepeatableTaskId,
  toggleEditMenu,
  selectRepeatedTaskIdForEdit,
  repeatedTask,
  removeRepeatedTask
}) => {
  return (
    <div className="repeated-tasks-table-row">
      <span>{repeatedTask.content}</span>
      <span>{repeatedTask.schedule}</span>
      <span>{repeatedTask.createdAtFormatted}</span>
      <span onClick={() => toggleEditMenu(repeatedTask.id)}>
        <SubMenuIcon
          height="18px"
          width="18px"
        />
      </span>
      {selectedRepeatableTaskId === repeatedTask.id && (
        <RepeatedTaskEditMenu
          selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
          taskId={repeatedTask.id}
          removeRepeatedTask={removeRepeatedTask}
        />
      )}
    </div>
  );
};

export default RepeatedTaskTableRow;
