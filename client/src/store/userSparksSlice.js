import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserSparks = createAsyncThunk(
  "user_sparks/getUserSparks",
  async (args) => {
    console.log(2)
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/allIdeas`,
      {
        headers: {
          Authorization: `Bearer ${args.token}`,
        },
      }
    );
    return res.data.data;
  }
);

const initialState = {
  userSparks: [],
  isLoading: true,
};

export const userSparksSlice = createSlice({
  name: "user_sparks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserSparks.fulfilled, (state, action) => {
      state.userSparks = action.payload;
      state.isLoading = false;
    });
  },
});

export default userSparksSlice.reducer;
