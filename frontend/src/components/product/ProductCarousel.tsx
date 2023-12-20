import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from '../UI/Loader';
import { useGetTopProductsQuery } from '../../slices/productsApiSlice';
import { getErrorMessage } from '../../lib/utils';

const ProductCarousel = () => {
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetTopProductsQuery(null!);

  if (error) {
    console.error(getErrorMessage(error));
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption ">
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
