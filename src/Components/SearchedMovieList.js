import React from "react";
import SearchedMovieCard from "./SearchedMovieCard";
const SearchedMovieList = ({ movieInfo }) => {
  console.log(movieInfo);

  return (
    <div className="p-4 relative bg-black/80">
      <div>
        <h1 className="text-white  text-4xl font-bold my-3">{ }</h1>
      </div>
      {movieInfo ? (
        <div className=" flex-grow overflow-y-auto z-10 no-scrollbar">
          {movieInfo.map((movie) => (
            < SearchedMovieCard {...movie} key={movie.id} />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default SearchedMovieList;