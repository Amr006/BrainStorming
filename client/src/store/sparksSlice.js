import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSparks = createAsyncThunk("sparks/getSparks", async (args) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${args.team_id}?limit=5&page=${args.counter}`,
    { headers: { Authorization: `Bearer ${args.token}` } }
  );
  return { ...res.data, counter: args.counter };
});

const initialState = {
  sparks: [],
  totalSparks: 0,
  isLoading: true,
  counter: 0,
};

export const sparksSlice = createSlice({
  name: "sparks",
  initialState,
  reducers: {
    reset: (state) => {
      state.counter = 0;
      state.sparks = [];
      state.totalSparks = 0;
      state.isLoading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSparks.fulfilled, (state, action) => {
      const data = action.payload.data;
      const counter = action.payload.counter;
      state.totalSparks = action.payload.totalSparks;
      if (state.counter === counter) {
        if (counter === 0) {
          state.sparks = data;
        } else {
          data.map((spark) => {
            state.sparks.push(spark);
          });
        }
        state.counter += 1;
        state.isLoading = false;
      }
    });
  },
});

export const { reset } = sparksSlice.actions;
export default sparksSlice.reducer;
