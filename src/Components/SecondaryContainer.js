import React from "react";
import MovieLists from "./MovieLists";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="overflow-auto bg-black ">
      {movies ? (
        <div>
          <MovieLists
            title={"Now Playing"}
            movieInfo={movies?.nowPlayingMovies}
          />
          <MovieLists title={"Popular"} movieInfo={movies?.popularMovies} />
          <MovieLists title={"Upcoming"} movieInfo={movies?.upComingMovies} />
          <MovieLists title={"Top Rated"} movieInfo={movies?.topRatedMovies} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default SecondaryContainer;
