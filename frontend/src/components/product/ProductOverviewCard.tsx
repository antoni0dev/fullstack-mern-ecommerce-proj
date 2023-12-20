import { ListGroup } from 'react-bootstrap';
import Rating from '../UI/Rating';
import { FC } from 'react';
import { ProductType } from '../../lib/@types';

interface Props {
  product: ProductType;
}

const ProductOverviewCard: FC<Props> = ({ product }) => {
  return (
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h3>{product.name}</h3>
      </ListGroup.Item>
      <ListGroup.Item>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </ListGroup.Item>
      <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
      <ListGroup.Item>Description: {product.description}</ListGroup.Item>
    </ListGroup>
  );
};

export default ProductOverviewCard;
