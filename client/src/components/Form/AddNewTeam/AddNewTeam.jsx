import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import "../Form.css";
import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import { TeamModalContext } from "@/context/TeamModalContext";
import Head from "@/components/Head/Head";
import { GroupAddRounded } from "@mui/icons-material";

const AddNewTeam = ({ formik }) => {
  const { handleToggleAddNewTeamModal } = useContext(TeamModalContext);
  return (
    <Box className={`grid aic jcs g20 add_new_team_form_contain`}>
      <Box className={`flex jcc aic g10 add_new_team_title`}>
        <GroupAddRounded
          sx={{ color: (theme) => theme.palette.primary.main }}
        />
        <Head
          title={"Add New Team"}
          h={"h4"}
          color={(theme) => theme.palette.primary.main}
        nowrap={true}
        />
      </Box>
      <Box className={`grid aic jcs g20`}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
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
      </Box>
      <Box className={`flex jcfe aic g20`}>
        <MainButton type="submit">Add</MainButton>
        <RedButton onClick={handleToggleAddNewTeamModal}>Cancel</RedButton>
      </Box>
    </Box>
  );
};

export default AddNewTeam;
