import { useEffect, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useRegisterMutation } from '../slices/users_api';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import { set_login } from '../slices/auth';

const Register = () => {
  const [name, set_name] = useState('');
  const [email, set_email] = useState('');
  const [password, set_password] = useState('');
  const [error, set_error] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation({
    name,
    email,
    password,
  });

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await register({ name, email, password });
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
      <h1 className="text-center">Create your account</h1>
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => set_name(event.target.value)}
          ></Form.Control>
        </Form.Group>
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
          Create
        </Button>
      </Form>
      <hr />
      <Row className="py-3">
        <Col className="text-center">
          Already have an account? <Link to="/login">Sign in</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
