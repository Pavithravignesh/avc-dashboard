import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  // No auth yet: the dashboard shows a fixed demo user
  userId: process.env.REACT_APP_USER_ID || "63701cc1f03239c72c000180",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;
