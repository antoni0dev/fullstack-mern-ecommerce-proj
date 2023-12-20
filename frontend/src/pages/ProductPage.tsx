import { useParams } from 'react-router-dom';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { getErrorMessage } from '../lib/utils';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import ProductOverviewCard from '../components/product/ProductOverviewCard';
import ProductPurchaseCard from '../components/product/ProductPurchaseCard';
import ProductReviews from '../components/product/ProductReviews';
import Meta from '../components/Meta';

const ProductPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  const {
    data: product,
    isLoading: isLoading,
    isError,
    error,
  } = useGetProductDetailsQuery(String(productId));

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Message variant="danger">{getErrorMessage(error)}</Message>;
  }

  return (
    product && (
      <>
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ProductOverviewCard product={product} />
          </Col>
          <Col md={3}>
            <ProductPurchaseCard product={product} />
          </Col>
        </Row>
        <Row className="review">
          <Col md={6}>
            <ProductReviews product={product} />
          </Col>
          <Col md={6}>
            <Button onClick={() => navigate(-1)} className="btn btn-light my-3">
              Go Back
            </Button>
          </Col>
        </Row>
        <Meta title={product.name} />
      </>
    )
  );
};

export default ProductPage;
