import {
  BsHandThumbsUp,
  BsChat,
  BsShare,
  BsHandThumbsUpFill,
} from 'react-icons/bs';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router';
import { useLikeMutation } from '../slices/post_api';
import { useSelector } from 'react-redux';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const { user_info } = useSelector((state) => state.auth);

  const [like] = useLikeMutation();

  const like_post = async () => {
    await like({ token: user_info.token, id: post._id });
  };

  return (
    <Row className="justify-content-center">
      <Col className="col-sm-12 col-lg-8 col-xl-6">
        <Card>
          <Card.Body>
            <Card.Text
              style={{ marginBottom: '2rem', cursor: 'pointer' }}
              onClick={() => navigate(`/post/${post._id}`)}
            >
              {post.text}
            </Card.Text>
            <Row>
              <Col>
                <Card.Link as={Link} onClick={like_post}>
                  {post.likes.includes(user_info._id) ? (
                    <BsHandThumbsUpFill size="1.5rem" />
                  ) : (
                    <BsHandThumbsUp size="1.5em" />
                  )}
                </Card.Link>
                {post.likes.length > 0 && (
                  <Badge pill>{post.likes.length} </Badge>
                )}
              </Col>
              <Col>
                <Card.Link as={Link} to={`/post/${post._id}`}>
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

export default PostCard;
