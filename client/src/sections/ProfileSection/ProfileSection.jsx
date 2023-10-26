"use client"
import UserBack from "@/components/User/UserBack/UserBack";
import UserBox from "@/components/User/UserBox/UserBox";
import { Box, Container, Typography } from "@mui/material";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import UserInfo from "@/components/User/UserInfo/UserInfo";
import { DeleteRounded } from "@mui/icons-material";
import { RedIconButton } from "@/MUIComponents/RedIconButton/RedIconButton";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ProfileModalContext } from "@/context/ProfileModalContext";
import { useDispatch } from "react-redux";
import { getProfileData } from "@/store/profileSlice";

const ProfileSection = () => {
  const { signed, user_id } = useSelector((state) => state.auth);
  const { handleToggleShowDeleteAccount } = useContext(ProfileModalContext);
  const { profileData, isLoading } = useSelector((state) => state.profile);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileData(id));
  }, [id]);
  return (
    <Box>
      {
        !isLoading && profileData && (<>
          <UserBack data={profileData} isLoading={isLoading} isUser={profileData._id == user_id} />
          <Container className={`grid jcs aic g30`}>
            <UserBox />
            <UserInfo data={profileData} isLoading={isLoading} title="Bio" />
            <UserInfo data={profileData} isLoading={isLoading} title="About" />
            {signed && profileData._id == user_id && (
              <RedIconButton onClick={handleToggleShowDeleteAccount}>
                <DeleteRounded />
                <Typography variant="h6">Delete Account</Typography>
              </RedIconButton>
            )}
          </Container>
        </>)
      }
    </Box>
  );
};

export default ProfileSection;
