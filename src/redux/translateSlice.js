import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "./translateActions";

const initialState = {
  isLangsLoading: false,
  isLangsError: false,
  languages: [],
  isTranslateLoading: false,
  isTranslateError: false,
  tranlatedText: "",
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
    builder.addCase(translateText.pending, (state) => {
      state.isTranslateLoading = true;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isTranslateLoading = false;
      state.isTranslateError = false;
      state.tranlatedText = action.payload;
    });
    builder.addCase(translateText.rejected, (state) => {
      state.isTranslateLoading = false;
      state.isTranslateError = true;
    });
  },
});

export default translateSlice.reducer;
