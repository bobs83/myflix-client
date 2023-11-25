export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.image} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movie, setMovies] = useState([
    {
      id: 1,
      title: "Matrix",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/51EG732BV3L._SY445_.jpg",
      director: "Lana Wachowski",
    },
    {
      id: 2,
      title: "Inception",
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81p%2Bxe8cbnL._SY445_.jpg",
      director: "Christopher Nolan",
    },
    {
      id: 3,
      title: "Lion King",
      image:
        "https://play-lh.googleusercontent.com/sxMhq5US2nRdYrfER_Z_K5RChyifJmKrWIK650KeJW7eqggKkGSNjGHnIsyrIOg-YDfYXg",
      director: "Jon Favreau",
    },
    {
      id: 4,
      title: "Life of Pi",
      image:
        "https://play-lh.googleusercontent.com/VisZVoMWqbKt2gv-AskoLmdISKtoXSK2Efci8VZgN3HJR4GEqSlZN_vkonfckEYMKNz9=w480-h960-rw",
      director: "Ang Lee",
    },
    {
      id: 5,
      title: "Toy Story",
      image:
        "https://play-lh.googleusercontent.com/proxy/7rk1m5uc2OkUoQtsFMYBxhbdOOshvWr8_GkMCXoErk99o92J3UOsxVHpMR8lv7-iRzpaskYk8depxNhpvTRcEYxLIkwpd-8-WtJzO1IandD8b-lPoGW7AIBj2aIAmM1PGi0pKQ5K2RlKn5zbrE1E5y3g1eplIbuDcXBAwQ=w480-h960-rw",
      director: "John Lasseter",
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

  if (movie.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movie.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};

//Index.jsx..

import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";

import "./index.scss";

const App = () => {
  return <MainView />;
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
