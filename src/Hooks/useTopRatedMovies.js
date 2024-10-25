import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTopRatedMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRated = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const response = await data.json();

      dispatch(addTopRatedMovies(response.results)); // Fix typo here
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getTopRated();
  }, [getTopRated]);
};

export default useTopRatedMovies;
