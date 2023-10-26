import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


const initialState = {
  signed: false,
  user_id: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getAuthData: (state, action) => {
      state.user_id = action.payload.user_id;
      state.token = action.payload.token;
      if (state.user_id && state.token) {
        state.signed = true;
      }
    },
    logOut: (state) => {
      try {
        Cookies.remove("token");
        Cookies.remove("user_id");
      } catch (err) {
        console.log(err);
      }
      state.signed = false;
      (state.user_id = null), (state.token = null);
    },
  },
});

export const { getAuthData, logOut } = authSlice.actions;
export default authSlice.reducer;
