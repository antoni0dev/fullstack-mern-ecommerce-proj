import { FC } from 'react';
import { ProductType } from '../../lib/@types';
import { ListGroup } from 'react-bootstrap';
import Message from '../UI/Message';
import Rating from '../UI/Rating';
import { PATHS } from '../../lib/constants';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../slices/authSlice';

import ProductReviewForm from './ProductReviewForm';

interface Props {
  product: ProductType;
}

const ProductReviews: FC<Props> = ({ product }) => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <>
      <h1>Reviews</h1>
      {product.numReviews === 0 && <Message>No reviews</Message>}
      {product.numReviews > 0 && (
        <ListGroup variant='flush'>
          {product.reviews?.map((review) => (
            <ListGroup.Item key={review._id}>
              <strong>{review.name}</strong>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
          <ListGroup.Item className='p-0'>
            {userInfo ? (
              <ProductReviewForm />
            ) : (
              <Message>
                Please <Link to={PATHS.login}>login</Link> to write a review
              </Message>
            )}
          </ListGroup.Item>
        </ListGroup>
      )}
    </>
  );
};

export default ProductReviews;
