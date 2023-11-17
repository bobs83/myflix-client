import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { AddFavorite } from "../AddFavorite/Addfavorite";

export const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movies/${encodeURIComponent(movie.id)}`}
      className="text-decoration-none"
    >
      <Card>
        <div className="image-container">
          <Card.Img
            variant="top"
            src={movie.imageURL}
            alt={movie.title}
            className="card-img-top"
          />
          <div className="overlay-content">
            <div className="movie-description">
              {movie.description} {/* Add the movie description here */}
            </div>
          </div>
        </div>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <span className="badge rounded-pill text-bg-light">
            {movie.genre} | IMDB {movie.rate} | Year {movie.release}
          </span>
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
