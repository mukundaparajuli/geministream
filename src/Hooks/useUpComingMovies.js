import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addUpComingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  const getUpComing = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        API_OPTIONS
      );
      const response = await data.json();

      dispatch(addUpComingMovies(response.results)); // Fix typo here
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getUpComing();
  }, [getUpComing]);
};

export default useUpComingMovies;
