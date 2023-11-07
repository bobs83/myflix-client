import PropTypes from "prop-types";
import React from "react";
import "./movie-view.scss";
import { Button, Container, Row, Col } from "react-bootstrap";

function MovieView({ movie, onBackClick }) {
  return (
    <Container>
      <Row className="my-5">
        <Col md={6} className="mb-3">
          <img
            src={movie.imageURL}
            alt={`Poster of ${movie.title}`}
            className="movie-poster img-fluid"
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">{movie.title}</h1>
          <p className="text-muted">{movie.description}</p>
          <p className="mt-4">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.director.name}
          </p>
          <p className="text-muted">{movie.director.bio}</p>
        </Col>
        <Col md={12} className="mb-2">
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button class="btn btn-primary" onClick={onBackClick}>
              Back
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
    }),
  }),
  onBackClick: PropTypes.func.isRequired,
};
export { MovieView };
