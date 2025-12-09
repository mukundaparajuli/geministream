import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addPopularMovies, setLoading } from "../Utils/movieSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getPopular = async () => {
      dispatch(setLoading({ type: 'popular', loading: true }));
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/popular?language=en-NP&page=1",
          API_OPTIONS
        );
        const response = await data.json();

        dispatch(addPopularMovies(response.results));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        dispatch(setLoading({ type: 'popular', loading: false }));
      }
    };
    getPopular();
  }, [dispatch]);
};

export default usePopularMovies;
