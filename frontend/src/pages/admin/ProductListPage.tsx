import { Button, Col, Row, Table } from 'react-bootstrap';
import Loader from '../../components/UI/Loader';
import Message from '../../components/UI/Message';
import { toast } from 'react-toastify';
import { getErrorMessage } from '../../lib/utils';
import {
  useCreateProductMutation,
  useGetProductsQuery,
} from '../../slices/productsApiSlice';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDeleteProductMutation } from '../../slices/productsApiSlice';
import { useParams } from 'react-router-dom';

const ProductListPage = () => {
  const { pageNumber = 1 } = useParams();

  const {
    data: { products = [] } = {},
    isLoading,
    error,
    refetch,
  } = useGetProductsQuery({ pageNumber: Number(pageNumber) });

  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const [createProduct, { isLoading: isCreateProductLoading }] =
    useCreateProductMutation();

  const handleCreateProduct = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct({}).unwrap();
        refetch();
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId).unwrap();
      refetch();
      toast.success('Product deleted!');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{getErrorMessage(error)}</Message>
  ) : (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button onClick={handleCreateProduct} className="btn-sm m-3">
            {isCreateProductLoading ? (
              <Loader />
            ) : (
              <>
                <FaEdit /> Create Product
              </>
            )}
          </Button>
        </Col>
      </Row>
      <Table striped hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY1</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/edit-product/${product._id}`}>
                  <Button variant="light" className="btn-sm">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => handleDeleteProduct(product._id)}
                >
                  {isDeleteProductLoading ? (
                    <Loader />
                  ) : (
                    <FaTrash style={{ color: '#f5f5f5' }} />
                  )}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListPage;
