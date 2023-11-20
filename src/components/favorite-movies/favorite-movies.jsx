import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "../movie-card/movie-card.scss";

//creates an array with all the movies

export const FavoriteMovies = ({ user, token, setUser, movies }) => {
  console.log(movies);
  // seems to work fine
  console.log(user);
  // seems to work fine
  console.log(user.FavoriteMovies);
  // undefined sometimes, but sometimes it works fine, (when i am not connected with server?)
  user = JSON.parse(user);
  //user.FavoriteMovie = user.FavoriteMovies;
  let result = movies.filter((movie) => user.FavoriteMovies.includes(movie.id));

  if (result.length === 0) return <p>You have no favorite movies yet!</p>;

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
