import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
} from "@mui/material";
import Head from "../Head/Head";
import styles from "./MembersBox.module.css";
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import LoadingMember from "./LoadingMember";

const LoadingMembersBox = () => {
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (_, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const len = Math.floor(Math.random() * 6) + 5;
  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      className={`grid jcs aic  ${styles.members_box}`}
    >
      <AccordionSummary
        className={`flex jcs aic ${styles.members_box_summary}`}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Box className={`flex jcsb aic g30 ${styles.members_box_head}`}>
          <Head title={"Members"} color={"#000"} align={"left"} h={"h5"} />
          {expanded !== "panel1" ? (
            <KeyboardArrowDownRounded />
          ) : (
            <KeyboardArrowUpRounded />
          )}
        </Box>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <Box className={`grid jcs aic g10 ${styles.members}`}>
          {Array.from({ length: len }, () => 0).map((_, i) => (
            <LoadingMember key={i} />
          ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default LoadingMembersBox;
