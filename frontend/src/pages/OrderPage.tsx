import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetOrderQuery } from '../slices/ordersApiSlice';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { OnApproveActions } from '@paypal/paypal-js/types/components/buttons';
import { toast } from 'react-toastify';
import {
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApiSlice';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import { getErrorMessage } from '../lib/utils';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { ResetOptionsAction, SetLoadingStatusAction } from '../lib/@types';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectUserInfo } from '../slices/authSlice';

const OrderPage = () => {
  const userInfo = useSelector(selectUserInfo);
  const { orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading,
    isError,
    error,
  } = useGetOrderQuery(orderId!);

  const [payOrder, { isLoading: isLoadingPayment }] = usePayOrderMutation();
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const {
    data: paypal,
    isLoading: isLoadingPaypal,
    error: errorPaypal,
  } = useGetPaypalClientIdQuery({});
  const [deliverOrder, { isLoading: isLoadingDeliver }] =
    useDeliverOrderMutation();

  // trigger the paypal script
  useEffect(() => {
    const loadPaypalScript = async () => {
      if (paypal && paypal.clientId) {
        const action: ResetOptionsAction = {
          type: 'resetOptions',
          value: {
            clientId: paypal.clientId,
            currency: 'USD',
          },
        };
        paypalDispatch(action);

        const loadingStatusAction: SetLoadingStatusAction = {
          type: 'setLoadingStatus',
          value: {
            state: 'pending',
            message: 'PayPal script is loading',
          },
        };
        paypalDispatch(loadingStatusAction);
      }
    };

    if (!errorPaypal && !isLoadingPaypal) {
      loadPaypalScript();
    }

    if (order && !order.isPaid && !window.paypal) {
      loadPaypalScript();
    }
  }, [errorPaypal, isLoadingPaypal, paypal, paypalDispatch, order]);

  const onApprove = async (
    _: any,
    actions: OnApproveActions
  ): Promise<void> => {
    if (actions.order) {
      const details = await actions.order.capture();
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('Payment successful!');
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    } else {
      throw new Error('Order actions missing.');
    }
  };

  const onError = (err: any) => {
    toast.error(getErrorMessage(err));
  };

  const createOrder = (_: any, actions: any): Promise<string> => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order ? String(order.totalPrice) : '0',
          },
        },
      ],
    });
  };

  const deliverOrderHandler = async (orderId: string) => {
    try {
      await deliverOrder(orderId);
      refetch();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant='danger'>{getErrorMessage(error)}</Message>
  ) : (
    order && (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup>
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>
                <p>
                  <strong>Address: </strong>{' '}
                  {order.shippingAddress.streetAddress}{' '}
                  {order.shippingAddress.city}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <Message variant='success'>
                    The order has been paid using {order.paymentMethod} at{' '}
                    {order.paidAt}
                  </Message>
                ) : (
                  <Message variant='danger'>Not paid yet</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed()}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isLoadingPayment && <Loader />}
                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        />
                      </div>
                    )}
                  </ListGroup.Item>
                )}
                {isLoadingDeliver && <Loader />}
                {userInfo?.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroupItem>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={() => deliverOrderHandler(orderId || '')}
                    >
                      Mark as Delivered
                    </Button>
                  </ListGroupItem>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  );
};

export default OrderPage;
