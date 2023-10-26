import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import Head from "@/components/Head/Head";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { TeamModalContext } from "@/context/TeamModalContext";
import { Box } from "@mui/material";
import React from "react";
import { useContext } from "react";

const LeaveTeam = () => {
  const { handleToggleLeaveTeamModal } = useContext(TeamModalContext);
  return (
    <>
      <Head
        align={"center"}
        h={"h5"}
        title={"Are you sure to Leave a Team ?"}
        color={"#000"}
        nowrap={true}
      />
      <Box className={`flex jcfe aic g20`}>
        <LoadingButton text={"delete"} />
        <RedButton onClick={handleToggleLeaveTeamModal}>Cancel</RedButton>
      </Box>
    </>
  );
};

export default LeaveTeam;
