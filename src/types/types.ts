import {RepetableTaskType} from "../enums/enums";

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

export interface RepeatableTaskFormValues {
  content: FormFieldValues;
  schedule: RepetableTaskType;
  scheduleDays: number[]
}

export interface RepeatableTask {
  id: string;
  content: string;
  schedule: RepetableTaskType;
  scheduleDays: number[]
}

export interface IconProps {
  height: string;
  width: string;
  onClickFunction?: () => void;
}