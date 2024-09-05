import { createSlice } from "@reduxjs/toolkit";
import { getLanguages } from "./translateActions";

const initialState = {
  isLangsLoading: false,
  isLangsError: false,
  languages: [],
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLangsLoading = true;
    });
    builder.addCase(getLanguages.fulfilled, (state, action) => {
      state.isLangsLoading = false;
      state.isLangsError = false;
      state.languages = action.payload;
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.isLangsLoading = false;
      state.isLangsError = true;
    });
  },
});

export default translateSlice.reducer;
