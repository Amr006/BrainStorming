import React from "react";
import styles from "./SpecialImage.module.css";
import { Box } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";

const SpecialImage = ({
  str,
  handleDataPosting,
  handleDataView,
  img,
  posting,
  overlay,
  slider,
}) => {
  return slider ? (
    <Box sx={{ position: "absolute" }} className={`center_x`}>
      <LazyLoadImage src={img} alt={"post"} />
    </Box>
  ) : (
    <Box
      sx={{
        "&:after": overlay && { content: str },
      }}
      className={`flex aic jcc ${styles.image_box}`}
      onClick={posting ? handleDataPosting : handleDataView}
    >
      <Box
        className={`${overlay && "overlay"} ${overlay && styles.overlay} ${
          styles.back_img
        }`}
      />
      <LazyLoadImage src={img} alt={"post"} />
    </Box>
  );
};

export default SpecialImage;
