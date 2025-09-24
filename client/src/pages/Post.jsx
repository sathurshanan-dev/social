import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

const Post = () => {
  const [text, set_text] = useState();

  const submit_handler = (event) => {
    event.preventDefault();
    
  };

  return (
    <FormContainer>
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="bio" className="my-2">
          <Form.Label className='text-center my-3'>Create Post</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Write your post content here..."
            rows={12}
            alue={text}
            onChange={(event) => set_text(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Post</Button>
      </Form>
    </FormContainer>
  );
};

export default Post;
