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

  useEffect(() => {
    // Load user data from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user]);

  let result = movies.filter(
    (movie) => user && user.FavoriteMovies.includes(movie.id)
  );

  if (result.length === 0) {
    return (
      <Container>
        <Row className="justify-content-center mt-5">
          <Col xs={12} sm={10} md={8} lg={6}>
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
