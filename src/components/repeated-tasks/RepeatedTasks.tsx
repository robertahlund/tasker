import React, { ChangeEvent, FC, useEffect, useState } from "react";
import "./RepeatedTasks.css";
import SectionTitle from "../generic/SectionTitle";
import InputField from "../generic/InputField";
import SearchIcon from "../icons/SearchIcon";
import RepeatedTasksTable from "./RepeatedTasksTable";
import RepeatedTaskEdit from "./RepeatedTaskEdit";

interface RepeatedTasksProps {}

const RepeatedTasks: FC<RepeatedTasksProps> = props => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRepeatableTaskId, setSelectedRepeatableTaskId] = useState<
    string
  >("");
  const [selectedRepeatedTaskIdEdit, setSelectedRepeatedTaskIdEdit] = useState<
    string
  >("");

  useEffect(() => {
    document.title = "Repeated Tasks";
  }, []);

  const toggleEditMenu = (taskId: string): void => {
    setSelectedRepeatableTaskId(taskId);
  };

  const selectRepeatedTaskIdForEdit = (taskId: string): void => {
    setSelectedRepeatedTaskIdEdit(taskId);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  return (
    <main className="main-section repeated-tasks">
      <SectionTitle title="Repeated Tasks" />
      <InputField
        id="search"
        value={searchValue}
        type="text"
        onInputChange={handleSearchChange}
        name="search"
        valid={true}
        validationMessage=""
        icon={<SearchIcon height="24px" width="24px" />}
      />
      <section className="repeated-tasks-wrapper">
        <section className="repeated-tasks-table">
          <RepeatedTasksTable
            selectedRepeatableTaskId={selectedRepeatableTaskId}
            toggleEditMenu={toggleEditMenu}
            selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
          />
        </section>
        <section className="repeated-tasks-edit">
          <RepeatedTaskEdit repeatedTaskId={selectedRepeatedTaskIdEdit} />
        </section>
      </section>
    </main>
  );
};

export default RepeatedTasks;
