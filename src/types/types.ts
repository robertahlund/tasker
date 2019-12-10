export interface Auth {
  uid: string;
  authenticated: boolean;
}

export interface FormFieldValues {
  value: string;
  valid: boolean;
  validationMessage: string;
}