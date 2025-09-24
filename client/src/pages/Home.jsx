import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Container, Card, Row, Col, Stack } from 'react-bootstrap';
import { BsBookmark, BsChat, BsShare } from 'react-icons/bs';
import { Link } from 'react-router';

const Landing = () => {
  const { user_info } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    }
  }, [user_info, navigate]);

  return (
    <Container>
      <Stack gap={5}>
        <Card className="sm-w-100 md-w-50 m-auto" md={12}>
          <Card.Body>
            <Card.Text style={{ marginBottom: '2rem' }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Row>
              <Col>
                <Card.Link as={Link}>
                  <BsBookmark size="1.5em" />
                </Card.Link>
              </Col>
              <Col>
                <Card.Link as={Link}>
                  <BsChat size="1.5em" />
                </Card.Link>
              </Col>
              <Col>
                <Card.Link as={Link}>
                  <BsShare size="1.5em" />
                </Card.Link>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
};

export default Landing;
