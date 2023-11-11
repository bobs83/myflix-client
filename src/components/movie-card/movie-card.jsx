import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      className="text-decoration-none"
    >
      <Card>
        <Card.Img variant="top" src={movie.imageURL} alt={movie.title} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          {/* <div>
            <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
              <Button variant="primary">See more</Button>
            </Link>
          </div> */}
        </Card.Body>
      </Card>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageURL: PropTypes.string,
  }).isRequired,
};
