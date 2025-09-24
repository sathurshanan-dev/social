import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={9} lg={7} xl={5}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
