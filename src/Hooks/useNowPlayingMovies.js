import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addNowPlayingMovies } from "../Utils/movieSlice";
import { useEffect } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlaying = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?language=en-NP&page=1",
        API_OPTIONS
      );
      const response = await data.json();

      dispatch(addNowPlayingMovies(response.results)); // Fix typo here
    } catch (error) {
      console.error("Error fetching now playing movies:", error);
    }
  };

  useEffect(() => {
    getNowPlaying();
  }, [getNowPlaying]);
};

export default useNowPlayingMovies;
