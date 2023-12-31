import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../movie-card/movie-card.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

//creates an array with all the movies

export const FavoriteMovies = ({ token, movies }) => {
  const [user, setUser] = useState(null);
  const storedUser = localStorage.getItem("user");

  useEffect(() => {
    // Load user data from local storage

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []); // Only run once on page load (empty array of dependencies)

  // I want the view to update imeediately after a movie has been deleted from the favorites list???

  let result = movies.filter(
    (movie) => user && user.FavoriteMovies.includes(movie.id)
  );

  if (result.length === 0) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Row className="justify-content-center mt-5">
          <Col>
            <Alert variant="info" className="text-center py-4">
              <FontAwesomeIcon icon={faFilm} size="3x" className="mb-3" />
              <h4>You have no favorite movies yet!</h4>
            </Alert>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h2 className="favorite-title">Favorite Movies</h2>
            <hr />
          </Col>
        </Row>
        <Row className="justify-content-center">
          {result.map((movie) => (
            <Col className="mb-4" key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movie={movie}
                user={user}
                token={token}
                setUser={setUser}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};
