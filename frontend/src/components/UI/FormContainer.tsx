import { FC, PropsWithChildren } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
