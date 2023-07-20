import { Link } from "react-router-dom";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { Controller, useForm } from "react-hook-form";
import { Login, loginSchema } from "../lib/models/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { getErrorMessage } from "../lib/utils";
import { PATHS } from "../lib/constants";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const submitHandler = handleSubmit(async ({ email, password }) => {
    try {
      // unwrap to get data/error directly and not an object with them as props
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
    }
  });

  return (
    <FormContainer>
      <h1>Sign in</h1>
      <Form noValidate onSubmit={submitHandler}>
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
                placeholder='Enter Password'
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.password?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={!isDirty || !isValid || isSubmitting}
        >
          {isLoading ? <Loader /> : "Sign in"}
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer? <Link to={PATHS.register}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
