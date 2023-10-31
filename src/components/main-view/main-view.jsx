import React from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Matrix",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51EG732BV3L._SY445_.jpg",
      director: "Lana Wachowski",
      description:
        "In a dystopian world, a computer hacker discovers the world he lives in is a simulated reality, and he is drawn into a rebellion against the machines.",
      genre: "Sci-Fi",
    },
    {
      id: 2,
      title: "Inception",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81p%2Bxe8cbnL._SY445_.jpg",
      director: "Christopher Nolan",
      description:
        "A thief who enters the dreams of others must plant an idea in someone's mind, but his own psychological issues are the biggest obstacle.",
      genre: "Sci-Fi",
    },
    {
      id: 3,
      title: "Lion King",
      image:
        "https://play-lh.googleusercontent.com/sxMhq5US2nRdYrfER_Z_K5RChyifJmKrWIK650KeJW7eqggKkGSNjGHnIsyrIOg-YDfYXg",
      director: "Jon Favreau",
      description:
        "A young lion prince flees his kingdom only to learn the true meaning of responsibility and bravery.",
      genre: "Animation",
    },
    {
      id: 4,
      title: "Life of Pi",
      image:
        "https://play-lh.googleusercontent.com/VisZVoMWqbKt2gv-AskoLmdISKtoXSK2Efci8VZgN3HJR4GEqSlZN_vkonfckEYMKNz9=w480-h960-rw",
      director: "Ang Lee",
      description:
        "A young man survives a disaster at sea and forms an unexpected connection with another survivor: a fearsome Bengal tiger.",
      genre: "Drama",
    },
    {
      id: 5,
      title: "Toy Story",
      image:
        "https://ak1.ostkcdn.com/images/products/is/images/direct/027ec626f936c924c97d7ddc5afb4442ac6c5f18/%22Toy-Story-%281995%29%22-Poster-Print.jpg?impolicy=medium",
      director: "John Lasseter",
      description:
        "A cowboy doll is profoundly threatened and jealous when a new spaceman figure supplants him as top toy in a boy's room.",
      genre: "Animation",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};
