import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { registrationSchema, Register } from "../lib/models/registrationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { getErrorMessage } from "../lib/utils";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { PATHS } from "../lib/constants";

const RegisterPage = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValidating, isValid, isSubmitting },
  } = useForm<Register>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(registrationSchema),
    mode: "onBlur",
  });

  const submitHandler = handleSubmit(async (data) => {
    try {
      const res = await register(data).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
    }
  });

  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={submitHandler} noValidate>
        <Form.Group className='my-3'>
          <Form.Label>Name</Form.Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                {...field}
                isInvalid={!!errors.name}
                placeholder='Enter name'
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.name?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Label>Email</Form.Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='email'
                {...field}
                isInvalid={!!errors.email}
                placeholder='Enter email'
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Label>Password</Form.Label>
          <Controller
            name='password'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='password'
                {...field}
                isInvalid={!!errors.password}
                placeholder='Enter password'
              ></Form.Control>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-3'>
          <Form.Label>Confirm Password</Form.Label>
          <Controller
            name='confirmPassword'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='password'
                {...field}
                isInvalid={!!errors.confirmPassword}
                placeholder='Confirm password'
              ></Form.Control>
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type='submit' disabled={!isDirty || !isValid}>
          {isValidating || isSubmitting || isLoading ? <Loader /> : "Register"}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Already have an account? <Link to={PATHS.login}>Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterPage;

// Implement Register Page Plan
// 1 - start with creating a form for the inputs
// 2 - register the inputs in react hook form
// 3 - create a validation schema for the form
// 4 - handle the form submission by sendin a request to the server for creating a uiser
