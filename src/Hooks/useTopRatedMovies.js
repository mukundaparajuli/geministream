import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTopRatedMovies, setLoading } from "../Utils/movieSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTopRated = async () => {
      dispatch(setLoading({ type: 'topRated', loading: true }));
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
          API_OPTIONS
        );
        const response = await data.json();

        dispatch(addTopRatedMovies(response.results));
      } catch (error) {
        console.error("Error fetching top rated movies:", error);
        dispatch(setLoading({ type: 'topRated', loading: false }));
      }
    };
    getTopRated();
  }, [dispatch]);
};

export default useTopRatedMovies;
