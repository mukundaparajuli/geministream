import React, { useContext } from "react";
import { MOVIE_IMAGE_CDN } from "../Utils/Constants";
import { MovieContext } from "../contexts/selectedMovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ backdrop_path, title, name, poster_path, id }) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const movie = { backdrop_path, title, name, poster_path, id }


  if (!(backdrop_path || poster_path)) return null;

  return (
    <Link to={"/browse/" + id} onClick={() => setSelectedMovie(movie)}>
      <div className="pr-1 md:pr-4 w-44 md:w-72">
        <img
          className="h-24 md:h-36 w-44 md:w-72 rounded-lg"
          src={MOVIE_IMAGE_CDN + (backdrop_path || poster_path)}
          alt=""
        />
        <h1 className="text-white text-sm md:text-lg font-bold">
          {name || title}
        </h1>
      </div>
    </Link>
  );
};

export default MovieCard;
