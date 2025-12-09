import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useNowPlayingMovies from "../Hooks/useNowPlayingMovies";
import usePopularMovies from "../Hooks/usePopularMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useTopRatedMovies from "../Hooks/useTopRatedMovies";
import useUpComingMovies from "../Hooks/useUpComingMovies";
import { toggleGptSearch } from "../Utils/gptSearchSlice";
import GptSearch from "./GptSearch";
import Header from "./Header";
import { Home, Bot } from "lucide-react";

const Browse = () => {
  const toggleValue = useSelector(
    (store) => store.gptSearchSlice.toggleGptSearch
  );
  const dispatch = useDispatch();

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
      <Header />
      <div className="pt-16 md:pt-20">
        {/* Floating GPT Search Button */}
        <button
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full transition-all shadow-lg border-2 border-transparent hover:border-white/20 ${!toggleValue
            ? 'bg-white text-black hover:bg-gray-100'
            : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          onClick={toggleGpt}
        >
          {!toggleValue ? <Bot size={20} /> : <Home size={20} />}
        </button>

        <div>
          {toggleValue ? (
            <GptSearch />
          ) : (
            <div>
              <MainContainer />
              <SecondaryContainer />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
