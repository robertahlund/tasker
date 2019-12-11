import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import "./Login.css";
import InputField from "../generic/InputField";
import {LoginFormValues} from "../../types/types";
import Button from "../generic/Button";

interface LoginProps {

}

const Login: FC<LoginProps> = (props) => {
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

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setLoginForm({
            ...loginForm,
            [event.target.name]: {
                value: event.target.value,
                valid: true,
                validationMessage: ""
            }
        })
    };

    const handleLogin = (event: SyntheticEvent): void => {
        event.preventDefault();
        console.log("submit");
    };

    return (
        <section className="login">
            <div className="login-wrapper">
                <h1 className="login-header">Log in</h1>
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
                        <Button type="submit" text="Log in" onSubmit={handleLogin}/>
                    </div>
                </form>
                <div className="login-links">
                    <a className="login-links-item" href="/forgot-password">Forgot your password?</a>
                    <a className="login-links-item" href="/register">Register</a>
                </div>
            </div>
        </section>
    );
};

export default Login;