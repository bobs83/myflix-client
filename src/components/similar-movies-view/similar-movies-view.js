import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const SimilarMoviesView = ({
  movies,
  selectedMovie,
  setSelectedMovie,
}) => {
  return (
    <Row>
      <Col md={12}>
        <hr />
        <h2 className="mb-3">Similar Movies</h2>
      </Col>

      <Row className="justify-content-md-center">
        {movies
          .filter(
            (movie) =>
              movie.id !== selectedMovie.id &&
              movie.genre === selectedMovie.genre
          )
          .map((movie) => (
            <Col
              key={movie.id}
              xs={12}
              sm={10}
              md={6}
              lg={4}
              xl={3}
              className="mb-5"
            >
              <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
      </Row>
    </Row>
  );
};
