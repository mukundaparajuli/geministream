import React from "react";
import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) {
    return <div>Loading...</div>;
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
