import { useForm } from "react-hook-form";
import { useState } from "react";
import { signup } from "./../utils/auth/authenticate";
import { useNavigate } from "react-router-dom";
import { Button, Form } from 'react-bootstrap';

function RegisterForm() {

    const [error, setError] = useState("");

    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
      } = useForm();
    

    async function onSubmit(values) {
        try {
          await signup(values);
          navigate("/login");
        } catch (error) {
          setError(error.resposnse.data.message);
        }
    }

    return (
        <Form className="w-50 m-auto" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Enter your name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your user name"
            autoComplete="name"
            {...register('name', {
              required: 'name is required',
            })}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name && errors.name.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            autoComplete="email"
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && errors.email.message}
          </Form.Control.Feedback>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Minimum length should be 8 symbols',
              },
            })}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password && errors.password.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          autoComplete="confirm-password"
          {...register('passwordConfirm', {
            required: 'Confirm Password is required',
            minLength: {
              value: 8,
              message: 'Minimum length should be 8 symbols',
            },
          })}
          isInvalid={errors.passwordConfirm}
        />
        <Form.Control.Feedback type="invalid">
          {errors.passwordConfirm && errors.passwordConfirm.message}
        </Form.Control.Feedback>
      </Form.Group>

  
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Submit
        </Button>
      </Form>
    )
}

export default RegisterForm;