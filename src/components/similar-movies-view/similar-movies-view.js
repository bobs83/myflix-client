import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const SimilarMoviesView = ({ movies, selectedMovie }) => {
  return (
    <Row className="justify-content-md-center">
      <Col md={12}>
        <h2 className="mb-3">Similar Movies</h2>
      </Col>
      {movies
        .filter(
          (movie) =>
            movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre
        )
        .map((movie) => (
          <Col
            key={movie.id}
            xs={12}
            s={10}
            md={6}
            lg={4}
            xl={3}
            className="mb-5"
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
    </Row>
  );
};
