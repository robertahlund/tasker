import React, { ChangeEvent, FC, SyntheticEvent, useState } from "react";
import "./Login.css";
import InputField from "../generic/InputField";
import { LoginFormValues } from "../../types/types";
import Button from "../generic/Button";
import { Link } from "react-router-dom";
import { login } from "../../api/authentication";

interface LoginProps {}

const Login: FC<LoginProps> = props => {
  const [loginForm, setLoginForm] = useState<LoginFormValues>({
    email: {
      valid: true,
      validationMessage: "",
      value: ""
    },
    password: {
      valid: true,
      validationMessage: "",
      value: ""
    }
  });
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: {
        value: event.target.value,
        valid: true,
        validationMessage: ""
      }
    });
  };

  const handleLogin = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setLoginLoading(true);
    const email: string = loginForm.email.value;
    const password: string = loginForm.password.value;
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
      setLoginLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="login-wrapper">
        <h1 className="login-header">Log in to your account</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <InputField
            id="email"
            labelValue="Email"
            value={loginForm.email.value}
            type="text"
            onInputChange={handleFormChange}
            name="email"
            valid={loginForm.email.valid}
            validationMessage={loginForm.email.validationMessage}
          />
          <InputField
            id="password"
            labelValue="Password"
            value={loginForm.password.value}
            type="password"
            onInputChange={handleFormChange}
            name="password"
            valid={loginForm.password.valid}
            validationMessage={loginForm.password.validationMessage}
          />
          <div className="login-form-button-row">
            <Button
              type="submit"
              text="Log in"
              onSubmit={handleLogin}
              disabled={loginLoading}
              loading={loginLoading}
            />
          </div>
        </form>
        <div className="login-links">
          <Link to="/forgot-password" className="login-links-item">
            Forgot your password?
          </Link>
          <Link to="/register" className="login-links-item">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
