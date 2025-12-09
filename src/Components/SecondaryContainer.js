import React from "react";
import MovieLists from "./MovieLists";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  const loading = useSelector((store) => store.movies.loading);

  return (
    <div className="overflow-auto bg-black ">
      {movies ? (
        <div>
          <MovieLists
            title={"Now Playing"}
            movieInfo={movies?.nowPlayingMovies}
            isLoading={loading?.nowPlaying}
          />
          <MovieLists
            title={"Popular"}
            movieInfo={movies?.popularMovies}
            isLoading={loading?.popular}
          />
          <MovieLists
            title={"Upcoming"}
            movieInfo={movies?.upComingMovies}
            isLoading={loading?.upComing}
          />
          <MovieLists
            title={"Top Rated"}
            movieInfo={movies?.topRatedMovies}
            isLoading={loading?.topRated}
          />
        </div>
      ) : (
        <div className="text-white text-center text-2xl mt-10">Loading...</div>
      )}
    </div>
  );
};

export default SecondaryContainer;
