import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useCreatePostMutation } from '../slices/post_api';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import Message from '../components/Message';

const CreatePost = () => {
  const [text, set_text] = useState('');
  const [error, set_error] = useState('');

  const navigate = useNavigate();

  const { user_info } = useSelector((state) => state.auth);

  const [createPost, { isLoading }] = useCreatePostMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      await createPost({
        token: user_info.token,
        text,
      }).unwrap();
      navigate('/');
    } catch (err) {
      set_error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={submit_handler}>
        {error && <Message variant="danger">{error}</Message>}
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

export default CreatePost;
