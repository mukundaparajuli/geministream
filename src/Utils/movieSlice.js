import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    upComingMovies: null,
    topRatedMovies: null,
    trailerVido: null,
    loading: {
      nowPlaying: false,
      popular: false,
      topRated: false,
      upComing: false,
      trailer: false,
    },
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
      state.loading.nowPlaying = false;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVido = action.payload;
      state.loading.trailer = false;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
      state.loading.popular = false;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
      state.loading.topRated = false;
    },
    addUpComingMovies: (state, action) => {
      state.upComingMovies = action.payload;
      state.loading.upComing = false;
    },
    setLoading: (state, action) => {
      const { type, loading } = action.payload;
      state.loading[type] = loading;
    },
  },
});
export default movieSlice.reducer;
export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  addTopRatedMovies,
  addUpComingMovies,
  setLoading,
} = movieSlice.actions;
