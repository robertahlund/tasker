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
  getISODay,
} from "date-fns";
import {
  monthFormat,
  weekFormat,
  yearFormat,
  defaultTask,
  taskDateFormat,
  defaultTaskItemEdit,
} from "../../constants/constants";
import DateSelector from "../generic/DateSelector";
import TaskFilter from "./TaskFilter";
import { TaskFilter as TaskFilterEnum } from "../../enums/enums";
import TaskItem from "./TaskItem";
import { Task, Auth, RepeatedTask, TaskItemEdit } from "../../types/types";
import { AuthenticationContext } from "../../context/authContext";
import {
  createOrUpdateTask,
  getAllTasksByDateRange,
  deleteTask,
} from "../../api/tasks";
import { endOfWeek } from "date-fns/esm";
import { getAllRepeatedTasksByUserId } from "../../api/repeatedTasks";

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
  const [taskItemMenuId, setTaskItemMenuId] = useState<string | null>(null);
  const [taskItemEdit, setTaskItemEditId] = useState<TaskItemEdit>(
    defaultTaskItemEdit
  );
  const [repeatedTasks, setRepeatedTasks] = useState<RepeatedTask[]>([]);

  const { uid }: { uid: string } = useContext<Auth>(AuthenticationContext);

  useEffect(() => {
    document.title = "Tasks";
  }, []);

  useEffect(() => {
    if (taskItemEdit.taskId !== null) {
      const taskEditIdIsRepeatedTask: boolean =
        taskItemEdit.taskId.indexOf("repeated") > -1;
      if (!taskEditIdIsRepeatedTask) {
        setTaskEdit(
          tasks.filter((task: Task) => task.id === taskItemEdit.taskId)[0]
        );
      } else {
        if (taskItemEdit.date !== null) {
          const repeatedTaskSplit: string[] = taskItemEdit.taskId.split("-");
          const repeatedTaskId: string = repeatedTaskSplit
            .slice(2, repeatedTaskSplit.length - 3)
            .join("-");
          const repeatedTask: RepeatedTask = repeatedTasks.filter(
            (repeatedTask: RepeatedTask) => repeatedTask.id === repeatedTaskId
          )[0];
          console.log(repeatedTask);
          setTaskEdit({
            id: taskItemEdit.taskId,
            content: repeatedTask.content,
            uid,
            isRepeated: true,
            isCompleted: false,
            repeatedTaskId,
            dateFormatted: format(taskItemEdit.date, taskDateFormat),
            date: taskItemEdit.date,
          });
        }
      }
    }
  }, [taskItemEdit, tasks, repeatedTasks, uid]);

  const getTasks = useCallback(
    async (startDate: Date, endDate: Date): Promise<void> => {
      const repeatedTasks: RepeatedTask[] = await getAllRepeatedTasksByUserId(
        uid
      );
      const tasksForMonth: Task[] = await getAllTasksByDateRange(
        uid,
        startDate,
        endDate
      );
      console.log(tasksForMonth);
      setRepeatedTasks(repeatedTasks);
      setTasks(tasksForMonth);
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

  const saveTask = async (event?: KeyboardEvent<HTMLInputElement>) => {
    if (event === undefined || event.keyCode === 13) {
      const { id }: { id: string } = await createOrUpdateTask(taskEdit);
      if (taskItemEdit.taskId !== null) {
        const taskIndex: number = tasks.findIndex(
          (task: Task) => task.id === taskItemEdit.taskId
        );
        setTasks((previousTasks: Task[]) => {
          return [
            ...previousTasks.slice(0, taskIndex),
            taskEdit,
            ...previousTasks.slice(taskIndex + 1),
          ];
        });
      } else {
        setTasks((previousTasks: Task[]) => {
          return [
            ...previousTasks,
            {
              ...taskEdit,
              id,
            },
          ];
        });
      }
      setTaskItemEditId(defaultTaskItemEdit);
      setTaskItemMenuId(null);
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
      const tasksToday: Task[] = tasks.filter((task: Task) => {
        return isSameDay(date, new Date(task.dateFormatted));
      });
      const dayOfWeek: number = getISODay(date);
      const repeatedTasksToday: RepeatedTask[] = repeatedTasks.filter(
        (repeatedTask: RepeatedTask) => {
          return (
            repeatedTask.scheduleDays.findIndex(
              (day: number) => day === dayOfWeek
            ) > -1
          );
        }
      );
      repeatedTasksToday.forEach(
        (repeatedTask: RepeatedTask, index: number) => {
          const repeatedTaskAlreadyExists: boolean =
            tasksToday.findIndex((task: Task) => {
              const taskDayOfWeek: number = getISODay(
                new Date(task.dateFormatted)
              );
              if (
                task.repeatedTaskId === repeatedTask.id &&
                repeatedTask.scheduleDays.includes(dayOfWeek)
              ) {
                console.log(
                  repeatedTask.scheduleDays,
                  taskDayOfWeek,
                  task.dateFormatted,
                  dayOfWeek
                );
                console.log("FOUND DUPLICATE @", task.dateFormatted);
                return 1;
              } else {
                return -1;
              }
            }) > -1;
          if (!repeatedTaskAlreadyExists) {
            tasksToday.push({
              id: `repeated-${index}-${repeatedTask.id}-${format(
                date,
                taskDateFormat
              )}`,
              uid,
              content: repeatedTask.content,
              repeatedTaskId: repeatedTask.id,
              date: date,
              dateFormatted: format(date, taskDateFormat),
              isCompleted: false,
              isRepeated: true,
            });
          }
        }
      );
      return tasksToday;
    },
    [tasks, repeatedTasks, uid]
  );

  const markTaskAsCompleted = async (): Promise<void> => {
    const completedTask: Task | undefined = tasks.find(
      (task: Task) => task.id === taskItemMenuId
    );
    const taskIndex: number = tasks.findIndex(
      (task: Task) => task.id === taskItemMenuId
    );
    if (completedTask) {
      completedTask.isCompleted = !completedTask.isCompleted;
      await createOrUpdateTask(completedTask);
      setTasks((previousTasks: Task[]) => {
        return [
          ...previousTasks.slice(0, taskIndex),
          completedTask,
          ...previousTasks.slice(taskIndex + 1),
        ];
      });
      setTaskItemMenuId(null);
    }
  };

  const removeTask = async (): Promise<void> => {
    if (taskItemMenuId !== null) {
      deleteTask(taskItemMenuId);
      setTasks((previousTasks: Task[]) =>
        previousTasks.filter((task: Task) => task.id !== taskItemMenuId)
      );
    }
  };

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
            saveTask={saveTask}
            taskItemMenuId={taskItemMenuId}
            setTaskItemMenuId={setTaskItemMenuId}
            setTaskItemEdit={setTaskItemEditId}
            deleteTask={removeTask}
            taskItemEdit={taskItemEdit}
            markTaskAsCompleted={markTaskAsCompleted}
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
            saveTask={saveTask}
            taskItemMenuId={taskItemMenuId}
            setTaskItemMenuId={setTaskItemMenuId}
            setTaskItemEdit={setTaskItemEditId}
            deleteTask={removeTask}
            taskItemEdit={taskItemEdit}
            markTaskAsCompleted={markTaskAsCompleted}
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
