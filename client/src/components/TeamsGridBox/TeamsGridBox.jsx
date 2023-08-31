import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import TeamBox from "../TeamBox/TeamBox";
import styles from "./TeamsGridBox.module.css";

const TeamsGridBox = ({ data }) => {
  const smallSize = useMediaQuery("(max-width:768px)");
  const verySmallSize = useMediaQuery("(max-width:640px)");
  return (
    <Box className={`grid jcs aifs g20 ${styles.rooms_box}`}>
      {verySmallSize ? (
        <Box className={`grid jcs aic g20 ${styles.rooms}`}>
          {data.map((room, i) => (
            <TeamBox key={i} data={room} />
          ))}
        </Box>
      ) : smallSize ? (
        <>
          <Box className={`grid jcs aic g20 ${styles.rooms}`}>
            {data.map(
              (room, i) => i % 2 === 0 && <TeamBox key={i} data={room} />,
            )}
          </Box>
          <Box className={`grid jcs aic g20 ${styles.rooms}`}>
            {data.map(
              (room, i) => i % 2 !== 0 && <TeamBox key={i} data={room} />,
            )}
          </Box>
        </>
      ) : (
        <>
          <Box
            cascade={true}
            direction="left"
            damping={0.0001}
            className={`grid jcs aic g20 ${styles.rooms}`}
          >
            {data.map(
              (room, i) =>
                (i === 0 || i % 3 === 0) && <TeamBox key={i} data={room} />,
            )}
          </Box>
          <Box
            cascade={true}
            direction="up"
            damping={0.0001}
            className={`grid jcs aic g20 ${styles.rooms}`}
          >
            {data.map(
              (room, i) =>
                (i - 1 === 0 || (i - 1) % 3 === 0) && (
                  <TeamBox key={i} data={room} />
                ),
            )}
          </Box>
          <Box
            cascade={true}
            direction="right"
            damping={0.0001}
            className={`grid jcs aic g20 ${styles.rooms}`}
          >
            {data.map(
              (room, i) =>
                (i - 2 === 0 || (i - 2) % 3 === 0) && (
                  <TeamBox key={i} data={room} />
                ),
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default TeamsGridBox;