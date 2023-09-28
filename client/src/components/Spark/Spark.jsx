import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./Spark.module.css";
import Head from "../Head/Head";
import ImagesGridBox from "../GridBoxes/ImagesGridBox/ImagesGridBox";
import SparkHead from "./SparkHead";
import DocsGridBox from "../GridBoxes/DocsGridBox/DocsGridBox";
import {
  AudiotrackRounded,
  ImageRounded,
  KeyboardVoiceRounded,
  VideoLibraryRounded,
} from "@mui/icons-material";
import AudioGridBox from "../GridBoxes/AudioGridBox/AudioGridBox";
import TeamName from "./TeamName";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { getSparks } from "@/store/sparksSlice";
import { handleAlertToastify } from "@/functions/reactToastify";
import axios from "axios";

const Spark = ({ data, teamShow }) => {
  return (
    <Box className={`grid jcs aic`}>
      {teamShow && <TeamName data={data} />}
      <Box className={`grid jcs aic g10 ${styles.spark}`}>
        <SparkHead data={data} />
        <Box className={`grid jcs aic g20 ${styles.spark_data}`}>
          <Box className={`grid jcfs aic g10`}>
            <Head h={"h5"} align="left" title={data.Idea} color={"#000"} />
            <Typography variant="h6" className={`fw500`}>
              {data.Description}
            </Typography>
          </Box>
          {data.Record.length > 0 && (
            <Box className={`grid jcs aic g10`}>
              <Box className={`flex jcfs aic g5`}>
                <KeyboardVoiceRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                  className={`${styles.file_icon}`}
                />
                <Typography variant="h6">Record</Typography>
              </Box>
              <audio src={data.Record} controls={true} />
            </Box>
          )}
          {data.Images && data.Images.length > 0 && (
            <Box className={`grid jcs aic g10`}>
              <Box className={`flex jcfs aic g5`}>
                <ImageRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                  className={`${styles.file_icon}`}
                />
                <Typography variant="h6">Images</Typography>
              </Box>
              <ImagesGridBox data={data.Images} />
            </Box>
          )}
          {data.Files && data.Files.length > 0 && (
            <Box className={`grid jcs aic g10`}>
              <Box className={`flex jcfs aic g5`}>
                <VideoLibraryRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                  className={`${styles.file_icon}`}
                />
                <Typography variant="h6">Documents</Typography>
              </Box>
              <DocsGridBox data={data.Files} />
            </Box>
          )}
          {data.Audios && data.Audios.length > 0 && (
            <Box className={`grid jcs aic g10`}>
              <Box className={`flex jcfs aic g5`}>
                <AudiotrackRounded
                  sx={{ color: (theme) => theme.palette.primary.main }}
                  className={`${styles.file_icon}`}
                />
                <Typography variant="h6">Audios</Typography>
              </Box>
              <AudioGridBox data={data.Audios} />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Spark;
