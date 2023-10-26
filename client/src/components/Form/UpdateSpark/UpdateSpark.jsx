import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import { Box, TextField } from "@mui/material";
import React, { useContext } from "react";
import "../Form.css";
import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import Head from "@/components/Head/Head";
import { EditRounded } from "@mui/icons-material";
import { SparkModalContext } from "@/context/SparkModalContext";
import LoadingButton from "@/components/LoadingButton/LoadingButton";

const UpdateSpark = ({ formik }) => {
  const { handleToggleUpdateSparkModal } = useContext(SparkModalContext);
  return (
    <Box className={`grid aic jcs g20 add_new_team_form_contain`}>
      <Box className={`flex jcc aic g10 add_new_team_title`}>
        <EditRounded sx={{ color: (theme) => theme.palette.primary.main }} />
        <Head
          title={"Update Spark"}
          h={"h3"}
          color={(theme) => theme.palette.primary.main}
          nowrap={true}
        />
      </Box>
      <TextField
        id="idea"
        name="idea"
        label="New Idea"
        fullWidth
        multiline
        maxRows={4}
        variant="standard"
        value={formik.values.idea}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.idea && Boolean(formik.errors.idea)}
        helperText={formik.touched.idea && formik.errors.idea}
      />
      <TextField
        id="description"
        name="description"
        label="New Brainwave"
        multiline
        fullWidth
        maxRows={10}
        variant="standard"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <Box className={`flex jcfe aic g20`}>
        <LoadingButton text={"Update"} />
        <RedButton onClick={handleToggleUpdateSparkModal}>Cancel</RedButton>
      </Box>
    </Box>
  );
};

export default UpdateSpark;
