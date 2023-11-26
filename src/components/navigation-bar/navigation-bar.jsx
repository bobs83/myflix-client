import React, { useState } from "react";
import { Link } from "react-router-dom";
import {SearchView } from "../search-view/search-view
import {
  Navbar,
  Nav,
  Container,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserLock,
  faHeart,
  faSignInAlt,
  faUserPlus,
  faSignOutAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import "../navigation-bar/navigation-bar.scss";

export const NavigationBar = ({ user, handleSearch, onLoggedOut }) => {
	
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
                <Nav.Link
                  as={Link}
                  to="/"
                  className="text-secondary nav-link-hover"
                >
                  <FontAwesomeIcon icon={faHome} className="navbar-icon" /> Home
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/profile"
                  className="text-secondary nav-link-hover"
                >
                  <FontAwesomeIcon icon={faUserLock} className="navbar-icon" />{" "}
                  Profile
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/favorites"
                  className="text-secondary nav-link-hover"
                >
                  <FontAwesomeIcon icon={faHeart} className="navbar-icon" />{" "}
                  Favorite Movies
                </Nav.Link>
              </>
            ) : (
              // Links for unauthenticated users
              <>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className="text-secondary nav-link-hover"
                >
                  <FontAwesomeIcon icon={faSignInAlt} className="navbar-icon" />{" "}
                  Login
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/signup"
                  className="text-secondary nav-link-hover"
                >
                  <FontAwesomeIcon icon={faUserPlus} className="navbar-icon" />{" "}
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
          {user && (
           <SearchView onSearch={handleSearch} />
          )}
          {user && (
            <Button
              variant="btn btn-sm btn-outline-secondary logout-button"
              onClick={onLoggedOut}
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="navbar-icon" />{" "}
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
