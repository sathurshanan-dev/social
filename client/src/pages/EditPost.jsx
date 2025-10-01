import { usePostQuery, useEditPostMutation } from '../slices/post_api';
import { useParams, useNavigate } from 'react-router';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useSelector } from 'react-redux';
import { Container, Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useState, useEffect } from 'react';

const EditPost = () => {
  const [text, set_text] = useState('');
  const [message, set_message] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const { user_info } = useSelector((state) => state.auth);

  const { data, isLoading, error } = usePostQuery({
    token: user_info?.token,
    id,
  });

  const [editPost, { isLoading: isEditLoading }] = useEditPostMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await editPost({ token: user_info.token, id, text }).unwrap();
    } catch (error) {
      set_message(error?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    } else if (data) {
      set_text(data.text);
    }
  }, [user_info, data, navigate, data.text]);

  return (
    <Container>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <FormContainer>
          <Form onSubmit={submit_handler}>
            {error && <Message variant="danger">{error}</Message>}
            {message && <Message variant="danger">{message}</Message>}
            <Form.Group controlId="bio" className="my-2">
              <Form.Label className="text-center my-3">Edit Post</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Write your post content here..."
                rows={12}
                value={text}
                onChange={(event) => set_text(event.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button disabled={isEditLoading} type="submit">
              Save
            </Button>
          </Form>
        </FormContainer>
      )}
    </Container>
  );
};

export default EditPost;
