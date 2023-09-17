import React from "react";
import { Typography, IconButton } from "@mui/material";
import styles from "./Logo.module.css";
import { EmojiObjects } from "@mui/icons-material";
import Link from "next/link";

const Logo = ({ title, color, align }) => {
  return (
    <Link
      className={`${styles.logo} flex ${
        align && align === "center" ? "jcc" : "jcfs"
      } aic g10 ${styles.logo}`}
      href={`${process.env.NEXT_PUBLIC_HOME_PAGE}`}
    >
      <IconButton
        data-testid={"logo_button"}
      >
        <EmojiObjects
          sx={{
            color: (theme) =>
              color === "#333"
                ? theme.palette.primary.main
                : theme.palette.white,
          }}
          className={`${styles.logo_icon}`}
          data-testid="logo_icon"
        />
        {title && (
          <Typography  variant="h6" sx={{ color: color }} className={`fw700`}>
            BrainStorming
          </Typography>
        )}
      </IconButton>
    </Link>
  );
};

export default Logo;
