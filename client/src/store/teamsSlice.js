import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getTeams = createAsyncThunk("teams/getTeams", async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/Teams`);
  return res.data.data;
});

export const searchTeams = createAsyncThunk(
  "teams/searchTeams",
  async (args) => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/searchTeam?search=${args.search}`
    );
    return res.data.data;
  }
);

const initialState = {
  teams: [],
  user_teams: [],
  isLoading: true,
};

const teamsFunc = (state, action) => {
  const all = action.payload;
  let user_id = "0";
  state.teams = [];
  state.user_teams = [];
  try {
    user_id = Cookies.get("user_id");
    all.map((team) => {
      if (team.Members.includes(user_id)) {
        state.user_teams.push(team);
      } else {
        state.teams.push(team);
      }
    });
  } catch (err) {
    state.teams = all;
  }
  state.isLoading = false;
};

export const teamsSlice = createSlice({
  name: "teams",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTeams.fulfilled, (state, action) => {
      const all = action.payload;
      let user_id = "0";
      state.teams = [];
      state.user_teams = [];
      try {
        user_id = Cookies.get("user_id");
        all.map((team) => {
          if (team.Members.includes(user_id)) {
            state.user_teams.push(team);
          } else {
            state.teams.push(team);
          }
        });
      } catch (err) {
        state.teams = all;
      }
      state.isLoading = false;
    });
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTeams.fulfilled, (state, action) => {
        teamsFunc(state, action);
      })
      .addCase(searchTeams.fulfilled, (state, action) => {
        teamsFunc(state, action);
      });
  }
});
export default teamsSlice.reducer;
