import React from "react";
import { SimilarMoviesView } from "../similar-movies-view/similar-movies-view";
import { Row, Col, Container } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
  const { movieID } = useParams();
  const movie = movies.find((movie) => movie._id === movieID);

  console.log(movieID);
  //undefined

  return (
    <Container>
      <Row className="my-5">
        <Col md={6} className="mb-3">
          <img
            src={movie.imageURL}
            alt={`Poster of ${movie.title}`}
            className="movie-poster img-fluid"
          />
        </Col>
        <Col md={6}>
          <h1 className="mb-3">{movie.title}</h1>
          <p className="text-muted">{movie.description}</p>
          <p className="mt-4">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p>
            <strong>Director:</strong> {movie.director.name}
          </p>
          <p className="text-muted">{movie.director.bio}</p>
        </Col>
        <Col md={12} className="mb-2">
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={`/`}>
              <button className="btn btn-primary">Back</button>
            </Link>
          </div>
        </Col>
        <SimilarMoviesView movies={movies} />
      </Row>
    </Container>
  );
};
