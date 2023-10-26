import { Box } from "@mui/material";
import React, { useContext } from "react";
import "../Form.css";
import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import { FileUploader } from "react-drag-drop-files";
import Head from "@/components/Head/Head";
import { CameraAltRounded } from "@mui/icons-material";
import { ProfileModalContext } from "@/context/ProfileModalContext";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { ExtensionsContext } from "@/context/ExtensionsContext";

const ChangeCover = ({ handleChangeFile }) => {
  const { handleToggleChangeProfileCoverModal } = useContext(
    ProfileModalContext
  );
  const { images } = useContext(ExtensionsContext);
  return (
    <Box className={`grid aic jcs g20 add_new_team_form_contain`}>
      <Box className={`flex jcc aic g10 add_new_team_title`}>
        <CameraAltRounded
          sx={{ color: (theme) => theme.palette.primary.main }}
        />
        <Head
          title={"Change Profile Cover"}
          h={"h4"}
          color={(theme) => theme.palette.primary.main}
          nowrap={true}
        />
      </Box>
      <FileUploader
        handleChange={handleChangeFile}
        name="file"
        types={images}
        multiple={false}
      />
      <Box className={`flex jcfe aic g20`}>
        <LoadingButton text={"Change"} />
        <RedButton onClick={handleToggleChangeProfileCoverModal}>
          Cancel
        </RedButton>
      </Box>
    </Box>
  );
};

export default ChangeCover;
