import React, {
  ChangeEvent,
  FC, MutableRefObject,
  SyntheticEvent,
  useContext,
  useEffect, useRef,
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
import Button from "../generic/Button";
import ModalPortal from "../generic/ModalPortal";
import { AnimatePresence } from "framer-motion";
import RepeatedTaskIllustration from "../illustrations/RepeatedTaskIllustration";
import Pagination from "../pagination/Pagination";

interface RepeatedTasksProps {}

const RepeatedTasks: FC<RepeatedTasksProps> = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedRepeatedTaskId, setSelectedRepeatedTaskId] = useState<string>(
    ""
  );
  const [selectedRepeatedTaskIdEdit, setSelectedRepeatedTaskIdEdit] = useState<
    string
  >("");
  const [repeatedTasks, setRepeatedTasks] = useState<RepeatedTask[]>([]);
  const [originalRepeatedTasks, setOriginalRepeatedTasks] = useState<
    RepeatedTask[]
  >([]);
  const [repeatedTasksLoading, setRepeatedTasksLoading] = useState<boolean>(
    true
  );
  const [displayModal, setDisplayModal] = useState<boolean>(false);
  const [shouldLoadInitialData, setShouldLoadInitialData] = useState<boolean>(
    true
  );
  const [tasksPerPage, setTasksPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstTaskNumber, setFirstTaskNumber] = useState<number>(1);
  const [lastTaskNumber, setLastTaskNumber] = useState<number>(
    currentPage * tasksPerPage
  );

  const { uid }: { uid: string } = useContext<Auth>(AuthenticationContext);
  
  const searchValueRef: MutableRefObject<string | undefined> = useRef();

  useEffect(() => {
    document.title = "Repeated Tasks";
  }, []);

  useEffect(() => {
    if (shouldLoadInitialData) {
      console.log("getting tasks ofc");
      (async (): Promise<void> => {
        setRepeatedTasksLoading(true);
        const repeatedTasks: RepeatedTask[] = await getAllRepeatedTasksByUserId(
          uid
        );
        setRepeatedTasks(
          [...repeatedTasks].filter(
            (repeatedTask: RepeatedTask) =>
              repeatedTask.content.toLowerCase().indexOf(searchValue) > -1
          )
        );
        setOriginalRepeatedTasks(repeatedTasks);
        setRepeatedTasksLoading(false);
        setShouldLoadInitialData(false);
      })();
    }
  }, [searchValue, uid, shouldLoadInitialData]);

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
    toggleModal(undefined, false, true);
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    searchValueRef.current = value.toLowerCase();
    setSearchValue(value.toLowerCase());
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
      setOriginalRepeatedTasks(
        [...originalRepeatedTasks].filter(
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

  /* TODO Refactor handlePagination into the useEffect hook, which should be shared between searchValue and originalRepeatedTasks */

  useEffect(() => {
    if (searchValue === searchValueRef.current) {
      handlePagination(1);
    } else {
      handlePagination(currentPage);
    }
  }, [searchValue, originalRepeatedTasks])

  const getFilteredTasks = (): RepeatedTask[] => {
    return [...originalRepeatedTasks].filter(
      (repeatedTask: RepeatedTask) =>
        repeatedTask.content.toLowerCase().indexOf(searchValue) > -1
    )
  };

  const handlePagination = (selectedPage: number): void => {
    setCurrentPage(selectedPage);
    setFirstTaskNumber(selectedPage * tasksPerPage - tasksPerPage + 1);

    if (searchValue === "") {
      if (selectedPage * tasksPerPage > originalRepeatedTasks.length) {
        setLastTaskNumber(originalRepeatedTasks.length);
      } else {
        setLastTaskNumber(selectedPage * tasksPerPage);
      }
    } else {
      if (selectedPage * tasksPerPage > getFilteredTasks().length) {
        setLastTaskNumber(getFilteredTasks().length);
      } else {
        setLastTaskNumber(selectedPage * tasksPerPage);
      }
    }

    const newTaskList: RepeatedTask[] = getFilteredTasks()
      .slice(
        selectedPage * tasksPerPage - tasksPerPage,
        selectedPage * tasksPerPage
      );
    setRepeatedTasks(newTaskList);
  };

  const toggleModal = (
    event?: SyntheticEvent,
    shouldClose?: boolean,
    shouldOpen?: boolean
  ): void => {
    if (shouldClose) {
      setSelectedRepeatedTaskId("");
      setSelectedRepeatedTaskIdEdit("");
      setDisplayModal(false);
    }
    if (shouldOpen) {
      setDisplayModal(true);
    }
    if (event) {
      const { target, currentTarget } = event;
      if (target === currentTarget) {
        if (displayModal) {
          setSelectedRepeatedTaskId("");
          setSelectedRepeatedTaskIdEdit("");
        }
        setDisplayModal(!displayModal);
      }
    }
  };

  return (
    <main className="main-section repeated-tasks">
      <div className="repeated-task-wrapper">
        <SectionTitle title="Repeated Tasks" />
        <div className="repeated-tasks-search-container">
          <InputField
            id="search"
            value={searchValue}
            type="text"
            onInputChange={handleSearchChange}
            name="search"
            valid={true}
            validationMessage=""
            icon={<SearchIcon height="18px" width="18px" />}
          />
          <Button
            type="button"
            text="Create"
            onSubmit={(event: SyntheticEvent) => toggleModal(event)}
          />
        </div>
        <section className="repeated-tasks-wrapper">
          <section className="repeated-tasks-table">
            <RepeatedTasksTable
              selectedRepeatedTaskId={selectedRepeatedTaskId}
              toggleEditMenu={toggleEditMenu}
              selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
              repeatedTasks={repeatedTasks}
              removeRepeatedTask={removeRepeatedTask}
              repeatedTasksLoading={repeatedTasksLoading}
            />
            {!repeatedTasksLoading && (
              <Pagination
                currentPage={currentPage}
                firstTaskNumber={firstTaskNumber}
                lastTaskNumber={lastTaskNumber}
                tasksPerPage={tasksPerPage}
                totalNumberOfTasks={
                  searchValue === ""
                    ? originalRepeatedTasks.length
                    : getFilteredTasks().length
                }
                totalNumberOfPages={Math.ceil(
                  searchValue === ""
                    ? originalRepeatedTasks.length / tasksPerPage
                    : getFilteredTasks().length / tasksPerPage
                )}
                handlePagination={handlePagination}
              />
            )}
          </section>
          <AnimatePresence>
            {displayModal && (
              <ModalPortal toggleModal={toggleModal}>
                <RepeatedTaskEdit
                  repeatedTaskId={selectedRepeatedTaskIdEdit}
                  selectRepeatedTaskIdForEdit={selectRepeatedTaskIdForEdit}
                  refreshDataList={() => setShouldLoadInitialData(true)}
                  toggleModal={toggleModal}
                />
              </ModalPortal>
            )}
          </AnimatePresence>
        </section>
      </div>
      <div className="repeated-task-illustration-container">
        <RepeatedTaskIllustration height="100%" width="100%" />
      </div>
    </main>
  );
};

export default RepeatedTasks;
