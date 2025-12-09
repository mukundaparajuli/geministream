import React, { useContext } from "react";
import { MOVIE_IMAGE_CDN } from "../Utils/Constants";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../contexts/selectedMovieContext";
import { Play, Info } from "lucide-react";

const SearchedMovieCard = ({
  backdrop_path,
  title,
  name,
  overview,
  poster_path,
  id,
  vote_average,
  release_date,
  ...movie
}) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const navigate = useNavigate();

  if (!(backdrop_path || poster_path)) return null;

  const handleMovieSelection = () => {
    setSelectedMovie(movie);
    navigate(`/browse/${id}`);
  };

  const displayTitle = title || name;
  const imageUrl = MOVIE_IMAGE_CDN + (backdrop_path || poster_path);
  const truncatedOverview =
    overview?.length > 150 ? overview.slice(0, 150) + "..." : overview;

  return (
    <div
      className="group bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer"
      onClick={handleMovieSelection}
    >
      {/* Movie Image */}
      <div className="relative">
        <img
          className="w-full h-64 object-cover"
          src={imageUrl}
          alt={displayTitle}
          loading="lazy"
        />

        {/* Overlay Play Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center ">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
            <Play size={18} />
            <span>Play</span>
          </div>
        </div>

        {/* Rating */}
        {vote_average && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
            ⭐ {vote_average.toFixed(1)}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="p-4 bg-white">
        <h3 className="text-gray-900 font-semibold text-lg truncate">
          {displayTitle}
        </h3>

        {release_date && (
          <p className="text-gray-600 text-sm mb-2">
            {new Date(release_date).getFullYear()}
          </p>
        )}

        {truncatedOverview && (
          <p className="text-gray-700 text-sm line-clamp-3 mb-3">
            {truncatedOverview}
          </p>
        )}

        <div className="inline-flex items-center gap-1 text-red-600 hover:text-red-500 text-sm font-medium">
          <Info size={16} />
          More Info
        </div>
      </div>
    </div>
  );
};

export default SearchedMovieCard;
