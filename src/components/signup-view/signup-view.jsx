import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup-view.scss";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate(); // Define the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    axios
      .post("https://mybestflix-9620fb832942.herokuapp.com/users", data)
      .then((response) => {
        // Log the entire response to see its structure
        console.log("Response from server:", response);

        // Check if the response contains a message and display it
        const successMessage = response.data.message || "Signup successful";
        alert(successMessage);
        navigate("/login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <div className="text-center mb-4">
          <h1>Unlock Your Access</h1>
          <h6>A few quick details and you're in</h6>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSignupUsername" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formSignupPassword" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="4"
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formSignupEmail" className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-3"
            />
          </Form.Group>

          <Form.Group controlId="formSignupBirthday" className="mb-4">
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="mb-3"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            SIGN UP
          </Button>

          <Button
            variant="secondary"
            className="w-100"
            onClick={() => navigate("/login")}
          >
            CANCEL
          </Button>
        </Form>
      </Row>
    </Container>
  );
};
