import React, {ChangeEvent, FC, SyntheticEvent, useEffect, useState} from "react";
import "../login/Login.css";
import InputField from "../generic/InputField";
import { LoginFormValues } from "../../types/types";
import Button from "../generic/Button";
import { Link } from "react-router-dom";
import { register } from "../../api/authentication";
import LoginIllustration from "../illustrations/LoginIllustration";

interface RegisterProps {}

const Register: FC<RegisterProps> = props => {
  const [registerForm, setRegisterForm] = useState<LoginFormValues>({
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
  const [registerLoading, setRegisterLoading] = useState<boolean>(false);

  useEffect(() => {
    document.title = "Register";
  }, [])

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: {
        value: event.target.value,
        valid: true,
        validationMessage: ""
      }
    });
  };

  const handleRegister = async (event: SyntheticEvent): Promise<void> => {
    event.preventDefault();
    setRegisterLoading(true);
    const email: string = registerForm.email.value;
    const password: string = registerForm.password.value;
    try {
      await register(email, password);
    } catch (error) {
      console.log(error);
      setRegisterLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="login-wrapper">
        <LoginIllustration height="400px" width="400px" />
        <div className="login-form-wrapper">
          <h1 className="login-header">Register</h1>
          <form className="login-form" onSubmit={handleRegister}>
            <InputField
              id="email"
              labelValue="Email"
              value={registerForm.email.value}
              type="text"
              onInputChange={handleFormChange}
              name="email"
              valid={registerForm.email.valid}
              validationMessage={registerForm.email.validationMessage}
            />
            <InputField
              id="password"
              labelValue="Password"
              value={registerForm.password.value}
              type="password"
              onInputChange={handleFormChange}
              name="password"
              valid={registerForm.password.valid}
              validationMessage={registerForm.password.validationMessage}
            />
            <div className="login-form-button-row">
              <Button
                type="submit"
                text="Register"
                onSubmit={handleRegister}
                loading={registerLoading}
                disabled={registerLoading}
              />
            </div>
          </form>
          <div className="login-links">
            <Link to="/login" className="login-links-item">
              Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
