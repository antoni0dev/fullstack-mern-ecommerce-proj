import { Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/product/Product';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import { getErrorMessage } from '../lib/utils';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import SearchBar from '../components/SearchBar';
import { PATHS } from '../lib/constants';
import ProductCarousel from '../components/product/ProductCarousel';

const HomePage = () => {
  const { pageNumber = 1, keyword = '' } = useParams();

  const {
    data: { products = [], pages = 1, page = 1 } = {},
    isError,
    error,
    isLoading,
  } = useGetProductsQuery({ pageNumber: Number(pageNumber), keyword });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <>
          <Suspense
            fallback={
              <div style={{ minHeight: '1000px' }}>
                <Loader />
              </div>
            }
          >
            {!keyword && <ProductCarousel />}
          </Suspense>
          <h1>Latest Products</h1>
          <SearchBar />
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
          {keyword && (
            <Link to={PATHS.root} className="btn btn-light mb-4">
              Go home
            </Link>
          )}
        </>
      )}
    </>
  );
};

export default HomePage;
