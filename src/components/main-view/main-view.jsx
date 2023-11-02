import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    fetch("https://mybestflix-9620fb832942.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        console.log("Movies from API :", data);
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
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.id !== selectedMovie.id && movie.genre === selectedMovie.genre
      );
    });
    return (
      <>
        <MovieView
          movie={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  }

  return (
    <div>
      {movies.map((movie) => {
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        );
      })}
    </div>
  );
};
