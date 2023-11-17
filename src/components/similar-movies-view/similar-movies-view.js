import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../movie-card/movie-card.scss";
import { useParams } from "react-router";

export function SimilarMoviesView({ movies }) {
  const { movieId } = useParams();
  const selectedMovie = movies.find((item) => item.id === movieId);

  let SimilarMovies = movies.filter(
    (movie) => movie.id !== movieId && movie.genre === selectedMovie.genre
  );

  return (
    <Row>
      <Col md={12}>
        <hr />
        <h2 className="mb-3">Similar Movies</h2>
      </Col>

      <Row className="justify-content-md-center">
        {SimilarMovies.map((movie) => (
          <Col
            key={movie.id}
            xs={12}
            sm={10}
            md={6}
            lg={4}
            xl={3}
            className="mb-5"
          >
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Row>
  );
}
