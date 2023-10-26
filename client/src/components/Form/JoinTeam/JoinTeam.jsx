import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import "../Form.css";
import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import { TeamModalContext } from "@/context/TeamModalContext";
import Head from "@/components/Head/Head";
import { PersonAddRounded } from "@mui/icons-material";

const JoinTeam = ({ formik }) => {
  const { handleToggleJoinTeamModal } = useContext(TeamModalContext);
  return (
    <Box className={`grid aic jcs g20 add_new_team_form_contain`}>
      <Box className={`flex jcc aic g10 add_new_team_title`}>
        <PersonAddRounded
          sx={{ color: (theme) => theme.palette.primary.main }}
        />
        <Head
          title={"Join Team"}
          h={"h3"}
          color={(theme) => theme.palette.primary.main}
          nowrap={true}
        />
      </Box>
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Box className={`flex jcfe aic g20`}>
        <MainButton type="submit">Join</MainButton>
        <RedButton onClick={handleToggleJoinTeamModal}>Cancel</RedButton>
      </Box>
    </Box>
  );
};

export default JoinTeam;
