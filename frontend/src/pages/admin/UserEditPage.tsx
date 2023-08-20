import { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from '../../slices/usersApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getErrorMessage } from '../../lib/utils';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import { userSchema, UserFormType } from '../../lib/models/editUserSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const UserEditPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<UserFormType>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      isAdmin: false,
    },
    resolver: zodResolver(userSchema),
  });

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId!);

  const [updateProduct, { isLoading: isUserUpdatingLoading }] =
    useUpdateUserMutation();

  const submitHandler = handleSubmit(async (data) => {
    try {
      await updateProduct({ _id: user._id, ...data }).unwrap();
      refetch();
      toast.success("You've successfully updated the user info!");
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('isAdmin', user.isAdmin);
    }
  }, [user]);

  return (
    <FormContainer>
      <Button onClick={() => navigate(-1)} className='my-3'>
        Go back
      </Button>
      <h1>Edit User</h1>
      {isUserUpdatingLoading || isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{getErrorMessage(error)}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3'>
            <Form.Label>Name</Form.Label>
            <Controller
              control={control}
              name='name'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Enter name'
                  isInvalid={!!errors.name}
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
              control={control}
              name='email'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Enter email'
                  isInvalid={!!errors.email}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='my-3'>
            <Controller
              control={control}
              name='isAdmin'
              render={({ field: { value, ...restField } }) => (
                <Form.Check
                  type='checkbox'
                  label='Is Admin'
                  checked={value}
                  {...restField}
                ></Form.Check>
              )}
            />

            <Form.Control.Feedback type='invalid'>
              {errors.isAdmin?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Button
            disabled={!isValid}
            type='submit'
            variant='primary'
            className='my-3'
          >
            {isUserUpdatingLoading ? <Loader /> : 'Update User'}
          </Button>
        </Form>
      )}
      {}
    </FormContainer>
  );
};

export default UserEditPage;
