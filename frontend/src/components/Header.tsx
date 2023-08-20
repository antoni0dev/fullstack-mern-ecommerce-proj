import { Badge, Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '/images/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useLogoutMutation } from '../slices/usersApiSlice';
import Loader from './Loader';
import { clearCredentials } from '../slices/authSlice';
import { getErrorMessage } from '../lib/utils';
import { toast } from 'react-toastify';
import { CartField, PATHS } from '../lib/constants';
import { clearField } from '../slices/cartSlice';

const Header = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [logout, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logout({});
      dispatch(clearCredentials());
      dispatch(clearField(CartField.All));
    } catch (e) {
      const errorMessage = getErrorMessage(e);
      toast.error(errorMessage);
    }
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={logo} />
              ProShop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {userInfo ? (
                <>
                  <LinkContainer to='/cart'>
                    <Nav.Link>
                      <FaShoppingCart /> Cart
                      {cartItems.length > 0 && (
                        <Badge pill bg='danger' style={{ marginLeft: '5px' }}>
                          {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                        </Badge>
                      )}
                    </Nav.Link>
                  </LinkContainer>
                  {userInfo?.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenu'>
                      <LinkContainer to={PATHS.userList}>
                        <NavDropdown.Item>User List</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={PATHS.productList}>
                        <NavDropdown.Item>Products List</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to={PATHS.orderList}>
                        <NavDropdown.Item>Orders List</NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to={PATHS.profile}>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      {isLoading ? <Loader /> : 'Logout'}
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <FaUser /> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
