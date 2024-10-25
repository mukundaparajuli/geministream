import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gptSearchSlice",
  initialState: {
    toggleGptSearch: false,
    movieResults: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.toggleGptSearch = !state.toggleGptSearch;
    },
    movieResults: (state, actions) => {
      state.movieResults = actions.payload;
    },
  },
});
export default gptSlice.reducer;
export const { toggleGptSearch, movieResults } = gptSlice.actions;
