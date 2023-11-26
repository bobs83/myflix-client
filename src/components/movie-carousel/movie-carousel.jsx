import React from "react";
import { Carousel } from "react-bootstrap";
import "./movie-carousel.scss";

export const MovieCarousel = ({ movies }) => {
  // Set the interval duration in milliseconds (e.g., 3000 for 3 seconds)
  const intervalDuration = 3000;

  return (
    <Carousel>
      {movies.map((movie, index) => (
        <Carousel.Item key={index} interval={intervalDuration}>
          <img
            className="d-block w-100"
            src={movie.imageURL}
            alt={movie.title}
          />
          <Carousel.Caption>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
