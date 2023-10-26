import { Box, TextField } from "@mui/material";
import React from "react";
import styles from "./Search.module.css";
import { SearchOutlined } from "@mui/icons-material";
import { SpecialIconButton } from "@/MUIComponents/SpecialIconButton/SpecialIconButton";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchTeams } from "@/store/teamsSlice";

const Search = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");
  return (
    <Box className={`flex jcs aic g30 pad20 ${styles.search_box}`}>
      <TextField
        id="standard-search"
        label="Search Team Name..."
        type="search"
        variant="standard"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onInput={(e) => dispatch(searchTeams({ search: e.target.value }))}
      />
      <SpecialIconButton
        onClick={() => dispatch(searchTeams({ search: searchInput }))}
      >
        <SearchOutlined sx={{ color: (theme) => theme.palette.primary.main }} />
      </SpecialIconButton>
    </Box>
  );
};

export default Search;
