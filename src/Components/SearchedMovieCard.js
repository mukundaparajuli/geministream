import React, { useContext } from "react";
import { MOVIE_IMAGE_CDN } from "../Utils/Constants";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import { Link } from "react-router-dom";
import { MovieContext } from "../contexts/selectedMovieContext";

const MovieCard = (movie) => {
  const { backdrop_path, title, name, overview, poster_path, id } = movie;
  const trailerVideo = useMovieTrailer({ id });
  const { setSelectedMovie } = useContext(MovieContext);
  console.log(trailerVideo);
  if (!(backdrop_path || poster_path || trailerVideo)) return null;

  // handle movie selection
  const handleMovieSeletion = () => {
    setSelectedMovie(movie);
  }
  return (
    <div className="flex justify-evenly shadow-gray-300 shadow-sm p-1 overflow-auto">
      <div className="m-8 w-1/3">
        <img
          className="h-48 w-full object-cover"  // Set fixed height with object-cover for maintaining aspect ratio
          src={MOVIE_IMAGE_CDN + (backdrop_path || poster_path)}
          alt=""
        />
      </div>
      <div className="h-[30vh] w-1/3 flex items-center no-scrollbar overflow-scroll">
        <div className="overflow-y-auto">
          {title ? (
            <h1 className="font-bold no-scrollbar text-lg md:text-4xl mb-2 h-[25%] text-white flex ">
              {title}
            </h1>
          ) : (
            <h1 className="font-bold no-scrollbar text-lg md:text-4xl mb-2 h-[25%] text-white flex ">
              {name}
            </h1>
          )}
          <p className="overflow-hidden text-white text-[12px] h-[75%] z-10 text-justify md:text-md ">
            {overview}
          </p>
          <Link to={`/browse/${id}`} >
            <button className="text-orange-500 p-5 " onClick={() => handleMovieSeletion()}>  Movie Info</button>
          </Link>
        </div>
      </div>
    </div >
  );
};

export default MovieCard;
