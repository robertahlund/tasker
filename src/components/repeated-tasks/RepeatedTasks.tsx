import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import "./RepeatedTasks.css";
import SectionTitle from "../generic/SectionTitle";
import InputField from "../generic/InputField";
import SearchIcon from "../icons/SearchIcon";
import RepeatedTasksTable from "./RepeatedTasksTable";
import RepeatedTaskEdit from "./RepeatedTaskEdit";
import {
  deleteRepeatedTask,
  getAllRepeatedTasksByUserId
} from "../../api/repeatedTasks";
import { Auth, RepeatedTask } from "../../types/types";
import { AuthenticationContext } from "../../context/authContext";

interface RepeatedTasksProps {}

const RepeatedTasks: FC<RepeatedTasksProps> = props => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRepeatedTaskId, setSelectedRepeatedTaskId] = useState<string>(
    ""
  );
  const [selectedRepeatedTaskIdEdit, setSelectedRepeatedTaskIdEdit] = useState<
    string
  >("");
  const [repeatedTasks, setRepeatedTasks] = useState<RepeatedTask[]>([]);

  const { uid }: { uid: string } = useContext<Auth>(AuthenticationContext);

  useEffect(() => {
    document.title = "Repeated Tasks";
  }, []);

  useEffect(() => {
    getRepeatedTasks();
  }, []);

  const getRepeatedTasks = async (): Promise<void> => {
    setRepeatedTasks(await getAllRepeatedTasksByUserId(uid));
  };

  const toggleEditMenu = (taskId: string): void => {
    if (taskId === selectedRepeatedTaskId) {
      setSelectedRepeatedTaskId("");
    } else {
      setSelectedRepeatedTaskId(taskId);
    }
  };

  const selectRepeatedTaskIdForEdit = (taskId: string): void => {
    setSelectedRepeatedTaskIdEdit(taskId);
    setSelectedRepeatedTaskId("");
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };

  const removeRepeatedTask = async (): Promise<void> => {
    try {
      await deleteRepeatedTask(selectedRepeatedTaskId);
      setRepeatedTasks(
        [...repeatedTasks].filter(
          (repeatedTask: RepeatedTask) =>
            repeatedTask.id !== selectedRepeatedTaskId
        )
      );
      setSelectedRepeatedTaskId("");
      setSelectedRepeatedTaskIdEdit("");
    } catch (error) {
      console.log(error);
    }
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
            selectedRepeatedTaskId={selectedRepeatedTaskId}
            toggleEditMenu={toggleEditMenu}
            selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
            repeatedTasks={repeatedTasks}
            removeRepeatedTask={removeRepeatedTask}
          />
        </section>
        <section className="repeated-tasks-edit">
          <RepeatedTaskEdit
            repeatedTaskId={selectedRepeatedTaskIdEdit}
            selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
            getRepeatedTasks={getRepeatedTasks}
          />
        </section>
      </section>
    </main>
  );
};

export default RepeatedTasks;
