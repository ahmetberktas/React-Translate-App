import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { options } from "../constants/constants";

export const getLanguages = createAsyncThunk(
  "translate/getLanguages",
  async () => {
    const res = await axios.request(options);
    return res.data.data.languages;
  }
);

export const translateText = createAsyncThunk(
  "translate/translateText",
  async ({ sourceLang, targetLang, text }) => {
    const data = new FormData();
    data.append("source_language", sourceLang.value);
    data.append("target_language", targetLang.value);
    data.append("text", text);

    const options = {
      method: "POST",
      url: "https://text-translator2.p.rapidapi.com/translate",
      headers: {
        "x-rapidapi-key": "a065931112mshade584e262c4e55p1d526bjsn1efa31a216d9",
        "x-rapidapi-host": "text-translator2.p.rapidapi.com",
      },
      data: data,
    };

    try {
      const res = await axios.request(options);
      return res.data.data.translatedText;
    } catch (error) {
      console.error("Hata Oluştu:", error);
      throw error;
    }
  }
);
