import { CameraAltRounded } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./UserBack.module.css";
import { MainIconButton } from "@/MUIComponents/MainIconButton/MainIconButton";
import { useContext } from "react";
import { ProfileModalContext } from "@/context/ProfileModalContext";
import LoadingUserBack from "./LoadingUserBack";
import { useSelector } from "react-redux";

const UserBack = () => {
  const {
    handleToggleChangeProfileCoverModal,
    handleToggleViewCoverModal,
  } = useContext(ProfileModalContext);
  const { isLoading, profileData } = useSelector((state) => state.profile)
  const { user_id } = useSelector((state) => state.auth)
  return (
    !isLoading && profileData ? (
      <Box className={`${styles.user_back}`}>
        <Box
          sx={{ backgroundImage: `url(${profileData.BackgroundImage})` }}
          className={`${styles.cover}`}
        />
        <Box
          className={`overlay ${styles.overlay}`}
          onClick={handleToggleViewCoverModal}
        ></Box>

        {profileData._id == user_id && (
          <MainIconButton
            onClick={handleToggleChangeProfileCoverModal}
            className={`${styles.change_cover_button}`}
          >
            <CameraAltRounded />
            <Typography variant="h6">Change Cover</Typography>
          </MainIconButton>
        )}
      </Box>
    ) : (<LoadingUserBack />)
  );
};

export default UserBack;
