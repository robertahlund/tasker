import { RepeatedTaskType, TaskFilter } from "../enums/enums";

export interface Auth {
  uid: string;
  authenticated: boolean;
}

export interface FormFieldValues {
  value: string;
  valid: boolean;
  validationMessage: string;
}

export interface LoginFormValues {
  email: FormFieldValues;
  password: FormFieldValues;
}

export interface RepeatedTaskFormValues {
  id: string;
  content: FormFieldValues;
  schedule: RepeatedTaskType;
  scheduleDays: number[];
}

export interface RepeatedTask {
  id: string;
  uid: string;
  content: string;
  schedule: RepeatedTaskType;
  scheduleDays: number[];
  createdAtFormatted: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  uid: string;
  content: string;
  isRepeated: boolean;
  isCompleted: boolean;
  repeatedTaskId?: string;
  date: Date;
  dateFormatted: string;
  isActive: boolean;
  order: number;
}

export interface TaskItemEdit {
  taskId: string | null;
  date: Date | null;
}

export interface IconProps {
  height: string;
  width: string;
  onClickFunction?: () => void;
}

export interface TaskFilterTypes {
  types: TaskFilter[];
}

export type WeekDayAbbreviation =
  | "Mon"
  | "Tue"
  | "Wed"
  | "Thu"
  | "Fri"
  | "Sat"
  | "Sun";

export type MonthFormat = "MMMM";
export type YearFormat = "y";
export type WeekFormat = "w";
export type DayFormat = "EEEE";
export type DateDayFormat = "MMM d";
export type TaskFormattedDateFormat = "y-MM-dd";
