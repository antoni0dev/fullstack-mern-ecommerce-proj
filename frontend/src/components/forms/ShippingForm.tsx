import FormContainer from "../FormContainer";
import { Button, Form } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { shippingSchema, Shipping } from "../../lib/models/shippingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../slices/cartSlice";
import { RootState } from "../../store";
import CheckoutSteps from "../CheckoutSteps";

const ShippingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const address = useSelector((state: RootState) => state.cart.shippingAddress);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Shipping>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      country: address.country || "",
      city: address.city || "",
      streetAddress: address.streetAddress || "",
      postalCode: address.postalCode || "",
    },
    mode: "onBlur",
  });

  const submitHandler = handleSubmit(async (address) => {
    dispatch(saveShippingAddress(address));
    navigate("/payment", { replace: true });
  });

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3={false} step4={false} />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                {...field}
                placeholder='Enter country'
                isInvalid={!!errors.country}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.country?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-2' controlId='streetAddress'>
          <Form.Label>City</Form.Label>
          <Controller
            name='city'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                {...field}
                placeholder='Enter city'
                isInvalid={!!errors.city}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.city?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-2' controlId='streetAddress'>
          <Form.Label>Street Address</Form.Label>
          <Controller
            name='streetAddress'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                {...field}
                placeholder='Enter street address'
                isInvalid={!!errors.streetAddress}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.streetAddress?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className='my-2' controlId='streetAddress'>
          <Form.Label>Postal Code</Form.Label>
          <Controller
            name='postalCode'
            control={control}
            render={({ field }) => (
              <Form.Control
                type='text'
                {...field}
                placeholder='Enter postal code'
                isInvalid={!!errors.postalCode}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>
            {errors.postalCode?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!isDirty || !isValid}
          type='submit'
          variant='primary'
          className='my-2'
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingForm;

// Guidelines for creating a Form
/* 
    1. Implement the static UI with form and inputs
    2. Connect the form inputs to react-hook-form
    3. Create a validation schema
    4. Handle form submission
*/
