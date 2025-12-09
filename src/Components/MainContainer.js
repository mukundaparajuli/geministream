import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  const isLoading = useSelector((store) => store.movies?.loading?.nowPlaying);

  if (isLoading) {
    return (
      <div className="h-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="h-full min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">No movies available</div>
      </div>
    );
  }

  const mainMovie = movies[0];

  return (
    <div className="h-full min-h-screen">
      <VideoBackground id={mainMovie.id} />
      <VideoTitle movie={mainMovie} />
    </div>
  );
};

export default MainContainer;
