import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Container, Row, Col } from "react-bootstrap";
import { SimilarMoviesView } from "../similar-movies-view/similar-movies-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://mybestflix-9620fb832942.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies from API:", data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            imageURL: movie.ImageURL,
            description: movie.Description,
            actors: movie.Actors,
            genre: movie.Genre.Name,
            director: {
              name: movie.Director.Name,
              bio: movie.Director.Bio,
            },
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <hr />
          <SignupView />
        </Col>
      ) : (
        <>
          {selectedMovie ? (
            <Col md={12}>
              <Row>
                <Col md={12} style={{ border: "0px solid blue" }}>
                  <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                  />
                </Col>
              </Row>
              <Row>
                <hr />
              </Row>
              <Row>
                <Col md={12}>
                  <h2 className="mb-3">Similar Movies</h2>
                </Col>
              </Row>
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
                      s={10}
                      md={6}
                      lg={4}
                      xl={3}
                      className="mb-5"
                    >
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
          ) : (
            //////////////////////////////////////////////
            // <Row>
            // {/* <SimilarMoviesView
            //   movies={movies}
            //   selectedMovie={selectedMovie}
            // /> */}
            // </Row>
            //</Col>
            //////////////////////////////////////////////
            <>
              {movies.length === 0 ? (
                <Col>
                  <div>The movie list is empty!</div>
                </Col>
              ) : (
                <Row>
                  {movies.map((movie) => (
                    <Col
                      key={movie.id}
                      xs={12}
                      s={10}
                      md={6}
                      lg={4}
                      xl={3}
                      className="mb-5"
                    >
                      <MovieCard
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                          setSelectedMovie(newSelectedMovie);
                        }}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          )}
        </>
      )}

      {user && (
        <Col md={12}>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <button
              class="btn btn-secondary"
              onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}
            >
              Logout
            </button>
          </div>
        </Col>
      )}
    </Row>
  );
};
