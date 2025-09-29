import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';
import { usePostQuery } from '../slices/post_api';

const Post = () => {
  const { id } = useParams();

  const { user_info } = useSelector((state) => state.auth);

  const { data, isLoading, error } = usePostQuery({
    token: user_info.token,
    id,
  });
  console.log(data);

  return <h1>Post page</h1>;
};

export default Post;
