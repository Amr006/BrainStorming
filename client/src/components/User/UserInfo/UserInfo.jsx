import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./UserInfo.module.css";
import LoadingUserInfo from "./LoadingUserInfo";
import { useSelector } from "react-redux";

const UserInfo = ({ title }) => {
  const { isLoading, profileData } = useSelector((state) => state.profile)
  return !isLoading && profileData ? (
    <Box className={`grid jcs aic g10`} >
      <Typography variant="h5">{title}</Typography>
      {title.toLowerCase() === "about" ? (
        <Typography
          component={"p"}
          variant="h6"
          className={`fw500 flex jcfs aic ${styles.user_info_box}`}
          sx={{
            color: (theme) => !profileData.About && theme.palette.gray,
          }}
        >
          {profileData.About ? profileData.About : "Write a Brief..."}
        </Typography>
      ) : (
        <Typography
          component={"p"}
          variant="h6"
          className={`fw500 flex jcfs aic ${styles.user_info_box}`}
          sx={{
            color: (theme) => !profileData.Bio && theme.palette.gray,
          }}
        >
          {profileData.Bio ? profileData.Bio : "Write a Bio..."}
        </Typography>
      )}
    </Box>
  ) : (
    <LoadingUserInfo title={title} />
  );
};

export default UserInfo;
