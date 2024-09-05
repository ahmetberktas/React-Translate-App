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
