import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { addItemToCart, removeItemFromCart } from "../slices/cartSlice";
import { CartItem } from "../lib/@types";
import { ChangeEvent } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  // in case there's nothing in the cart
  if (cartItems.length === 0) {
    return (
      <Message>
        Empty cart, <Link to='/'>go back</Link>
      </Message>
    );
  }

  // handle item qty modification using curried func
  const addToCartHandler =
    (item: CartItem) => (event: ChangeEvent<HTMLInputElement>) => {
      const qty = +event.target.value;
      dispatch(addItemToCart({ ...item, qty }));
    };

  // handle item removal from cart state
  const removeFromCartHandler = (id: string) => (e: any) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
        <ListGroup variant='flush'>
          {cartItems.map((item) => (
            <ListGroup.Item key={item._id}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item._id}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as='select'
                    value={item.qty}
                    onChange={addToCartHandler(item)}
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type='button'
                    variant='white'
                    onClick={removeFromCartHandler(item._id)}
                  >
                    <FaTrash />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              {/* TODO: Handle proceed to checkout */}
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
