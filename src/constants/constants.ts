import {
  DateDayFormat,
  DayFormat,
  MonthFormat,
  TaskFilterTypes,
  WeekFormat,
  YearFormat,
  Task,
  TaskFormattedDateFormat,
  TaskItemEdit,
} from "../types/types";
import { TaskFilter } from "../enums/enums";

export const repeatedTasksPath: string = "repeated_tasks";
export const tasksPath: string = "tasks";
export const repeatedTaskDateFormat: string = "dd LLL, yyyy"; //22 Jan, 2020
export const monthFormat: MonthFormat = "MMMM";
export const yearFormat: YearFormat = "y";
export const weekFormat: WeekFormat = "w";
export const dayFormat: DayFormat = "EEEE";
export const dateDayFormat: DateDayFormat = "MMM d";
export const taskDateFormat: TaskFormattedDateFormat = "y-MM-dd";

export const taskFilters: TaskFilterTypes = {
  types: [TaskFilter.Month, TaskFilter.Week],
};

export const defaultTask: Task = {
  id: "",
  uid: "",
  content: "",
  isCompleted: false,
  date: new Date(),
  dateFormatted: "",
  isRepeated: false,
  isActive: true,
  order: 0,
};

export const defaultTaskItemEdit: TaskItemEdit = {
  taskId: null,
  date: null,
};

export const modalPortal = document.getElementById("modal-portal");
