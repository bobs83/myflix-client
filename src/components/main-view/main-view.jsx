import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { FavoriteMovies } from "../favorite-movies/favorite-movies";
import { AddFavorite } from "../add-favorite/add-favorite";
import { MovieCarousel } from "../movie-carousel/movie-carousel";
import { SearchView } from "../search-view/search-view";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  //Keeps stored information for user with localStorage
  const storedToken = localStorage.getItem("token");
  const storedUser = JSON.parse(localStorage.getItem("user")); //added this one!

  //state put movies from API into an array
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  //const parseUser = JSON.parse(storedUser)
  //const [user, setUser] = useState(storedUser ? parseUser : null); / What happining here?

  //keeps track of tokens once a user logs in and stores it in storedToken state
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const onLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const handleSearch = (search, movies) => {
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  useEffect(() => {
    if (!token) return; // Do not proceed if there's no token
    axios
      .get("https://mybestflix-9620fb832942.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("Movies from API:", response.data);
        const moviesFromApi = response.data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            imageURL: movie.ImageURL,
            description: movie.Description,
            year: movie.Year,
            rate: movie.Rate,
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
  }, [token, user]);

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
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          {/* Route for viewing a specific movie */}
          <Route
            path="/movies/:movieId"
            // worked partly when i change the name to anything elese but movieID - can can see the movie_id change in params but the page is stuck star wars episode V fo rall movies
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
                  <Col md={12}>
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
                    <MovieCarousel movies={movies} />
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
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <Row>
                      <ProfileView
                        user={user}
                        token={token}
                        setUser={setUser}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/favorites"
            element={
              <>
                {!user ? (
                  // If no user is logged in, redirect to the login page
                  <Navigate to="/login" replace />
                ) : (
                  // If a user is logged in, display the FavoriteMovies component
                  <FavoriteMovies
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies}
                  />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
