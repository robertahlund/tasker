import React, {
  FC,
  ReactNode,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useContext,
  useCallback,
} from "react";
import "./Tasks.css";
import SectionTitle from "../generic/SectionTitle";
import {
  addDays,
  addMonths,
  addWeeks,
  format,
  getDaysInMonth,
  startOfMonth,
  startOfWeek,
  isSameDay,
  startOfDay,
  endOfMonth,
} from "date-fns";
import {
  monthFormat,
  weekFormat,
  yearFormat,
  defaultTask,
  taskDateFormat,
} from "../../constants/constants";
import DateSelector from "../generic/DateSelector";
import TaskFilter from "./TaskFilter";
import { TaskFilter as TaskFilterEnum } from "../../enums/enums";
import TaskItem from "./TaskItem";
import { Task, Auth } from "../../types/types";
import { AuthenticationContext } from "../../context/authContext";
import {
  createOrUpdateTask,
  getAllRepeatedTasksByDateRange,
} from "../../api/tasks";
import { endOfWeek } from "date-fns/esm";

interface TasksProps {}

const Tasks: FC<TasksProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfMonth(new Date())
  );
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TaskFilterEnum>(
    TaskFilterEnum.Month
  );
  const [createNewIndex, setCreateNewIndex] = useState<number | null>(null);
  const [taskEdit, setTaskEdit] = useState<Task>(defaultTask);
  const [tasks, setTasks] = useState<Task[]>([]);

  const { uid }: { uid: string } = useContext<Auth>(AuthenticationContext);

  useEffect(() => {
    document.title = "Tasks";
  }, []);

  const getTasks = useCallback(
    async (startDate: Date, endDate: Date): Promise<void> => {
      setTasks(await getAllRepeatedTasksByDateRange(uid, startDate, endDate));
    },
    [uid]
  );

  useEffect(() => {
    console.log("getting data");
    if (selectedTaskFilter === TaskFilterEnum.Month) {
      getTasks(startOfDay(selectedDate), endOfMonth(selectedDate));
    } else {
      getTasks(
        startOfWeek(selectedDate, { weekStartsOn: 1 }),
        endOfWeek(selectedDate, { weekStartsOn: 1 })
      );
    }
  }, [selectedDate, getTasks, selectedTaskFilter]);

  const incrementMonth = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfMonth(addMonths(previousSelectedDate, 1))
    );
  };

  const decrementMonth = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfMonth(addMonths(previousSelectedDate, -1))
    );
  };

  const incrementWeek = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfWeek(addWeeks(previousSelectedDate, 1), { weekStartsOn: 1 })
    );
  };

  const decrementMWeek = (): void => {
    setSelectedDate((previousSelectedDate: Date) =>
      startOfWeek(addWeeks(previousSelectedDate, -1), { weekStartsOn: 1 })
    );
  };

  const taskFilterChange = (taskFilter: TaskFilterEnum): void => {
    setSelectedTaskFilter(taskFilter);
    if (taskFilter === TaskFilterEnum.Month) {
      setSelectedDate(startOfMonth(selectedDate));
    } else {
      setSelectedDate(startOfWeek(new Date(), { weekStartsOn: 1 }));
    }
  };

  const onNewTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setTaskEdit({
      ...taskEdit,
      uid,
      content: value,
    });
  };

  const saveTask = async (event: KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = event;
    if (keyCode === 13) {
      console.log(taskEdit);
      const { id }: { id: string } = await createOrUpdateTask(taskEdit);
      setTasks((previousTasks: Task[]) => {
        return [
          ...previousTasks,
          {
            ...taskEdit,
            id,
          },
        ];
      });
      setTaskEdit(defaultTask);
      setCreateNewIndex(null);
    }
  };

  useEffect(() => {
    if (createNewIndex !== null) {
      console.log("Creating new task ofc");
      setTaskEdit((previousTaskEdit: Task) => {
        return {
          ...previousTaskEdit,
          uid,
          content: "",
          date: addDays(selectedDate, createNewIndex),
          dateFormatted: format(
            addDays(selectedDate, createNewIndex),
            taskDateFormat
          ),
        };
      });
    }
  }, [createNewIndex, selectedDate, uid]);

  const getTasksByDate: (date: Date) => Task[] = useCallback(
    (date: Date) => {
      const filteredTasks: Task[] = tasks.filter((task: Task) => {
        return isSameDay(date, new Date(task.dateFormatted));
      });
      return filteredTasks;
    },
    [tasks]
  );

  const buildTaskItems = (): ReactNode[] => {
    const taskItems: ReactNode[] = [];
    if (selectedTaskFilter === TaskFilterEnum.Month) {
      for (let i = 0; i < getDaysInMonth(selectedDate); i++) {
        taskItems.push(
          <TaskItem
            date={addDays(selectedDate, i)}
            isCreateNew={i === createNewIndex}
            setCreateNew={() => setCreateNewIndex(i)}
            onInputChange={onNewTaskChange}
            newTaskContent={taskEdit.content}
            tasks={getTasksByDate(addDays(selectedDate, i))}
            key={i}
            onKeyPress={saveTask}
          />
        );
      }
    } else {
      for (let i = 0; i <= 6; i++) {
        taskItems.push(
          <TaskItem
            date={addDays(selectedDate, i)}
            isCreateNew={i === createNewIndex}
            setCreateNew={() => setCreateNewIndex(i)}
            onInputChange={onNewTaskChange}
            newTaskContent={taskEdit.content}
            tasks={getTasksByDate(addDays(selectedDate, i))}
            key={i}
            onKeyPress={saveTask}
          />
        );
      }
    }

    return taskItems;
  };

  return (
    <main className="main-section tasks">
      <div className="tasks-header">
        <SectionTitle
          title={`Tasks for ${format(
            selectedDate,
            selectedTaskFilter === TaskFilterEnum.Month
              ? monthFormat + " " + yearFormat
              : "'Week' " + weekFormat
          )}`}
        />
        <div className="tasks-filter-container">
          <DateSelector
            date={selectedDate}
            isMonth={selectedTaskFilter === TaskFilterEnum.Month}
            decrementMonth={decrementMonth}
            decrementWeek={decrementMWeek}
            incrementMonth={incrementMonth}
            incrementWeek={incrementWeek}
            resetDate={() =>
              selectedTaskFilter === TaskFilterEnum.Month
                ? setSelectedDate(startOfMonth(new Date()))
                : setSelectedDate(startOfWeek(new Date(), { weekStartsOn: 1 }))
            }
          />
          <TaskFilter
            selectedTaskItem={selectedTaskFilter}
            onTaskFilterChange={taskFilterChange}
          />
        </div>
      </div>
      <div className="tasks-container">{buildTaskItems()}</div>
    </main>
  );
};

export default Tasks;
