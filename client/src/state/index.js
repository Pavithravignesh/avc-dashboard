import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId:"63701cc1f03239c72c000180" // that there's a user have loggedIn
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
