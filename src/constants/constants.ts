import {DateDayFormat, DayFormat, MonthFormat, TaskFilterTypes, WeekFormat, YearFormat} from "../types/types";
import {TaskFilter} from "../enums/enums";

export const repeatedTasksPath: string = "repeated_tasks";
export const tasksPath: string = "tasks";
export const repeatedTaskDateFormat: string = "dd LLL, yyyy"; //22 Jan, 2020
export const monthFormat: MonthFormat = "MMMM";
export const yearFormat: YearFormat = "y";
export const weekFormat: WeekFormat = "w";
export const dayFormat: DayFormat = "EEEE";
export const dateDayFormat: DateDayFormat = "MMM d";

export const taskFilters: TaskFilterTypes = {
  types: [TaskFilter.Month, TaskFilter.Week]
};

export const modalPortal = document.getElementById("modal-portal");