import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
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
    <Card>
      <div className="image-container">
        <Card.Img
          variant="top"
          src={movie.imageURL}
          alt={movie.title}
          className="card-img-top"
        />

        <div className="overlay-content">
          <Link
            to={`/movies/${encodeURIComponent(movie.id)}`}
            className="text-decoration-none"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="movie-description">{movie.description}</div>
          </Link>
        </div>
      </div>

      <Card.Body className="position-relative">
        {/* <div className="body-overlay">
            {!isFavorite ? (
							 
            //   <AddFavorite /> // onClick={(() => alert("Nice you added a movie!"), addFavoriteMovie)
            // ) : (
            //   <RemoveFavourite /> //onClick={(() => alert("Nice you removed a movie!"), removeFavoriteMovie)
            // )}
          </div> */}
        <Card.Title>{movie.title}</Card.Title>
        <span className="badge rounded-pill text-bg-primary movie-info mb-1">
          {movie.genre} | IMDB {movie.rate} | Year {movie.release}
        </span>
        {!isFavorite ? (
          <Button
            className="btn btn-light btn-sm d-flex align-items-center gap-2 smaller-button"
            onClick={addFavoriteMovie}
          >
            Add to
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12" // Further reduced size
              height="12" // Further reduced size
              fill="currentColor"
              class="bi bi-heart-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
              />
            </svg>
          </Button>
        ) : (
          <Button
            type="button"
            className="btn btn-light btn-sm d-flex align-items-center gap-2 smaller-button"
            onClick={removeFavoriteMovie}
          >
            Remove
            <svg
              width="12" // Further reduced size
              height="12" // Further reduced size
              viewBox="0 0 16 16"
              className="bi bi-x-square"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                fillRule="evenodd"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Button>
        )}
      </Card.Body>
    </Card>
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
