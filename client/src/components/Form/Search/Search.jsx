import { Box, TextField } from "@mui/material";
import React from "react";
import styles from "./Search.module.css";
import { SearchOutlined } from "@mui/icons-material";
import { SpecialIconButton } from "@/MUIComponents/SpecialIconButton/SpecialIconButton";
import axios from "axios";

const Search = () => {
  // const handleSearchForTeamName = async() => {
  //   await axios
  //     .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/deleteAccount`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => {
  //       handleAlertToastify(res.data.message, "success");
  //       dispatch(logOut());
  //       router.push("/");
  //       handleToggleShowDeleteAccount();
  //     })
  //     .catch((err) => {
  //       try {
  //         handleAlertToastify(err.response.data.message, "info");
  //       } catch (err) {
  //         handleAlertToastify(err, "error");
  //       }
  //     });
  // };
  return (
    <Box className={`flex jcs aic g30 pad20 ${styles.search_box}`}>
      <TextField
        id="standard-search"
        label="Search Team Name..."
        type="search"
        variant="standard"
      />
      <SpecialIconButton>
        <SearchOutlined sx={{ color: (theme) => theme.palette.primary.main }} />
      </SpecialIconButton>
    </Box>
  );
};

export default Search;
