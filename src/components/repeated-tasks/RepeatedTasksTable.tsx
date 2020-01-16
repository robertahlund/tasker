import React, {FC, useState} from "react";
import "./RepeatedTasksTable.css";
import SubMenuIcon from "../icons/SubMenuIcon";
import RepeatedTaskEditMenu from "./RepeatedTaskEditMenu";

interface RepeatedTasksTableProps {

}

const RepeatedTasksTable: FC<RepeatedTasksTableProps> = (props) => {
  const [selectedRepeatableTaskId, setSelectedRepeatableTaskId] = useState<string>("");

  const toggleEditMenu = (taskId: string): void => {
    setSelectedRepeatableTaskId(taskId);
  };

  return (
    <div className="repeated-tasks-table-wrapper">
      <div className="repeated-tasks-table-header">
        <span>Content</span>
        <span>Schedule</span>
        <span>Created</span>
        <span></span>
      </div>
      <div className="repeated-tasks-table-row">
        <span>Lorem Ipsum etc.</span>
        <span>Every day</span>
        <span>27 Aug, 2020</span>
        <span><SubMenuIcon height="24px" width="24px"/></span>

      </div>
      <div className="repeated-tasks-table-row">
        <span>Lorem Ipsum etc.</span>
        <span>Every day</span>
        <span>27 Aug, 2020</span>
        <span><SubMenuIcon height="24px" width="24px"/></span>
        <RepeatedTaskEditMenu/>
      </div>
      <div className="repeated-tasks-table-row">
        <span>Lorem Ipsum etc.</span>
        <span>Every day</span>
        <span>27 Aug, 2020</span>
        <span><SubMenuIcon height="24px" width="24px"/></span>
      </div>
      <div className="repeated-tasks-table-row">
        <span>Lorem Ipsum etc.</span>
        <span>Every day</span>
        <span>27 Aug, 2020</span>
        <span><SubMenuIcon height="24px" width="24px"/></span>
      </div>
    </div>
  );
};

export default RepeatedTasksTable;