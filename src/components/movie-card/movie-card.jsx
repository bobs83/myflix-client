import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { AddFavorite } from "../add-favorite/add-favorite";
import { RemoveFavourite } from "../remove-favourite/remove-favourite";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie, token, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://mybestflix-9620fb832942.herokuapp.com/users/${username}${movie.id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          updatedUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
    console.log(user);
  };

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
            <div className="movie-description">{movie.description}</div>
          </div>
        </div>

        <Card.Body>
          <div className="body-overlay">
            <AddFavorite onClick={() => addFavoriteMovie(movie)} />
            {/* <RemoveFavourite /> */}
          </div>
          <Card.Title>{movie.title}</Card.Title>
          <span className="badge rounded-pill text-bg-primary movie-info">
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
