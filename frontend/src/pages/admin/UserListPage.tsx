import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../../components/UI/Loader';
import Message from '../../components/UI/Message';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../lib/utils';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';

const UserListPage = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();

  const [deleteUser, { isLoading: deleteUserLoading }] =
    useDeleteUserMutation();

  const deleteUserHandler = async (userId: string) => {
    try {
      await deleteUser(userId).unwrap();
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{getErrorMessage(error)}</Message>
  ) : (
    <>
      <Row>
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY1</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/edit-user/${user._id}`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteUserHandler(user._id)}
                  >
                    {deleteUserLoading ? (
                      <Loader />
                    ) : (
                      <FaTrash style={{ color: 'white' }} />
                    )}
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default UserListPage;
