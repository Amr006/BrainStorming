import { RedButton } from "@/MUIComponents/RedButton/RedButton";
import Head from "@/components/Head/Head";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { SparkModalContext } from "@/context/SparkModalContext";
import { Box } from "@mui/material";
import React from "react";
import { useContext } from "react";

const DeleteSpark = () => {
  const { handleToggleDeleteSparkModal } = useContext(SparkModalContext);
  return (
    <>
      <Head
        align={"center"}
        h={"h5"}
        title={"Are you sure to delete a spark ?"}
        color={"#000"}
        nowrap={true}
      />
      <Box className={`flex jcfe aic g20`}>
        <LoadingButton text={"delete"} />
        <RedButton onClick={handleToggleDeleteSparkModal}>Cancel</RedButton>
      </Box>
    </>
  );
};

export default DeleteSpark;
