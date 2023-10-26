import React from "react";
import { Box, Tooltip, Typography } from "@mui/material";
import styles from "./Head.module.css";

const Head = ({ title, nowrap ,align, h, color, special }) => {
  return (
    <Box
      className={`flex aic ${
        align === "center" ? "jcc tac" : align === "left" ? "jcfs" : "jcfe"
      } ${styles.head} ${special && styles.head_special}`}
      sx={{
        position: "relative",
      }}
      data-testid="title"
    >
      {title && !nowrap && title.length > 20 ? (
        <Tooltip title={title} arrow>
          <Typography 
            sx={{ textAlign: { align }, color: color ? color : "#333" }}
            variant={h}
          >
            {title.slice(0, 20) + "..."}
          </Typography>
        </Tooltip>
      ) : (
        <Typography
          sx={{ textAlign: { align }, color: color ? color : "#333" }}
          variant={h}
          data-testid="title_paragraph"
        >
          {title}
        </Typography>
      )}
    </Box>
  );
};

export default Head;
