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
import Sync from "./Sync";
import {
  createOrUpdateTask,
  getAllTasksByDateRange,
  updateTaskOrder,
  syncRepeatedTaskToTask,
} from "../../api/tasks";
import { endOfWeek } from "date-fns/esm";
import { getAllRepeatedTasksByUserId } from "../../api/repeatedTasks";
import { DropResult } from "react-beautiful-dnd";

const reorder = (list: Task[], startIndex: number, endIndex: number) => {
  const result: Task[] = Array.from(list);
  if (startIndex > result.length - 1) {
    const [removed] = result.splice(result.length - 1, 1);
    result.splice(endIndex, 0, removed);
    console.log(result);
    result.forEach((task: Task, index: number) => (task.order = index));
  } else {
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    console.log(result);
    result.forEach((task: Task, index: number) => (task.order = index));
  }
  updateTaskOrder(result);
  return result;
};

interface TasksProps {}

const Tasks: FC<TasksProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [selectedTaskFilter, setSelectedTaskFilter] = useState<TaskFilterEnum>(
    TaskFilterEnum.Week
  );
  const [createNewIndex, setCreateNewIndex] = useState<number | null>(null);
  const [taskEdit, setTaskEdit] = useState<Task>(defaultTask);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskItemMenuId, setTaskItemMenuId] = useState<string | null>(null);
  const [taskItemEdit, setTaskItemEditId] = useState<TaskItemEdit>(
    defaultTaskItemEdit
  );
  const [repeatedTasks, setRepeatedTasks] = useState<RepeatedTask[]>([]);
  const [repeatedTaskIdSync, setRepeatedTaskIdSync] = useState<string>("");
  const [shouldSyncEverything, setShouldSyncEverything] = useState<boolean>(
    false
  );
  const [showSyncMenu, setShowSyncMenu] = useState<boolean>(false);
  const [syncIsLoading, setSyncIsLoading] = useState<boolean>(false);

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
          setTaskEdit({
            id: taskItemEdit.taskId,
            content: repeatedTask.content,
            uid,
            isRepeated: true,
            isCompleted: false,
            repeatedTaskId,
            dateFormatted: format(taskItemEdit.date, taskDateFormat),
            date: taskItemEdit.date,
            isActive: true,
            order: tasks.filter(
              (task: Task) =>
                task.dateFormatted ===
                format(
                  taskItemEdit.date ? taskItemEdit.date : new Date(),
                  taskDateFormat
                )
            ).length,
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
  }, [selectedDate, getTasks, selectedTaskFilter, shouldSyncEverything]);

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
      setSelectedDate(startOfMonth(new Date()));
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
        console.log(id, taskIndex, "SAVING REPEATED TASK");
        if (taskIndex > -1) {
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
          order: tasks.filter(
            (task: Task) =>
              task.dateFormatted ===
              format(addDays(selectedDate, createNewIndex), taskDateFormat)
          ).length,
        };
      });
    }
  }, [createNewIndex, selectedDate, uid, tasks]);

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
          let repeatedTaskAlreadyExists: boolean = false;
          tasksToday.findIndex((task: Task) => {
            if (
              task.repeatedTaskId === repeatedTask.id &&
              repeatedTask.scheduleDays.includes(dayOfWeek)
            ) {
              repeatedTaskAlreadyExists = true;
              return true;
            } else {
              repeatedTaskAlreadyExists = false;
              return false;
            }
          });
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
              isActive: true,
              order: tasksToday.length,
            });
          }
        }
      );
      return tasksToday.sort((current: Task, next: Task) =>
        current.order < next.order ? -1 : 1
      );
    },
    [tasks, repeatedTasks, uid]
  );

  const markTaskAsCompleted = async (date: Date): Promise<void> => {
    if (taskItemMenuId && taskItemMenuId.indexOf("repeated") > -1) {
      const repeatedTaskSplit: string[] = taskItemMenuId.split("-");
      const repeatedTaskId: string = repeatedTaskSplit
        .slice(2, repeatedTaskSplit.length - 3)
        .join("-");
      const repeatedTask: RepeatedTask = repeatedTasks.filter(
        (repeatedTask: RepeatedTask) => repeatedTask.id === repeatedTaskId
      )[0];
      const newTask: Task = {
        id: "",
        content: repeatedTask.content,
        uid,
        isRepeated: true,
        isCompleted: true,
        repeatedTaskId,
        dateFormatted: format(date, taskDateFormat),
        date: date,
        isActive: true,
        order: tasks.filter(
          (task: Task) => task.dateFormatted === format(date, taskDateFormat)
        ).length,
      };
      const { id } = await createOrUpdateTask(newTask);
      setTasks((previousTasks: Task[]) => {
        return [
          ...previousTasks,
          {
            ...newTask,
            id,
          },
        ];
      });
      setTaskItemMenuId(null);
    } else {
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
    }
  };

  const removeTask = async (date: Date): Promise<void> => {
    if (taskItemMenuId && taskItemMenuId.indexOf("repeated") > -1) {
      const repeatedTaskSplit: string[] = taskItemMenuId.split("-");
      const repeatedTaskId: string = repeatedTaskSplit
        .slice(2, repeatedTaskSplit.length - 3)
        .join("-");
      const repeatedTask: RepeatedTask = repeatedTasks.filter(
        (repeatedTask: RepeatedTask) => repeatedTask.id === repeatedTaskId
      )[0];
      const newTask: Task = {
        id: "",
        content: repeatedTask.content,
        uid,
        isRepeated: true,
        isCompleted: true,
        repeatedTaskId,
        dateFormatted: format(date, taskDateFormat),
        date: date,
        isActive: false,
        order: 0,
      };
      const { id } = await createOrUpdateTask(newTask);
      setTasks((previousTasks: Task[]) => {
        return [
          ...previousTasks,
          {
            ...newTask,
            id,
          },
        ];
      });
    } else {
      const taskIndex: number = tasks.findIndex(
        (task: Task) => task.id === taskItemMenuId
      );
      let updatedTask: Task = tasks.filter(
        (task: Task) => task.id === taskItemMenuId
      )[0];
      updatedTask.isActive = false;
      await createOrUpdateTask(updatedTask);
      setTasks((previousTasks: Task[]) => {
        return [
          ...previousTasks.slice(0, taskIndex),
          updatedTask,
          ...previousTasks.slice(taskIndex + 1),
        ];
      });
    }
    setTaskItemMenuId(null);
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
            deleteTask={() => removeTask(addDays(selectedDate, i))}
            taskItemEdit={taskItemEdit}
            markTaskAsCompleted={markTaskAsCompleted}
            onDragEnd={onDragEnd}
            repeatedTaskIdSync={repeatedTaskIdSync}
            syncRepeatedTask={syncRepeatedTask}
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
            deleteTask={() => removeTask(addDays(selectedDate, i))}
            taskItemEdit={taskItemEdit}
            markTaskAsCompleted={markTaskAsCompleted}
            onDragEnd={onDragEnd}
            repeatedTaskIdSync={repeatedTaskIdSync}
            syncRepeatedTask={syncRepeatedTask}
          />
        );
      }
    }
    return taskItems;
  };

  const onDragEnd = async (result: DropResult, date: Date): Promise<void> => {
    if (!result.destination) {
      return;
    }
    const { draggableId }: { draggableId: string } = result;
    if (draggableId.indexOf("repeated") > -1) {
      const repeatedTaskSplit: string[] = draggableId.split("-");
      const repeatedTaskId: string = repeatedTaskSplit
        .slice(2, repeatedTaskSplit.length - 3)
        .join("-");
      const repeatedTask: RepeatedTask = repeatedTasks.filter(
        (repeatedTask: RepeatedTask) => repeatedTask.id === repeatedTaskId
      )[0];
      let newTask: Task = {
        id: "",
        content: repeatedTask.content,
        uid,
        isRepeated: true,
        isCompleted: false,
        repeatedTaskId,
        dateFormatted: format(date, taskDateFormat),
        date: date,
        isActive: true,
        order: tasks.filter(
          (task: Task) => task.dateFormatted === format(date, taskDateFormat)
        ).length,
      };
      const { id } = await createOrUpdateTask(newTask);
      newTask.id = id;
      const tasksToReorder: Task[] = [...tasks, { ...newTask }]
        .filter(
          (task: Task) => task.dateFormatted === format(date, taskDateFormat)
        )
        .sort((current: Task, next: Task) =>
          current.order < next.order ? -1 : 1
        );
      const tasksToNotReorder: Task[] = tasks.filter(
        (task: Task) => task.dateFormatted !== format(date, taskDateFormat)
      );
      const items: Task[] = reorder(
        tasksToReorder,
        result.source.index,
        result.destination.index
      );
      setTasks([...items, ...tasksToNotReorder]);
    } else {
      const tasksToReorder: Task[] = tasks
        .filter(
          (task: Task) => task.dateFormatted === format(date, taskDateFormat)
        )
        .sort((current: Task, next: Task) =>
          current.order < next.order ? -1 : 1
        );
      const tasksToNotReorder: Task[] = tasks.filter(
        (task: Task) => task.dateFormatted !== format(date, taskDateFormat)
      );
      const items: Task[] = reorder(
        tasksToReorder,
        result.source.index,
        result.destination.index
      );
      setTasks([...items, ...tasksToNotReorder]);
    }
  };

  const syncRepeatedTask = async (
    taskId: string,
    date: Date
  ): Promise<void> => {
    setRepeatedTaskIdSync(taskId);
    const repeatedTaskSplit: string[] = taskId.split("-");
    const repeatedTaskId: string = repeatedTaskSplit
      .slice(2, repeatedTaskSplit.length - 3)
      .join("-");
    const repeatedTask: RepeatedTask = repeatedTasks.filter(
      (repeatedTask: RepeatedTask) => repeatedTask.id === repeatedTaskId
    )[0];
    let newTask: Task = {
      id: "",
      content: repeatedTask.content,
      uid,
      isRepeated: true,
      isCompleted: false,
      repeatedTaskId,
      dateFormatted: format(date, taskDateFormat),
      date: date,
      isActive: true,
      order: tasks.filter(
        (task: Task) => task.dateFormatted === format(date, taskDateFormat)
      ).length,
    };
    const { id } = await createOrUpdateTask(newTask);
    setRepeatedTaskIdSync("");
    setTasks([...tasks, { ...newTask, id }]);
  };

  const syncAllRepeatedTasks = async (): Promise<void> => {
    setSyncIsLoading(true);
    const allTasks: Task[] = [];
    if (selectedTaskFilter === TaskFilterEnum.Month) {
      for (let i = 0; i < getDaysInMonth(selectedDate); i++) {
        allTasks.push(...getTasksByDate(addDays(selectedDate, i)));
      }
    } else {
      for (let i = 0; i <= 6; i++) {
        allTasks.push(...getTasksByDate(addDays(selectedDate, i)));
      }
    }
    const repeatedTasksToBeSynced: Task[] = allTasks.filter(
      (task: Task) => task.id.indexOf("repeated") > -1
    );
    await syncRepeatedTaskToTask(repeatedTasksToBeSynced);

    setSyncIsLoading(false);
    setShouldSyncEverything((previousState: boolean) => !previousState);
    setTimeout(() => {
      setShowSyncMenu(false);
    }, 1000);
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
      <Sync
        showSyncMenu={showSyncMenu}
        setShowSyncMenu={() =>
          setShowSyncMenu((previousState: boolean) => {
            return !previousState;
          })
        }
        syncIsLoading={syncIsLoading}
        syncAllRepeatedTasks={syncAllRepeatedTasks}
      />
      <div className="tasks-container">{buildTaskItems()}</div>
    </main>
  );
};

export default Tasks;
