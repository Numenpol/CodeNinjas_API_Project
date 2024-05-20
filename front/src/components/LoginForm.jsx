import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "./../utils/auth/authenticate";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import styles from "../styles/LoginForm.module.css";
import codeNinjaLogo from "../assets/Group.svg";


function LoginForm() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {allLoginPage, loginPhoto, ninjaLogo, textOnPhoto, loginFormDiv, loginPageForm, formBasicEmail, formBasicPassword, loginInputHolder, loginFormError, loginButtonBorder, loginButton, newAccountBtn } = styles;

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    try {
      await login(values);
      navigate("/projects");
    } catch (error) {
      if (error.message == "Request failed with status code 401") {
        setError("Incorrect email or password");
      } else {
        setError(error.message);
      }
    }
  }
  return (
    <div className={allLoginPage}>
      <div className={loginPhoto}>
        <img className={ninjaLogo} src={codeNinjaLogo} alt="Logo" />
        <p className={textOnPhoto}>
          <span>Empower</span> your team to
          <span>crush deadlines </span>with inituitive project
          managment app!
        </p>
      </div>
      <div className={loginFormDiv}>
        <Form
          // className={`${loginPageForm} w-50 m-auto`}
          className={loginPageForm}
          onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail" className={formBasicEmail}>
            <Form.Control
              className={loginInputHolder}
              type="email"
              placeholder="Enter email"
              autoComplete="email"
              {...register("email", {
                required: "Email address is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email && errors.email.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className={formBasicPassword}>
            <Form.Control
              className={loginInputHolder}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Minimum length should be 8 symbols",
                },
              })}
              isInvalid={errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password && errors.password.message}
            </Form.Control.Feedback>
          </Form.Group>

          <div className={loginFormError}>{error}</div>
          <div className={loginButtonBorder}>
            <Button bsPrefix={loginButton} type="submit" disabled={isSubmitting}>
              Log In
            </Button>
          </div>
          {/* <hr /> */}
          <Link to={"/register"}>
            <Button bsPrefix={newAccountBtn} type="submit" disabled={isSubmitting}>
              Create new account
            </Button>
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
