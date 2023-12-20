import { Card } from 'react-bootstrap';
import { ProductType } from '../../lib/@types';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../UI/Rating';

interface Props {
  product: ProductType;
}

const Product: FC<Props> = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`product/${product._id}`}>
          <Card.Title className="product-title" as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3">${product.price}</Card.Text>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
