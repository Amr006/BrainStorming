import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getUserData = createAsyncThunk("user/getUserData", async () => {
  try {
    const user_id = Cookies.get("user_id")
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/Profile/${user_id}`
    );
    return res.data.data[0];
  } catch (error) {
    console.log(error)
  }
  return;
});

const initialState = {
  userData: null,
  isUser: false,
  isLoading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoading = false
      try {
        const user_id = Cookies.get("user_id")
        if (user_id === state.userData._id) {
          state.isUser = true
        } else {
          state.isUser = false
        }
      } catch (err) {
        state.userData = null
        state.isUser = false
      }
    });
  },
});

export default userSlice.reducer;
