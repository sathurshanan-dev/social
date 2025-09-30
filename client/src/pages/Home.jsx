import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Container } from 'react-bootstrap';
import { usePostsQuery } from '../slices/post_api';
import { Stack } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import PostCard from '../components/PostCard';

const Landing = () => {
  const { user_info } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const { data, isLoading, error } = usePostsQuery({ token: user_info?.token });

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
        <Stack gap={5}>
          {data.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </Stack>
      )}
    </Container>
  );
};

export default Landing;
