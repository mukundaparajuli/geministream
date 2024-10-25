import React, { useState, useEffect } from "react";
import SearchedMovieList from "./SearchedMovieList";
import { useSelector } from "react-redux";

const SearchedMovies = ({ title }) => {
  const movie = useSelector((store) => store.gptSearchSlice.movieResults);

  return (
    <div
      className="overflow-auto w-full fixed bottom-0 transition-all duration-500 h-[80%]"
    >
      <SearchedMovieList movieInfo={movie} />
    </div>
  );
};

export default SearchedMovies;
