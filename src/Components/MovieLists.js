import React from "react";
import MovieCard from "./MovieCard";

const MovieLists = ({ title, movieInfo }) => {
  return (
    <div className=" p-4 relative">
      <div>
        <h1 className="text-white  text-4xl font-bold my-3">{title}</h1>
      </div>
      {movieInfo ? (
        <div className="flex flex-nowrap no-scrollbar flex-grow overflow-x-auto ">
          {movieInfo.map((movie) => (
            <MovieCard {...movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default MovieLists;
