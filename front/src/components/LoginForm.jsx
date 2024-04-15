import { useForm } from "react-hook-form";
import { useState } from "react";
import { login } from "./../utils/auth/authenticate";
import { useNavigate } from "react-router-dom";
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
      navigate("/profile");
    } catch (error) {
      setError(error.resposnse.data.message);
    }
  }

  return (
    <div className="allLoginPage">
      <div className="loginPhoto">
        <div className="projectPhotoBackground">
            <div className="logoBox">
              <img className="ninjaLogo" src={ninjaLogo} alt="" />
            </div>
            <div className="textOnPhoto">
              <p>
                <strong>Empower</strong> your team to{" "}
                <strong>crush deadlines </strong>with inituitive project
                managment app!
              </p>
          </div>
        </div>
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
        <Button bsPrefix="loginButton" type="submit" disabled={isSubmitting}>
          Log In
        </Button>
        <hr />
        <Button bsPrefix="newAccountBtn" type="submit" disabled={isSubmitting}>
          Create new account
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
