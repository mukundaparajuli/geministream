import React from "react";
import Header from "./Header";
import { signOut } from "firebase/auth";
import { auth } from "../Utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../Utils/userSlice";
import { useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpComingMovies from "../Hooks/useUpComingMovies";
import { toggleGptSearch } from "../Utils/gptSearchSlice";
import GptSearch from "./GptSearch";
import { USER_AVATAR } from "../Utils/Constants";

const Browse = () => {
  const toggleValue = useSelector(
    (store) => store.gptSearchSlice.toggleGptSearch
  );
  // const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(removeUser());
      })
      .catch((error) => { });
  };
  console.log(toggleValue);
  const toggleGpt = () => {
    dispatch(toggleGptSearch());
  };
  // fetch data from tmdb hook
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpComingMovies();

  return (
    <div className="no-scrollbar">
      <div className="fixed flex justify-between items-center bg-gradient-to-b from-black z-20 w-screen h-auto">
        <Header />
        <div className="flex items-center">
          <button
            className="z-index-10 p-2 m-2 h-12  bg-purple-900 border-2 border-black shadow-lg text-white font-semibold rounded-lg"
            onClick={toggleGpt}
          >
            {toggleValue ? "Home" : "GPT Search"}
          </button>
          <div
            className="flex items-center mr-8 cursor-pointer"
            onClick={handleSignOut}
          >
            <h1 className=" font-semibold text-red-600 text-2xl items-center h-16 my-4 py-4">
              Log Out
            </h1>
          </div>
        </div>
      </div>
      {toggleValue ? (
        <GptSearch />
      ) : (
        <div>
          <MainContainer />
          <SecondaryContainer />
        </div>
      )}
    </div>
  );
};

export default Browse;
