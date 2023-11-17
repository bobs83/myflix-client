import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "./login-view.scss";

import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";

import axios from "axios";
//was not able to insert axios

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch(
      "https://mybestflix-9620fb832942.herokuapp.com/login?Username=" +
        username +
        "&Password=" +
        password,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json(); // parse JSON from the response
      })
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert("No such user");
        }
      })
      .catch((e) => {
        alert("Something went wrong");
      });
  };

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <Form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            <h1>Welcome to MyFlix</h1>
            <h6>To get started, please sign in</h6>
          </div>

          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3 password-group">
            <div className="password-container">
              <Form.Control
                type={type}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span onClick={handleToggle} className="password-icon">
                <Icon icon={icon} size={20} />
              </span>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            Sign In
          </Button>

          <div className="text-center">
            {/* <Link to="/forgot-password" className="text-decoration-none me-2">
              Forgot password?
            </Link> */}
            <Link to="/signup" className="text-decoration-none">
              Don't have an account?
            </Link>
          </div>
        </Form>
      </Row>
    </Container>
  );
};
