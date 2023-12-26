import { Button, Card, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { ProductType } from '../../lib/@types';
import { FC, useState } from 'react';
import { PATHS } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../slices/cartSlice';

interface Props {
  product: ProductType;
}

const ProductPurchaseCard: FC<Props> = ({ product }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(qty);
  const handleAddToCart = () => {
    dispatch(addItemToCart({ ...product, qty }));
    navigate(PATHS.cart);
  };

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <Row>
            <Col>Price:</Col>
            <Col>
              <strong>${product.price}</strong>
            </Col>
          </Row>
        </ListGroup.Item>

        <ListGroup.Item>
          <Row>
            <Col>Status:</Col>
            <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
          </Row>
        </ListGroup.Item>
        {product.countInStock > 0 && (
          <ListGroup.Item>
            <Row>
              <Col>Qty</Col>
              <Col>
                <Form.Control
                  as="select"
                  value={qty}
                  onChange={(e) => setQty(+e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
              </Col>
            </Row>
          </ListGroup.Item>
        )}
        <ListGroup.Item>
          <Button
            className="btn-block"
            type="button"
            disabled={!product.countInStock}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default ProductPurchaseCard;
