import { Form, Button, Col } from 'react-bootstrap';
import FormContainer from '../components/UI/FormContainer';
import CheckoutSteps from '../components/UI/CheckoutSteps';
import { useForm, Controller } from 'react-hook-form';
import Loader from '../components/UI/Loader';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { PATHS } from '../lib/constants';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      paymentMethod: 'Paypal',
    },
    mode: 'onBlur',
  });

  const onSubmit = handleSubmit(async ({ paymentMethod }) => {
    dispatch(savePaymentMethod(paymentMethod));
    navigate(PATHS.placeOrder, { replace: true });
  });

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4={false} />
      <h1>Payment Method</h1>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Form.Check
                  {...field}
                  value="PayPal"
                  className="my-2"
                  type="radio"
                  label="PayPal"
                  id="paypal"
                  checked
                />
              )}
            />
          </Col>
          <Col>
            <Controller
              name="paymentMethod"
              control={control}
              render={({ field }) => (
                <Form.Check
                  {...field}
                  value="Credit Card"
                  className="my-2"
                  type="radio"
                  label="Credit Card"
                  id="creditCard"
                />
              )}
            />
          </Col>
        </Form.Group>
        <Button type="submit" disabled={!isValid} variant="primary">
          {isSubmitting ? <Loader /> : 'Continue'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
