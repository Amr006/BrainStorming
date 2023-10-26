import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfileData = createAsyncThunk("user/getProfileData", async (user_id) => {
    const res = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/Profile/${user_id}`
    );
    return res.data.data[0];
});

const initialState = {
    profileData: null,
    isLoading: true,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProfileData.fulfilled, (state, action) => {
            state.profileData = action.payload;
            state.isLoading = false
        });
        builder.addCase(getProfileData.rejected, (state, action) => {
            state.isLoading = true
        });
    },
});

export default profileSlice.reducer;
