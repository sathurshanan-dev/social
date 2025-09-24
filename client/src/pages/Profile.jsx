import { useEffect, useState } from 'react';
import FormContainer from '../components/FormContainer';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useProfileMutation } from '../slices/users_api';
import { set_login } from '../slices/auth';

const Profile = () => {
  const [name, set_name] = useState('');
  const [bio, set_bio] = useState('');
  const [email, set_email] = useState('');
  const [username, set_username] = useState('');
  const [password, set_password] = useState('');
  const [err, set_err] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { user_info } = useSelector((state) => state.auth);

  const [update_profile, { isLoading }] = useProfileMutation();

  const submit_handler = async (event) => {
    event.preventDefault();
    try {
      const res = await update_profile({
        token: user_info.token,
        data: {
          name,
          email,
          password,
          username,
          bio,
        },
      }).unwrap();
      dispatch(set_login({ ...res }));
    } catch (error) {
      set_err(error?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (!user_info) {
      navigate('/login');
    } else {
      set_name(user_info.name);
      set_email(user_info.email);
      set_username(user_info.username);
      set_bio(user_info.bio);
    }
  }, [
    user_info,
    navigate,
    user_info.name,
    user_info.email,
    user_info.username,
    user_info.bio,
  ]);

  return (
    <FormContainer>
      <h1 className="text-center">@{user_info.username}</h1>
      <Form onSubmit={submit_handler}>
        <Form.Group controlId="name" className="my-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(event) => set_name(event.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="bio" className="my-2">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            value={bio}
            onChange={(event) => set_bio(event.target.value)}
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
        <Form.Group controlId="username" className="my-2">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(event) => set_username(event.target.value)}
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
          Save
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Profile;
