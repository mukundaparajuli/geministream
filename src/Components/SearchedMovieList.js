import SearchedMovieCard from "./SearchedMovieCard";

const SearchedMovieList = ({ movieInfo, isSearchPage = false }) => {
  if (!movieInfo || movieInfo.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">
          No movies found. Try another search.
        </p>
      </div>
    );
  }

  if (isSearchPage) {
    return (
      <div className="w-full overflow-x-scroll no-scrollbar">
        <div className="flex flex-nowrap gap-6 px-4 py-2">
          {movieInfo.map((movie) => (
            <div key={movie.id} className="w-64 flex-shrink-0">
              <SearchedMovieCard {...movie} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black">
      <div className="flex flex-nowrap gap-4 overflow-x-auto no-scrollbar pb-4">
        {movieInfo.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-64">
            {movie && <SearchedMovieCard {...movie} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchedMovieList;
