import React, { useState, useRef } from "react";
import { API_OPTIONS, BG_IMAGE } from "../Utils/Constants";
import SearchedMovies from "./SearchedMovies";
import SearchedMovieList from "./SearchedMovieList";
import { useDispatch, useSelector } from "react-redux";
import { movieResults } from "../Utils/gptSearchSlice";
import { Search, Loader2, ArrowLeft } from "lucide-react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";

const GptSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const movie = useSelector((store) => store.gptSearchSlice.movieResults);
  const groqKey = process.env.REACT_APP_GROQ_API_KEY;
  const apiKey = process.env.REACT_APP_API_KEY;

  const isSearchPage = location.pathname === '/search';

  const verifyMovieMatch = async (movie, originalQuery) => {
    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'user',
              content: `Given this user search: "${originalQuery}"

And this movie: "${movie.title}" (${movie.release_date?.split('-')[0] || 'Unknown year'})
Overview: "${movie.overview || 'No overview available'}"

Rate how well this movie matches the user's search on a scale of 1-10:
- 8-10: Perfect match, directly addresses what they're looking for
- 6-7: Good match, very relevant
- 4-5: Reasonable match, somewhat relevant
- 1-3: Poor match, not very relevant

Be generous with scores - if the movie has ANY connection to what the user is looking for, give it at least a 5.

Return ONLY a single number (1-10) with no explanation.`
            }
          ],
          max_tokens: 10,
          temperature: 0.1
        })
      });

      if (!response.ok) {
        console.warn(`Verification failed for ${movie.title}`);
        return 7;
      }

      const data = await response.json();
      const scoreText = data.choices[0].message.content?.trim();
      const score = parseInt(scoreText);

      if (isNaN(score) || score < 1 || score > 10) {
        console.warn(`Invalid score for ${movie.title}: ${scoreText}`);
        return 7;
      }

      return score;
    } catch (error) {
      console.error(`Error verifying movie ${movie.title}:`, error);
      return 7;
    }
  };

  const searchMovieTMDB = async (movie) => {
    try {
      if (movie.year) {
        const queryParamsWithYear = new URLSearchParams({
          query: movie.name,
          include_adult: 'false',
          language: 'en-US',
          page: '1',
          primary_release_year: movie.year,
          api_key: apiKey
        });

        const dataWithYear = await fetch(
          `https://api.themoviedb.org/3/search/movie?${queryParamsWithYear.toString()}`,
          API_OPTIONS
        );
        const jsonWithYear = await dataWithYear.json();

        if (jsonWithYear.results && jsonWithYear.results.length > 0) {
          return jsonWithYear.results;
        }
      }

      const queryParamsWithoutYear = new URLSearchParams({
        query: movie.name,
        include_adult: 'false',
        language: 'en-US',
        page: '1',
        api_key: apiKey
      });

      const dataWithoutYear = await fetch(
        `https://api.themoviedb.org/3/search/movie?${queryParamsWithoutYear.toString()}`,
        API_OPTIONS
      );
      const jsonWithoutYear = await dataWithoutYear.json();

      return jsonWithoutYear.results || [];
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      return [];
    }
  };

  const handleGPTSearch = async () => {
    if (!searchText.current.value.trim()) {
      console.warn("Search text is empty. Please enter a movie description.");
      return;
    }

    if (!groqKey || groqKey === 'YOUR_GROQ_API_KEY_HERE' || groqKey.trim() === '') {
      alert("Please set your Groq API key in the .env file. Get it from: https://console.groq.com/keys");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-20b',
          messages: [
            {
              role: 'user',
              content: `You are a movie recommendation expert. Based on this user description: "${searchText.current.value}"

RECOMMEND EXACTLY 5 MOVIES that match this description.

IMPORTANT: Return your answer as a simple comma-separated list in this EXACT format:
Movie Name (Year), Movie Name (Year), Movie Name (Year), Movie Name (Year), Movie Name (Year)

Examples of correct format:
Alien (1979), Contact (1997), Arrival (2016), Interstellar (2014), The Martian (2015)
The Shawshank Redemption (1994), Forrest Gump (1994), Fight Club (1999), Inception (2010), The Matrix (1999)

Rules:
- Each movie must have a year in parentheses
- No quotes around movie titles
- No explanations or additional text
- Only the comma-separated list`
            }
          ],
          max_tokens: 300,
          temperature: 0.3
        })
      });

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      let responseText = data.choices[0].message.content?.trim();

      if (!responseText && data.choices[0].message.reasoning) {
        responseText = data.choices[0].message.reasoning.trim();
        const returnAsMatch = responseText.match(/Return as:\s*(.+)$/);
        if (returnAsMatch) {
          responseText = returnAsMatch[1].trim();
        } else {
          const moviePattern = /\b[A-Z][a-zA-Z\s:]+ \(\d{4}\)/g;
          const matches = responseText.match(moviePattern);
          if (matches) {
            responseText = matches.join(', ');
          }
        }
      }

      if (!responseText) {
        throw new Error("No response content received from API");
      }

      let cleanResponseText = responseText
        .replace(/^["']|["']$/g, '')
        .replace(/\n/g, ' ')
        .trim();

      const movieList = cleanResponseText
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => {
          let name = null;
          let year = null;

          const yearMatch = item.match(/^(.+?)\s*\((\d{4})\)\s*$/);
          if (yearMatch) {
            name = yearMatch[1].trim();
            year = yearMatch[2];
          } else {
            const nameMatch = item.match(/^["']?(.+?)["']?\s*$/);
            if (nameMatch) {
              name = nameMatch[1].trim();
            }
          }

          return { name, year };
        })
        .filter(movie => {
          const isValid = movie.name && movie.name.length > 1 && movie.name.toLowerCase() !== 'unknown';
          return isValid;
        })
        .slice(0, 5);

      if (movieList.length === 0) {
        console.error("No valid movies found in AI response. Response was:", responseText);

        const fallbackMovies = cleanResponseText.match(/\b[A-Z][a-zA-Z\s:]+(?:\(\d{4}\))?/g);
        if (fallbackMovies && fallbackMovies.length > 0) {
          const fallbackMovieList = fallbackMovies
            .slice(0, 5)
            .map(item => {
              const match = item.match(/^(.+?)(?:\s*\((\d{4})\))?\s*$/);
              return {
                name: match ? match[1].trim() : item.trim(),
                year: match && match[2] ? match[2] : null
              };
            })
            .filter(movie => movie.name && movie.name.length > 1);

          if (fallbackMovieList.length > 0) {
            const promiseArray = fallbackMovieList.map((movie) => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);
            const processedResults = tmdbResults
              .map((results, index) => {
                if (!results || results.length === 0) return [];
                const bestMatch = results[0];
                if (bestMatch) {
                  return [{
                    ...bestMatch,
                    searchQuery: fallbackMovieList[index].name,
                    searchYear: fallbackMovieList[index].year
                  }];
                }
                return [];
              })
              .flat()
              .filter(movie => movie && movie.poster_path)
              .slice(0, 10);

            if (processedResults.length > 0) {
              dispatch(movieResults(processedResults.slice(0, 8)));
              return;
            }
          }
        }

        alert("Couldn't understand the movie recommendations. Please try rephrasing your search.");
        return;
      }

      const promiseArray = movieList.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      const processedResults = tmdbResults
        .map((results, index) => {
          if (!results || results.length === 0) return [];

          const bestMatch = results[0];
          if (bestMatch) {
            return [{
              ...bestMatch,
              searchQuery: movieList[index].name,
              searchYear: movieList[index].year
            }];
          }
          return [];
        })
        .flat()
        .filter(movie => movie && movie.poster_path) // Only include movies with posters
        .slice(0, 10); // Limit to 10 results

      if (processedResults.length === 0) {
        console.warn("No valid movie results found");
        alert("No movies found matching your description. Try rephrasing your search.");
        return;
      }

      const originalQuery = searchText.current.value.trim();

      try {
        const verificationPromises = processedResults.map(movie =>
          verifyMovieMatch(movie, originalQuery)
        );

        const relevanceScores = await Promise.all(verificationPromises);

        const verifiedResults = processedResults
          .map((movie, index) => ({
            ...movie,
            relevanceScore: relevanceScores[index]
          }))
          .filter(movie => movie.relevanceScore >= 5)
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, 8);

        if (verifiedResults.length > 0) {
          dispatch(movieResults(verifiedResults));
        } else {
          dispatch(movieResults(processedResults.slice(0, 8)));
        }
      } catch (verificationError) {
        console.warn("Verification step failed, showing unverified results:", verificationError);
        dispatch(movieResults(processedResults.slice(0, 8)));
      }

    } catch (error) {
      console.error("Error with Groq API or TMDB search:", error);
      if (error.message.includes('401') || error.message.includes('API_KEY') || error.message.includes('invalid') || error.message.includes('unauthorized')) {
        alert("Invalid or expired Groq API key. Please get a new key from: https://console.groq.com/keys");
      } else if (error.message.includes('403') || error.message.includes('forbidden')) {
        alert("Access forbidden. Please check your Groq API key permissions.");
      } else if (error.message.includes('429') || error.message.includes('quota') || error.message.includes('limit') || error.message.includes('rate')) {
        alert("API quota exceeded. Groq has a generous free tier - check your usage at https://console.groq.com/");
      } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503')) {
        alert("Groq API server error. Please try again later.");
      } else {
        alert("Sorry, there was an error processing your request. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <img
        className={`fixed inset-0 w-full h-full object-cover -z-10 ${isSearchPage ? 'opacity-20' : 'opacity-30'}`}
        src={BG_IMAGE}
        alt="Background"
      />
      {isSearchPage && <Header />}
      <div className={isSearchPage ? "pt-20 md:pt-24 pb-8 min-h-screen" : "flex justify-center pt-24 md:pt-32 px-4 relative z-30"}>
        {isSearchPage && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6">
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Browse
            </Link>
          </div>
        )}

        {/* Search Form */}
        <div className={`${isSearchPage ? "flex justify-center px-4 mb-12" : "w-full max-w-2xl"} relative z-20`}>
          <div className={`bg-black backdrop-blur-sm p-4 rounded-xl shadow-2xl border border-gray-800 transition-all duration-300 ${isSearchPage ? '' : searchValue ? 'mt-4' : 'mt-16'}`}>
            <h2 className={`text-white font-bold mb-3 text-center ${isSearchPage ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'}`}>
              Discover Movies with AI
            </h2>
            {isSearchPage && (
              <p className="text-gray-400 text-center mb-6">
                Describe the movie you're looking for and let AI find the perfect matches
              </p>
            )}
            <div className={`flex flex-col md:flex-row gap-${isSearchPage ? '4' : '3'}`}>
              <input
                ref={searchText}
                onChange={() => setSearchValue(searchText.current.value)}
                className={`flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent placeholder-gray-400 disabled:opacity-50 ${isSearchPage ? 'text-lg py-4' : ''}`}
                type="text"
                placeholder="Describe the movie you're looking for..."
                disabled={isLoading}
              />
              <button
                className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${isSearchPage ? 'min-w-[140px] text-lg py-4 px-8' : ''}`}
                onClick={handleGPTSearch}
                disabled={isLoading || !searchValue.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={isSearchPage ? 20 : 18} className="animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={isSearchPage ? 20 : 18} />
                    Search
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchValue && isSearchPage && (
          <div className="mt-12 max-w-7xl mx-auto px-4 md:px-6">
            <div className="bg-black/70 backdrop-blur-lg rounded-xl p-8 border border-gray-700 shadow-2xl">
              <h3 className="text-gray-200 text-xl md:text-2xl font-bold mb-6">
                Search Results for: <span className="text-red-600">"{searchValue}"</span>
              </h3>
              <SearchedMovieList movieInfo={movie} isSearchPage={true} />
            </div>
          </div>

        )}
      </div>

      {/* Overlay Results for Browse Mode */}
      {searchValue && !isSearchPage && (
        <SearchedMovies title={searchValue} />
      )}
    </div>
  );
};

export default GptSearch;
