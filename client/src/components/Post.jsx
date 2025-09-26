import { BsHandThumbsUp, BsChat, BsShare } from 'react-icons/bs';
import { Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

const Post = ({ post }) => {
  return (
    <Row className="justify-content-center">
      <Col className="col-sm-12 col-lg-8 col-xl-6">
        <Card>
          <Card.Body>
            <Card.Text style={{ marginBottom: '2rem' }}>{post.text}</Card.Text>
            <Row>
              <Col>
                <Card.Link as={Link}>
                  <BsHandThumbsUp size="1.5em" />
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
      </Col>
    </Row>
  );
};

export default Post;
