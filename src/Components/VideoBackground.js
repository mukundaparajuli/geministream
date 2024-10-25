import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  const trailerId = useSelector((store) => store?.movies?.trailerVido);
  console.log("tailer id= ", trailerId, "id=", id)
  useMovieTrailer({ id });


  return (
    <div className="absolute">
      <iframe
        className="w-screen aspect-video bg-gradient-to-tr from-black bg-opacity- h-full"

        src={"https://www.youtube.com/embed/" + trailerId?.key + "?autoplay=1&mute=1&enablejsapi=1&controls=0&picture-in-picture=0&encrypted-media=0&rel=0&loop=1?modestbranding=1&showinfo=0"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>

    </div>
  );
};

export default VideoBackground;
