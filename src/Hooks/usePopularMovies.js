import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopular = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-NP&page=1",
        API_OPTIONS
      );
      const response = await data.json();

      dispatch(addPopularMovies(response.results)); // Fix typo here
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getPopular();
  }, [getPopular]);
};

export default usePopularMovies;
