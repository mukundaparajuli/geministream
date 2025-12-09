import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addUpComingMovies, setLoading } from "../Utils/movieSlice";
import { useEffect } from "react";

const useUpComingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getUpComing = async () => {
      dispatch(setLoading({ type: 'upComing', loading: true }));
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          API_OPTIONS
        );
        const response = await data.json();

        dispatch(addUpComingMovies(response.results));
      } catch (error) {
        console.error("Error fetching upcoming movies:", error);
        dispatch(setLoading({ type: 'upComing', loading: false }));
      }
    };
    getUpComing();
  }, [dispatch]);
};

export default useUpComingMovies;
