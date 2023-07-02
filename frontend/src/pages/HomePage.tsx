import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { ProductType } from '../lib/@types';
import axios from 'axios';
import { getAllProducts } from '../services/products';

const HomePage = () => {
  const [products, setProducts] = useState<ProductType[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(await getAllProducts());
    };

    fetchProducts();
  });

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products?.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomePage;
