import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "./../utils/auth/authenticate";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../styles/login.css";
import ninjaLogo from "../assets/Group.svg";

function LoginForm() {
  const [error, setError] = useState("");

  const navigate = useNavigate();

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
    <div className="allLoginPage">
      <div className="loginPhoto">
            <img className="ninjaLogo" src={ninjaLogo} alt="" />
            <p className="textOnPhoto">
              <strong>Empower</strong> your team to{" "}
              <strong>crush deadlines </strong>with inituitive project
              managment app!
            </p>
      </div>
      <Form className="w-50 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
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

        <div className="loginFormError">{error}</div>      
         
        <Button bsPrefix="loginButton" type="submit" disabled={isSubmitting}>
          Log In
        </Button>      
        <hr />
        <Link to={"/register"}>
        <Button bsPrefix="newAccountBtn" type="submit" disabled={isSubmitting}>
          Create new account
        </Button>
        </Link>
      </Form>
    </div>
  );
}

export default LoginForm;
