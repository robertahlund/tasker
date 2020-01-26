import React, { FC } from "react";
import "./RepeatedTaskTableHeader.css";

interface RepeatedTaskTableHeaderProps {}

const RepeatedTaskTableHeader: FC<RepeatedTaskTableHeaderProps> = props => {
  return (
    <div className="repeated-tasks-table-header">
      <span>Content</span>
      <span>Schedule</span>
      <span>Created</span>
      <span></span>
    </div>
  );
};

export default RepeatedTaskTableHeader;
