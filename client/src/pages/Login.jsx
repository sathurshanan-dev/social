import { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/users_api';
import { set_login } from '../slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router';
import Message from '../components/Message';

const Login = () => {
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const [login, { isLoading }] = useLoginMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(set_login({ ...res.data }));
      navigate('/');
    } catch (err) {
      set_error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user_info) {
      navigate('/');
    }
  }, [user_info, navigate]);

  return (
    <FormContainer>
      <h1 className="text-center">Sign in</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="email" className="my-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(event) => set_email(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => set_password(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="w-100"
          disabled={isLoading}
        >
          Continue
        </Button>
      </Form>
      <hr />
      <Row className="py-3">
        <Col className="text-center">
          New to Social? <Link to="/register">Create account</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;
