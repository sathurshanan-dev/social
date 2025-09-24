import { Link } from 'react-router';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../slices/auth';

const Header = () => {
  const { user_info } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout_handler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" className="shadow-sm p-3 mb-5" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Social
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user_info ? (
                <>
                  <Nav.Link as={Link} to="/new">
                    <Button>Create Post</Button>
                  </Nav.Link>
                  <NavDropdown title={user_info.username} id="username">
                    <NavDropdown.Item as={Link} to={`/${user_info.username}`}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logout_handler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <Button>Sign in</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <Button variant="outline-primary">Create account</Button>
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
