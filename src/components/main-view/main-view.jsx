import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
//import { SimilarMoviesView } from "../similar-movies-view/similar-movies-view";

export const MainView = () => {
  const storedUser = localStorage.getItem("user"); //works as as it should
  const storedToken = localStorage.getItem("token");

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
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
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.clear();
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          {/* Route for /signup */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  // If a user is already logged in, redirect to the home page
                  <Navigate to="/" />
                ) : (
                  // If no user is logged in, display the SignupView component
                  <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for /login */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  // If a user is already logged in, redirect to the home page
                  <Navigate to="/" />
                ) : (
                  // If no user is logged in, display the LoginView component
                  <Col xs={12} sm={8} md={6} lg={4} className="mx-auto">
                    <LoginView onLoggedIn={(user) => setUser(user)} />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for viewing a specific movie */}
          <Route
            path="/movies/:movie_Id"
            element={
              <>
                {!user ? (
                  // If no user is logged in, redirect to the login page
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  // If there are no movies, display a message
                  <Col>The list is empty!</Col>
                ) : (
                  // If movies are available, display the MovieView component
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for the home page */}
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  // If no user is logged in, redirect to the login page
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  // If there are no movies, display a message
                  <Col>The list is empty!</Col>
                ) : (
                  // Display a list of movies using the MovieCard component
                  <>
                    {movies.map((movie) => (
                      <Col
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-3"
                        key={movie.id}
                      >
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
