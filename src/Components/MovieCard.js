import React, { useContext } from "react";
import { MOVIE_IMAGE_CDN } from "../Utils/Constants";
import { MovieContext } from "../contexts/selectedMovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({ backdrop_path, title, name, poster_path, id }) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const movie = { backdrop_path, title, name, poster_path, id }

  if (!(backdrop_path || poster_path)) return null;

  return (
    <Link
      to={"/browse/" + id}
      onClick={() => setSelectedMovie(movie)}
      className="transition-transform duration-300 hover:scale-105 hover:z-10"
    >
      <div className="pr-2 md:pr-4 w-32 md:w-44 lg:w-52 flex-shrink-0">
        <img
          className="w-full h-20 md:h-28 lg:h-32 rounded-lg object-cover shadow-lg hover:shadow-xl transition-shadow"
          src={MOVIE_IMAGE_CDN + (backdrop_path || poster_path)}
          alt={name || title}
          loading="lazy"
        />
        <h1 className="text-white text-xs md:text-sm lg:text-base font-semibold mt-2 truncate">
          {name || title}
        </h1>
      </div>
    </Link>
  );
};

export default MovieCard;
