import UpdateSpark from "@/components/Form/UpdateSpark/UpdateSpark";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSparks = createAsyncThunk("sparks/getSparks", async (args) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${args.team_id}?limit=5&page=${args.counter}`,
    { headers: { Authorization: `Bearer ${args.token}` } }
  );
  return { ...res.data, counter: args.counter, deletedSpark: args.deletedSpark, updatedSpark: args.updatedSpark, newSpark: args.newSpark };
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
      const deletedSpark = action.payload.deletedSpark
      const updatedSpark = action.payload.updatedSpark
      const newSpark = action.payload.newSpark
      state.totalSparks = action.payload.totalSparks;
      if (state.counter === counter) {
        if (counter === 0) {
          state.sparks = data;
        } else {
          state.sparks = [...state.sparks, ...data]
        }
        state.counter += 1;
        state.isLoading = false;
      } else {
        if (deletedSpark) {
          state.sparks = state.sparks.filter((e) => e._id != deletedSpark)
        } else if (updatedSpark) {
          const { idea, description } = updatedSpark.values
          state.sparks[updatedSpark.sparkIndex].Idea = idea
          state.sparks[updatedSpark.sparkIndex].Description = description
        } else if (newSpark) {
          state.sparks.unshift(newSpark)
        }
      }
    });
  },
});

export const { reset } = sparksSlice.actions;
export default sparksSlice.reducer;
