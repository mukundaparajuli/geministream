import React from "react";
import SearchedMovieList from "./SearchedMovieList";
import { useSelector } from "react-redux";

const SearchedMovies = ({ title }) => {
  const movie = useSelector((store) => store.gptSearchSlice.movieResults);

  if (!movie || movie.length === 0) {
    return null;
  }

  return (
    <SearchedMovieList movieInfo={movie} />
  );
};

export default SearchedMovies;
