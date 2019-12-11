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