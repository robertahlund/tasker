import React, {ChangeEvent, FC, SyntheticEvent, useState} from "react";
import "../login/Login.css";
import InputField from "../generic/InputField";
import {LoginFormValues} from "../../types/types";
import Button from "../generic/Button";

interface RegisterProps {

}

const Register: FC<RegisterProps> = (props) => {
    const [RegisterForm, setRegisterForm] = useState<LoginFormValues>({
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
        setRegisterForm({
            ...RegisterForm,
            [event.target.name]: {
                value: event.target.value,
                valid: true,
                validationMessage: ""
            }
        })
    };

    const handleRegister = (event: SyntheticEvent): void => {
        event.preventDefault();
        console.log("submit");
    };

    return (
        <section className="login">
            <div className="login-wrapper">
                <h1 className="login-header">Register</h1>
                <form className="login-form" onSubmit={handleRegister}>
                    <InputField
                        id="email"
                        labelValue="Email"
                        value={RegisterForm.email.value}
                        type="text"
                        onInputChange={handleFormChange}
                        name="email"
                        valid={RegisterForm.email.valid}
                        validationMessage={RegisterForm.email.validationMessage}
                    />
                    <InputField
                        id="password"
                        labelValue="Password"
                        value={RegisterForm.password.value}
                        type="password"
                        onInputChange={handleFormChange}
                        name="password"
                        valid={RegisterForm.password.valid}
                        validationMessage={RegisterForm.password.validationMessage}
                    />
                    <div className="login-form-button-row">
                        <Button type="submit" text="Register" onSubmit={handleRegister}/>
                    </div>
                </form>
                <div className="login-links">
                    <a className="login-links-item" href="/login">Back</a>
                </div>
            </div>
        </section>
    );
};

export default Register;