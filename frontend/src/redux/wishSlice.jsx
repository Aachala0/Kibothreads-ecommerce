import { createSlice } from "@reduxjs/toolkit";
const initialState = JSON.parse(localStorage.getItem("wish")) ?? [];

const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    addToWish(state, action) {
      state.push(action.payload);
    },
    deleteFromWish(state, action) {
      const itemId = action.payload.id;
      return state.filter((item) => item.id !== itemId);
    },
  },
});

export const { addToWish, deleteFromWish } = wishSlice.actions;

export default wishSlice.reducer;
