import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { usePostQuery } from '../slices/post_api';
import { Container, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDeletePostMutation } from '../slices/post_api';

const Post = () => {
  const [message, set_message] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const { user_info } = useSelector((state) => state.auth);

  const { data, isLoading, error } = usePostQuery({
    token: user_info?.token,
    id,
  });

  const [deletePost] = useDeletePostMutation();

  const delete_post = async () => {
    try {
      await deletePost({ token: user_info.token, id }).unwrap();
      navigate('/');
    } catch (err) {
      set_message(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    }
  }, [user_info, navigate]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {message && <Message variant="danger">{message}</Message>}
          <PostCard post={data} />
          <div className="d-flex mt-2 justify-content-center">
            <Button
              variant="primary"
              className="me-2"
              onClick={() => navigate(`/post/${data._id}/edit`)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => delete_post()}>
              Delete
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Post;
