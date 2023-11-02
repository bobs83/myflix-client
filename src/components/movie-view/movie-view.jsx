import PropTypes from "prop-types";
import React from "react";
function MovieView({ movie, onBackClick }) {
  return (
    <div>
      <div>
        <img src={movie.imageURL} style={{ height: "300px", width: "200px" }} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
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
