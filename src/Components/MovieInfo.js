import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { API_OPTIONS } from '../Utils/Constants';
import { MovieContext } from '../contexts/selectedMovieContext';
import LOGO from "../assets/LOGO.png"
import ReactPlayer from 'react-player';

const MovieInfo = () => {
    const { selectedMovie, setSelectedMovie } = useContext(MovieContext);
    const [movieInfo, setMovieInfo] = useState(null);
    const [key, setKey] = useState(null);
    const [suggestedMovies, setSuggestedMovies] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
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

    useEffect(() => {
        if (selectedMovie) {
            setMovieInfo(selectedMovie);
        }
        getTrailer();
        getSuggestedMovies();
    }, [id, selectedMovie, getSuggestedMovies, getTrailer]);

    if (!movieInfo) {
        navigate('/browse');
        return <div className="text-white text-center text-3xl mt-10">Loading...</div>;
    }

    const { title, overview, release_date, vote_average, popularity, poster_path } = movieInfo;

    return (
        <div className='w-[100vw] h-[100vh] flex flex-col bg-gray-900 px-6 min-h-screen'>
            {/* header section */}
            <Link to="/browse">
                <img className="w-40 h-32 absolute top-0" src={LOGO} alt="Logo" />
            </Link>
            <div className='flex w-full h-full justify-between mt-24'>
                {/* Left Section */}
                <div className='flex flex-col w-[65%] overflow-y-scroll mb-28 no-scrollbar'>
                    {/* Trailer Section */}
                    <div className='w-full h-[550px]'>
                        {key ? (
                            <ReactPlayer url={`https://www.youtube.com/watch?v=${key}`} playing loop width={1000} height={500} />
                        ) : (
                            <div className="text-white text-center">No trailer available</div>
                        )}
                    </div>

                    {/* Movie Info Section */}
                    <div className='w-full p-6 bg-gray-800 rounded-lg mt-4 shadow-lg h-auto'>
                        <h1 className='font-bold text-white text-4xl mb-3'>{title}</h1>
                        <p className='text-white text-lg opacity-80 mb-4'>{overview}</p>
                        <div className='flex justify-between items-center text-white'>
                            <div>
                                <p className='font-semibold'>Release Date: {release_date}</p>
                                <p className='font-semibold'>Rating: {vote_average} / 10</p>
                                <p className='font-semibold'>Popularity: {popularity}</p>
                            </div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                                alt={title}
                                className='w-32 h-auto rounded-lg shadow-md'
                            />
                        </div>
                    </div>
                </div>

                {/* Right Section: Suggested Movies */}
                <div className='flex flex-col w-[30%] h-full p-6 bg-gray-800 rounded-lg shadow-lg overflow-y-auto no-scrollbar'>
                    <h2 className='text-3xl font-bold text-white mb-4'>Suggested Movies</h2>
                    <div className='flex flex-col space-y-6'>
                        {suggestedMovies.map(movie => (
                            movie.poster_path && (
                                <Link to={`/browse/${movie.id}`} key={movie.id}>
                                    <div className='w-full bg-gray-800 rounded-lg shadow-lg flex-shrink-0' onClick={() => setSelectedMovie(movie)}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className='w-full h-60 object-cover rounded-t-lg'
                                        />
                                        <div className='p-4 text-white'>
                                            <h3 className='font-semibold text-xl'>{movie.title}</h3>
                                            <p className='text-sm opacity-80'>{movie.release_date}</p>
                                            <p className='text-sm opacity-80'>Rating: {movie.vote_average} / 10</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
