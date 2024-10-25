import React, { createContext, useState } from 'react';

// Create the context
export const MovieContext = createContext(null);

// Create the provider component
export const MovieProvider = ({ children }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <MovieContext.Provider value={{ selectedMovie, setSelectedMovie }
    }>
      {children}
    </MovieContext.Provider>
  );
};
