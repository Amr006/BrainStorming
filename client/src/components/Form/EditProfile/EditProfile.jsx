"use client";
import React from "react";
import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { useContext } from "react";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import { ProfileModalContext } from "@/context/ProfileModalContext";
import Head from "@/components/Head/Head";

const EditProfile = ({ formik }) => {
  const [help, setHelp] = useState(false);
  const { handleToggleEditProfileModal } = useContext(ProfileModalContext);
  return (
    <>
      <Head align={"center"} h={"h3"} title={"Edit Profile"} nowrap={true} />
      <Box className={`grid jcs aic g20`}>
        <Box className={`grid jcs aic g5`}>
          <Box className={`flex jcs aic g5`}>
            <TextField
              id="name"
              name="name"
              label="Name"
              fullWidth
              maxRows={1}
              variant="standard"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </Box>
        </Box>
        <Box className={`grid jcs aic g5`}>
          <Box className={`flex jcs aic g5`}>
            <TextField
              id="bio"
              name="bio"
              label="bio"
              fullWidth
              multiline
              maxRows={4}
              variant="standard"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.bio && Boolean(formik.errors.bio)}
              helperText={formik.touched.bio && formik.errors.bio}
            />
          </Box>
        </Box>
        <Box className={`grid jcs aic g5`}>
          <Box className={`flex jcs aifs g5`}>
            <TextField
              id="about"
              name="about"
              label="About"
              multiline
              fullWidth
              maxRows={10}
              variant="standard"
              value={formik.values.about}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.about && Boolean(formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
            />
          </Box>
        </Box>
      </Box>
      <Box className={`flex jcsb aic g20`}>
        <LoadingButton text={"Update"} />
        <RedButton onClick={handleToggleEditProfileModal}>Cancel</RedButton>
      </Box>
    </>
  );
};

export default EditProfile;
