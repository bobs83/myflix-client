import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./profile-view.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const ProfileView = ({ user, token, setUser, onLoggedOut }) => {
  console.log("User prop in ProfileView:", user);
  console.log(onLoggedOut);
  const [username = "", setUsername] = useState(user.Username);
  const [FavoriteMovies, setFavoriteMovies] = useState(user.FavoriteMovies);
  console.log(user.FavoriteMovies);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday || "");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const navigate = useNavigate(); // Add this line to create the navigate function

  // State to control the visibility of the modal
  const [show, setShow] = useState(false);
  // Function to handle showing the modal
  const handleShowDeleteModal = () => setShow(true);
  // Function to handle closing the modal
  const handleClose = () => setShow(false);

  let data = {
    Username: username,
    Email: email,
    Birthday: birthday,
    FavoriteMovies: FavoriteMovies,
  };

  let birth = new Date(birthday);
  let birthString = birth.toLocaleDateString("sv-SE", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  console.log(data);

  if (password) {
    data["Password"] = password;
  }

  console.log("Token:", token);
  // Function to handle the delete action
  const handleDelete = () => {
    axios
      .delete(
        `https://mybestflix-9620fb832942.herokuapp.com/users/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.ok) {
          // Update the user state to reflect that they're no longer logged in
          setUser(null);
          // Display a success message
          alert("Your account has been deleted");
          // Redirect to the sign-in page
          onLoggedOut = () => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          };
        } else {
          alert("Something went wrong.");
        }
      });
    handleClose(); // Close the modal after deletion
  };

  // note to self /// You should check the server-side code to verify if the password field is indeed marked as required for profile update requests.

  const handleUpdate = (event) => {
    event.preventDefault();
    // Check if any form field has changed
    if (
      username === user.Username &&
      email === user.Email &&
      birthday === user.Birthday &&
      !password
    ) {
      alert("No changes detected in the profile.");
      return; // Stop the function here
    }

    axios
      .put(
        `https://mybestflix-9620fb832942.herokuapp.com/users/${username}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(async (response) => {
        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setFeedbackMessage("Profile updated successfully!");
      })
      .catch((error) => {
        const errorMsg = error.response.data;
        setFeedbackMessage(`Update failed: ${errorMsg}`);
      });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Row>
        <h2 className="text-center mb-4">Update Profile</h2>

        {feedbackMessage && <Alert variant="info">{feedbackMessage}</Alert>}

        <Form onSubmit={handleUpdate}>
          <Form.Group as={Row} className="mb-3" controlId="formUpdateUsername">
            <Form.Label column sm={2}>
              Username
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Enter username"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength="3"
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2" controlId="formUpdatePassword">
            <Form.Label column sm={2}>
              Password
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="password"
                placeholder="Enter new password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="4"
              />
              <Form.Text className="text-muted">
                Leave blank if you do not wish to change the password.
              </Form.Text>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formUpdateEmail">
            <Form.Label column sm={2}>
              Email
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formUpdateBirthday">
            <Form.Label column sm={2}>
              Birthday
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="date"
                value={birthString}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-3">
            UPDATE
          </Button>

          <Button
            variant="secondary"
            className="w-100 mb-4"
            onClick={() => navigate("/")}
          >
            CANCEL
          </Button>

          <hr />

          <Button
            variant="danger"
            className="w-100"
            onClick={handleShowDeleteModal}
          >
            REMOVE
          </Button>
        </Form>
      </Row>
      {/* Delete Confirmation Modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-icon-container">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="modal-icon"
            />
            Do you really want to delete these records? This process cannot be
            undone.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
