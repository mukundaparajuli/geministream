import React from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({ title, movieInfo, isLoading }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 py-4">
      <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold mb-4">{title}</h1>

      {isLoading ? (
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="w-32 md:w-44 lg:w-52 h-20 md:h-28 lg:h-32 bg-gray-700 rounded-lg animate-pulse flex-shrink-0"></div>
          ))}
        </div>
      ) : movieInfo && movieInfo.length > 0 ? (
        <div className="flex space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide pb-4">
          {movieInfo.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-center py-8">No movies available</div>
      )}
    </div>
  );
};

export default MovieLists;
