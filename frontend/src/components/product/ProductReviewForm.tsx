import { FormEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../lib/utils';
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from '../../slices/productsApiSlice';
import { useParams } from 'react-router-dom';
import Loader from '../UI/Loader';

const ProductReviewForm = () => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const { productId } = useParams();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { refetch: refetchProductDetails } = useGetProductDetailsQuery(
    String(productId)
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetchProductDetails();
      setComment('');
      setRating('');
      toast.success('Review submitted');
    } catch (e) {
      toast.error(getErrorMessage(e));
    }
  };

  return (
    <>
      <h2>Write a review</h2>
      {isLoading && <Loader />}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='rating' className='my-2'>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as='select'
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value=''>Select</option>
            <option value='1'>1 - Poor</option>
            <option value='2'>2 - Fair</option>
            <option value='3'>3 - Good</option>
            <option value='4'>4 - Very Good</option>
            <option value='5'>5 - Excellent</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
        <Button disabled={isLoading} type='submit' variant='primary'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default ProductReviewForm;
