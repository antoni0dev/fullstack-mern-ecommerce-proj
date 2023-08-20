import { ChangeEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getErrorMessage } from '../../lib/utils';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import {
  productSchema,
  ProductFormType,
} from '../../lib/models/editProductSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const ProductEditPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<ProductFormType>({
    mode: 'onBlur',
    defaultValues: {
      _id: '',
      name: '',
      price: 0,
      image: '',
      brand: '',
      category: '',
      countInStock: 0,
      description: '',
      rating: 0,
      numReviews: 0,
    },
    resolver: zodResolver(productSchema),
  });

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId!);

  const [updateProduct, { isLoading: isProductUpdatingLoading }] =
    useUpdateProductMutation();

  const [
    uploadImage,
    { isLoading: isUploadImageLoading, error: uploadImageError },
  ] = useUploadProductImageMutation();

  const submitHandler = handleSubmit(async (data) => {
    try {
      await updateProduct(data).unwrap();
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  });

  useEffect(() => {
    if (product) {
      setValue('_id', product._id);
      setValue('name', product.name);
      setValue('price', +product.price);
      setValue('brand', product.brand);
      setValue('category', product.category);
      setValue('countInStock', +product.countInStock);
      setValue('description', product.description);
      setValue('rating', +product.rating);
      setValue('numReviews', +product.numReviews);
    }
  }, [product, setValue]);

  const uploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;

    if (!target.files || target.files.length === 0) return;

    const formData = new FormData();
    formData.append('image', target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <FormContainer>
      <Button onClick={() => navigate(-1)} className='my-3'>
        Go back
      </Button>
      <h1>Edit Product</h1>
      {isProductUpdatingLoading || isLoading ? (
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
            <Form.Label>Price</Form.Label>
            <Controller
              control={control}
              name='price'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='number'
                  placeholder='Enter price'
                  isInvalid={!!errors.price}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='my-3' controlId='image'>
            <Form.Label>Image</Form.Label>
            <Controller
              control={control}
              name='image'
              render={({ field }) => (
                <Form.Control
                  type='file'
                  {...field}
                  placeholder='Upload image'
                  onChange={(e) => {
                    uploadHandler(e as ChangeEvent<HTMLInputElement>);
                    field.onChange(e);
                  }}
                ></Form.Control>
              )}
            />
            {isUploadImageLoading && <Loader />}
            <Form.Control.Feedback type='invalid'>
              {errors.image?.message}
            </Form.Control.Feedback>
            <Form.Control.Feedback type='invalid'>
              {uploadImageError && getErrorMessage(uploadImageError)}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='my-3' controlId='brand'>
            <Form.Label>Brand</Form.Label>
            <Controller
              control={control}
              name='brand'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Enter brand'
                  isInvalid={!!errors.brand}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.brand?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='my-3' controlId='countInStock'>
            <Form.Label>Count in Stock</Form.Label>
            <Controller
              control={control}
              name='countInStock'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='number'
                  placeholder='Enter count in stock'
                  isInvalid={!!errors.countInStock}
                  onChange={(e) => field.onChange(+e.target.value)}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.countInStock?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='my-3' controlId='category'>
            <Form.Label>Category</Form.Label>
            <Controller
              control={control}
              name='category'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Enter category'
                  isInvalid={!!errors.category}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.category?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className='my-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Controller
              control={control}
              name='description'
              render={({ field }) => (
                <Form.Control
                  {...field}
                  type='text'
                  placeholder='Enter description'
                  isInvalid={!!errors.description}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            disabled={!isValid}
            type='submit'
            variant='primary'
            className='my-3'
          >
            {isProductUpdatingLoading ? <Loader /> : 'Update Product'}
          </Button>
        </Form>
      )}
      {}
    </FormContainer>
  );
};

export default ProductEditPage;
