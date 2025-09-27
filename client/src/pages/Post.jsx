import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useCreatePostMutation } from '../slices/post_api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Post = () => {
  const [text, set_text] = useState();

  const navigate = useNavigate();

  const { user_info } = useSelector((state) => state.auth);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      await createPost({
        token: user_info.token,
        data: text,
      }).unwrap();
      navigate('/');
    } catch (err) {
      console.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="bio" className="my-2">
          <Form.Label className="text-center my-3">Create Post</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write your post content here..."
            rows={12}
            alue={text}
            onChange={(event) => set_text(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button disabled={isLoading} type="submit">
          Post
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Post;
