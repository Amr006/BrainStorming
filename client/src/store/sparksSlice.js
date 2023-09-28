import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSparks = createAsyncThunk("sparks/getSparks", async (args) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${args.team_id}?limit=5&page=${args.counter}`,
    { headers: { Authorization: `Bearer ${args.token}` } }
  );
  if (res.data.message === "last spark") {
    return [];
  }
  return res.data.data;
});

const initialState = {
  sparks: [],
  isLoading: true,
  counter: 0,
};

export const sparksSlice = createSlice({
  name: "sparks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSparks.fulfilled, (state, action) => {
      const obj = action.payload;
      if (state.counter === 0) {
        state.sparks = obj;
      } else {
        obj.map((spark) => {
          state.sparks.push(spark);
        });
        if (obj.length !== 0) {
          state.counter += 1;
        }
      }
      state.isLoading = false;
    });
  },
});

export const { addSpark } = sparksSlice.actions;
export default sparksSlice.reducer;
