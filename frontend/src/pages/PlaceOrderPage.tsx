import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearField, selectCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import CheckoutSteps from '../components/UI/CheckoutSteps';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartField, PATHS } from '../lib/constants';
import { getErrorMessage } from '../lib/utils';

const PlaceOrderPage = () => {
  const navigate = useNavigate();
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  const handleEditShipping = () => {
    dispatch(clearField(CartField.ShippingAddress));
    navigate(PATHS.shipping);
  };

  const handleEditPaymentMethod = () => {
    dispatch(clearField(CartField.PaymentMethod));
    navigate(PATHS.payment);
  };

  const handleEditCart = () => {
    navigate(PATHS.cart);
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
        taxPrice: cart.taxPrice,
      }).unwrap();

      dispatch(clearField(CartField.All));
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.country},{' '}
                {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.streetAddress},{' '}
                {cart.shippingAddress.postalCode}{' '}
                <Button variant='link' onClick={handleEditShipping}>
                  Edit
                </Button>
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method:</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
              <Button
                style={{ alignSelf: 'baseline' }}
                variant='link'
                onClick={handleEditPaymentMethod}
              >
                Edit
              </Button>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items:</h2>
              {cart.cartItems ? (
                <>
                  <ListGroup variant='flush'>
                    {cart.cartItems.map((item) => (
                      <ListGroup.Item key={item._id}>
                        <Row className='justify-content-center align-items-center'>
                          <Col md={1}>
                            <img src={item.image} width={50} height={50} />
                          </Col>
                          <Col>
                            <Link to={`/product/${item._id}`}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x {item.price} = $
                            {(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  <Button onClick={handleEditCart} variant='link'>
                    Manage Cart
                  </Button>
                </>
              ) : (
                <Message>
                  Your cart is empty. Go back{' '}
                  <Link to={PATHS.root}>shopping</Link>
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    $
                    {cart.shippingPrice === 0
                      ? cart.shippingPrice + ' (FREE SHIPPING)'
                      : cart.shippingPrice}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message>{getErrorMessage(error)}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={!cart.cartItems.length}
                  onClick={handlePlaceOrder}
                >
                  {isLoading ? <Loader /> : 'Place Order'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderPage;
