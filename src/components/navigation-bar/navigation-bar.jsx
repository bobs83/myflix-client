import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="lg"
      fixed="top"
      className="shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user ? (
              // Links for authenticated users
              <>
                <Nav.Link as={Link} to="/" className="text-secondary">
                  Home 🏠
                </Nav.Link>
                <Nav.Link as={Link} to="/profile" className="text-secondary">
                  Profile 🔐
                </Nav.Link>
                <Nav.Link as={Link} to="/favorites" className="text-secondary">
                  Favorite Movies ❣️
                </Nav.Link>
                <Button
                  variant="btn btn-sm btn-outline-secondary"
                  onClick={onLoggedOut}
                >
                  Logout
                </Button>
              </>
            ) : (
              // Links for unauthenticated users
              <>
                <Nav.Link as={Link} to="/login" className="text-secondary">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="text-secondary">
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
