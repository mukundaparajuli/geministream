import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../Utils/Constants";
import { addTrailerVideo } from "../Utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = ({ id }) => {
  console.log(id);
  const dispatch = useDispatch();
  const trailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    {
      const filterData = json?.results.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData ? filterData[0] : json.results[0];

      dispatch(addTrailerVideo(trailer));
      if (trailer) {
        console.log("trailer=", trailer);
        return trailer;
      }
    }
  };

  useEffect(() => {
    trailer();
  }, []);
};
export default useMovieTrailer;
