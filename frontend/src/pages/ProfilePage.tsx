import { useEffect } from 'react';
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { toast } from 'react-toastify';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { RootState } from '../store';
import { Controller, useForm } from 'react-hook-form';
import { Register, registrationSchema } from '../lib/models/registrationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { getErrorMessage } from '../lib/utils';
import { OrderType } from '../lib/@types';

const ProfilePage = () => {
  const {
    data: orders,
    isLoading: isGetMyOrdersLoading,
    error,
  } = useGetMyOrdersQuery({});
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty, isLoading, errors },
    setValue,
  } = useForm<Register>({
    mode: 'onBlur',
    defaultValues: {
      name: userInfo?.name || '',
      email: userInfo?.email || '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(registrationSchema),
  });

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useProfileMutation();

  useEffect(() => {
    if (userInfo) {
      setValue('name', userInfo.name);
      setValue('email', userInfo.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const submitHandler = handleSubmit(async ({ name, email, password }) => {
    try {
      const res = await updateProfile({
        _id: userInfo?._id,
        name,
        email,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("You've successfully updated your profile!");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  });

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Form.Control {...field} type="text" placeholder="Enter name" />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="text"
                  placeholder="Enter email"
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="Enter password"
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type="password"
                  placeholder="Confirm password"
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="my-2"
            disabled={
              !isDirty || !isValid || isLoading || isUpdateProfileLoading
            }
          >
            {isLoading || isUpdateProfileLoading ? (
              <Loader />
            ) : (
              'Update Profile'
            )}
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isGetMyOrdersLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{getErrorMessage(error)}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order: OrderType) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfilePage;
