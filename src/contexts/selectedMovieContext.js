import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const MovieContext = createContext(null);

// Create the provider component
export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovieState] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedMovie = localStorage.getItem('selectedMovie');
    if (storedMovie) {
      try {
        setSelectedMovieState(JSON.parse(storedMovie));
      } catch (error) {
        console.error('Error parsing stored movie:', error);
        localStorage.removeItem('selectedMovie');
      }
    }
  }, []);

  // Function to set selected movie and persist to localStorage
  const setSelectedMovie = (movie) => {
    setSelectedMovieState(movie);
    if (movie) {
      localStorage.setItem('selectedMovie', JSON.stringify(movie));
    } else {
      localStorage.removeItem('selectedMovie');
    }
  };

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }}>
      {children}
    </MovieContext.Provider>
  );
};
