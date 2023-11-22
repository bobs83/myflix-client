import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";
import { AddFavorite } from "../add-favorite/add-favorite";
import { RemoveFavourite } from "../remove-favourite/remove-favourite";
import { useEffect, useState } from "react";

export const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie.id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let username = JSON.parse(user).Username;
    alert(JSON.stringify(username));

    fetch(
      `https://mybestflix-9620fb832942.herokuapp.com/users/${username}/movies/${movie.id}`,
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
          localStorage.setItem("user", JSON.stringify(user));
          alert("successfully added to favorites");
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
    console.log(user);
  };

  const removeFavoriteMovie = () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let username = JSON.parse(user).Username;
    alert(JSON.stringify(username));

    fetch(
      `https://mybestflix-9620fb832942.herokuapp.com/users/${username}/movies/${movie.id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          alert("successfully deleted from favorites");
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
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
            {!isFavorite ? (
              <AddFavorite /> // alert("Nice you added a movie!"), onClick={() =>addFavoriteMovie}
            ) : (
              <RemoveFavourite /> // alert("Nice you removed a movie!") onClick={() =>removeFavoriteMovie}
            )}
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

export default MovieCard;

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    imageURL: PropTypes.string,
  }).isRequired,
};
