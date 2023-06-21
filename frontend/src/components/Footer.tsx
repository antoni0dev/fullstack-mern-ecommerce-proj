import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currYear = new Date().getFullYear();

  return (
    <Container>
      <Row>
        <Col className="text-center py-3">
          <p>ProShop &copy; {currYear}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
