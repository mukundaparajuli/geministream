import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_OPTIONS } from '../Utils/Constants';
import { MovieContext } from '../contexts/selectedMovieContext';
import ReactPlayer from 'react-player';

const MovieInfo = () => {
    const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
    const [movieInfo, setMovieInfo] = useState(null);
    const [key, setKey] = useState(null);
    const [suggestedMovies, setSuggestedMovies] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const getMovieDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                    API_OPTIONS
                );
                if (response.ok) {
                    const data = await response.json();
                    setMovieInfo(data);
                    setSelectedMovie(data); // Update context with fetched movie
                } else {
                    console.error("Error fetching movie details:", response.statusText);
                    navigate('/browse'); // Redirect if movie not found
                }
            } catch (error) {
                console.error("Error fetching movie details:", error);
                navigate('/browse');
            }
        };

        const getTrailer = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                    API_OPTIONS
                );
                if (response.ok) {
                    const data = await response.json();
                    if (data.results.length > 0) {
                        setKey(data.results[0].key);
                    } else {
                        setKey(null);  // No trailer found
                    }
                } else {
                    console.error("Error fetching trailer:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching trailer:", error);
            }
        };

        const getSuggestedMovies = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`,
                    API_OPTIONS
                );
                if (response.ok) {
                    const data = await response.json();
                    setSuggestedMovies(data.results);
                } else {
                    console.error("Error fetching suggested movies:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching suggested movies:", error);
            }
        };

        // Always fetch movie details based on ID, regardless of selectedMovie state
        getMovieDetails();
        getTrailer();
        getSuggestedMovies();
    }, [id, setSelectedMovie, navigate]);

    if (!movieInfo) {
        return <div className="text-white text-center text-3xl mt-10 min-h-screen">Loading...</div>;
    }

    const { title, overview, release_date, vote_average, popularity, poster_path } = movieInfo;

    return (
        <div className='min-h-screen bg-gray-900 text-white'>
            <div className='relative z-10 p-4 md:p-6'>
                <Link to="/browse" className='inline-block'>
                    <img className="w-24 md:w-32 h-auto" src={"/logo.webp"} alt="Logo" />
                </Link>
            </div>

            <div className='flex flex-col lg:flex-row w-full max-w-7xl mx-auto px-4 md:px-6 pb-8'>
                {/* Main Content */}
                <div className='flex-1 lg:pr-6 mb-6 lg:mb-0'>
                    {/* Trailer Section */}
                    <div className='w-full mb-6 relative'>
                        {key ? (
                            <div className='aspect-video w-full max-w-4xl mx-auto relative'>
                                <ReactPlayer
                                    url={`https://www.youtube.com/watch?v=${key}`}
                                    playing
                                    loop
                                    width="100%"
                                    height="100%"
                                    controls
                                />
                                {/* Black gradient overlay for consistency */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                            </div>
                        ) : (
                            <div className="aspect-video w-full max-w-4xl mx-auto bg-gray-800 rounded-lg flex items-center justify-center relative">
                                <div className="text-center text-gray-400">
                                    <div className="text-4xl mb-2">🎬</div>
                                    <p>No trailer available</p>
                                </div>
                                {/* Black gradient overlay for consistency */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-lg"></div>
                            </div>
                        )}
                    </div>

                    {/* Movie Info Section */}
                    <div className='bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg'>
                        <h1 className='font-bold text-2xl md:text-3xl lg:text-4xl mb-4'>{title}</h1>
                        <p className='text-gray-300 text-base md:text-lg mb-6 leading-relaxed'>{overview}</p>

                        <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
                            <div className='space-y-2'>
                                <p className='font-semibold text-lg'>📅 Release Date: {release_date}</p>
                                <p className='font-semibold text-lg'>⭐ Rating: {vote_average}/10</p>
                                <p className='font-semibold text-lg'>🔥 Popularity: {popularity}</p>
                            </div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={title}
                                className='w-24 md:w-32 lg:w-40 h-auto rounded-lg shadow-md'
                            />
                        </div>
                    </div>
                </div>

                {/* Suggested Movies Sidebar */}
                <div className='w-full lg:w-80'>
                    <div className='bg-gray-800 rounded-lg p-4 md:p-6 shadow-lg h-fit max-h-[600px] overflow-y-auto'>
                        <h2 className='text-xl md:text-2xl font-bold mb-4 sticky top-0 bg-gray-800 pb-2'>Suggested Movies</h2>
                        <div className='space-y-4'>
                            {suggestedMovies.slice(0, 6).map(movie => (
                                movie.poster_path && (
                                    <Link to={`/browse/${movie.id}`} key={movie.id}>
                                        <div
                                            className='bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors cursor-pointer'
                                            onClick={() => setSelectedMovie(movie)}
                                        >
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                                alt={movie.title}
                                                className='w-full h-32 object-cover'
                                                loading="lazy"
                                            />
                                            <div className='p-3'>
                                                <h3 className='font-semibold text-sm md:text-base line-clamp-2'>{movie.title}</h3>
                                                <p className='text-xs md:text-sm text-gray-400 mt-1'>{movie.release_date?.split('-')[0]}</p>
                                                <p className='text-xs md:text-sm text-yellow-400 mt-1'>⭐ {movie.vote_average}/10</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
