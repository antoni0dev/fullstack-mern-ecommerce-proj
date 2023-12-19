import { FC } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { PATHS } from '../../lib/constants';

interface CheckoutStepsProps {
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
}

const stepsMapping: {
  step: keyof CheckoutStepsProps;
  path: string;
  name: string;
}[] = [
  { step: 'step1', path: PATHS.login, name: 'Sign In' },
  { step: 'step2', path: PATHS.shipping, name: 'Shipping' },
  { step: 'step3', path: PATHS.payment, name: 'Payment' },
  { step: 'step4', path: PATHS.placeOrder, name: 'Checkout' },
];

const CheckoutSteps: FC<CheckoutStepsProps> = ({
  step1,
  step2,
  step3,
  step4,
}) => {
  const stepsProps = { step1, step2, step3, step4 };

  return (
    <Nav className='justify-content-center mb-4'>
      {stepsMapping.map(({ step, path, name }) => (
        <Nav.Item key={step}>
          {stepsProps[step] ? (
            <LinkContainer to={path}>
              <Nav.Link>
                <p style={{ fontWeight: 'bold' }}>{name}</p>
              </Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>{name}</Nav.Link>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
};

export default CheckoutSteps;
