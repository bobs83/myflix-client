import React from "react";
import "./movie-card.scss";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="cards-layout">
      <div className="card-container" onClick={() => onMovieClick(movie)}>
        <div className="card-image">
          <img src={movie.imageURL} alt={movie.title} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
          <p className="card-text">{movie.description}</p>
          <button
            className="card-button"
            onClick={(e) => {
              e.stopPropagation();
              onMovieClick(movie);
            }}
          ></button>
        </div>
      </div>
    </div>
  );
};
