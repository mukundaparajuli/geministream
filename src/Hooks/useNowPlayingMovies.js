import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addNowPlayingMovies, setLoading } from "../Utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getNowPlaying = async () => {
      dispatch(setLoading({ type: 'nowPlaying', loading: true }));
      try {
        const data = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-NP&page=1",
          API_OPTIONS
        );
        const response = await data.json();

        dispatch(addNowPlayingMovies(response.results));
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
        dispatch(setLoading({ type: 'nowPlaying', loading: false }));
      }
    };
    getNowPlaying();
  }, [dispatch]);
};

export default useNowPlayingMovies;
