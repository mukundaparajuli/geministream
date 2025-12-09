import React, { useContext } from "react";
import { MovieContext } from "../contexts/selectedMovieContext";
import { Link } from "react-router-dom";

const VideoTitle = ({ movie }) => {
  const { setSelectedMovie } = useContext(MovieContext);
  const { title, overview } = movie;
  console.log(movie);
  return (
    <div className="absolute bottom-0 left-0 w-full h-full flex items-end px-4 md:px-8 lg:px-14 pb-8 md:pb-12 lg:pb-16">
      <div className="max-w-2xl relative">
        {/* Black gradient background for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent rounded-lg"></div>
        <div className="relative z-10 p-4 md:p-6">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{title}</h1>
          <p className="text-sm md:text-base text-gray-200 mb-4 line-clamp-2 md:line-clamp-3 max-w-xl">{overview}</p>
          <div className="flex gap-2">
            <Link to={`/browse/${movie.id}`} >
              <button className="bg-white text-black text-sm font-medium px-4 py-2 rounded hover:bg-gray-200 transition-colors flex items-center gap-1" onClick={() => setSelectedMovie(movie)}>
                <span className="text-lg">▶</span> Play
              </button>
            </Link>
            <Link to={`/browse/${movie.id}`} >
              <button className="bg-gray-600/80 text-white text-sm font-medium px-4 py-2 rounded hover:bg-gray-500 transition-colors flex items-center gap-1" onClick={() => setSelectedMovie(movie)}>
                <span>ℹ</span> More Info
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
