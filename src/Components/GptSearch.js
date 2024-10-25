import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useRef } from "react";
import { API_OPTIONS, BG_IMAGE } from "../Utils/Constants";
import SearchedMovies from "./SearchedMovies";
import { useDispatch } from "react-redux";
import { movieResults } from "../Utils/gptSearchSlice";

const GptSearch = () => {
  const [searchValue, setSearchValue] = useState(""); // Add state to manage search input
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const geminikey = process.env.REACT_APP_GEMINI_API_KEY;
  const apiKey = process.env.REACT_APP_API_KEY;

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
        API_OPTIONS
      );
      const json = await data.json();
      console.log("json result is here: ", json);
      return json.results;
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      return [];
    }
  };

  const handleGPTSearch = async () => {
    if (!searchText.current.value) {
      console.warn("Search text is empty. Please enter a movie name.");
      return;
    }

    try {
      const genAI = new GoogleGenerativeAI(geminikey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `Act as a movie recommendation system and suggest movies based on the following info: "${searchText.current.value}". Recommend the best 10 movies based on this info. Only provide the names of the movies separated by commas.`;

      const result = await model.generateContent(prompt);

      // Check how response is structured from the API (based on actual API result)
      const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const movieList = responseText.split(", ").map((movie) => movie.trim());

      const promiseArray = movieList.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // Combine results and dispatch to Redux store
      const flattenedResults = tmdbResults.flat();
      dispatch(movieResults(flattenedResults));
    } catch (error) {
      console.error("Error generating content or fetching TMDB results:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`w-[90%] z-10 bg-black bg-opacity-40 m-2 md:m-4 p-2 md:w-1/2 fixed flex justify-center rounded-lg ${searchValue ? 'top-10' : 'top-36'}`}
        >
          <input
            ref={searchText} 
            onChange={() => setSearchValue(searchText.current.value)} // Update state on input change
            className="mx-1 w-[75%] md:w-4/5 h-10 md:h-12 border-2 border-black rounded-xl p-1 md:m-2 bg-gray-500 text-white"
            type="text"
            placeholder="What would you like to watch today?"
          />
          <button
            className="mx-1 md:m-2 border-black border-2 h-10 md:h-12 rounded-xl p-1 md:px-3 bg-blue-800 text-white font-semibold"
            onClick={handleGPTSearch}
          >
            Search
          </button>
        </div>
        <img
          className="fixed object-cover h-screen md:w-full "
          src={BG_IMAGE}
          alt=""
        />
      </div>

      {searchValue && (
        <SearchedMovies title={searchValue} />
      )}
    </div>
  );
};

export default GptSearch;
