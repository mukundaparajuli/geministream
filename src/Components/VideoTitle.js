import React, { useContext } from "react";
import { MovieContext } from "../contexts/selectedMovieContext";
import { Link } from "react-router-dom";

const VideoTitle = ({ movie }) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const { title, overview } = movie;
  console.log(movie);
  return (
    <div className="relative mx-8 text-white z-10 flex-col-reverse h-screen flex items-center">
      <div className="">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="text-lg w-[35%]">{overview}</p>
        <Link to={`/browse/${movie.id}`} >
          <button className="bg-white text-black text-xl font-semibold h-12 p-3 my-2 rounded-md" onClick={() => setSelectedMovie(movie)}>
            Play
          </button>
        </Link>
        <Link to={`/browse/${movie.id}`} >
          <button className="bg-gray-500  text-white text-xl font-semibold h-12 p-3 mx-2 rounded-md" onClick={() => setSelectedMovie(movie)}>
            More Info
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;
