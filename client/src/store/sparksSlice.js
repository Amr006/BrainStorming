import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSparks = createAsyncThunk("sparks/getSparks", async (args) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${args.team_id}`,
    { headers: { Authorization: `Bearer ${args.token}` } }
  );
  return res.data.data;
});

const initialState = {
  sparks: [],
  isLoading: true,
};

export const sparksSlice = createSlice({
  name: "sparks",
  initialState,
  reducers:{
    addSparks:(state,action)=>{
      action.payload.map((spark)=>{
        state.sparks.push(spark)
      })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSparks.fulfilled, (state, action) => {
      state.sparks = action.payload;
      state.isLoading = false;
    });
  },
});

export const {addSpark} = sparksSlice.actions
export default sparksSlice.reducer;
