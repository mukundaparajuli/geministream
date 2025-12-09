import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import ReactPlayer from "react-player";

const VideoBackground = ({ id }) => {
  const trailerId = useSelector((store) => store?.movies?.trailerVido);
  console.log("tailer id= ", trailerId, "id=", id)
  useMovieTrailer({ id });


  return (
    <div className="absolute inset-0 w-full h-full">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailerId?.key}`}
        playing={true}
        loop={true}
        muted={true}
        controls={false}
        width="100%"
        height="100%"
        config={{
          youtube: {
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              rel: 0,
              modestbranding: 1,
              showinfo: 0,
              enablejsapi: 1,
              pictureInPicture: 0,
              encryptedMedia: 0
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default VideoBackground;
