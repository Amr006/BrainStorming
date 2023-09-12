import {
  AdminPanelSettings,
  Delete,
  EditRounded,
  MoreVertRounded,
  Person,
} from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import styles from "./Spark.module.css";
import { useState } from "react";
import { SparkModalContext } from "@/context/SparkModalContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { handleSparkDate } from "@/app/handleSparkDate";

const SparkHead = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user_id } = useSelector((state) => state.auth);
  console.log(data)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const [openList, setOpenList] = useState(false);
  const {
    handleToggleDeleteSparkModal,
    handleToggleUpdateSparkModal,
    setSparkId,
    setUpdateIdea,
    setUpdateDescription,
  } = useContext(SparkModalContext);
  const { team } = useSelector((state) => state.team);
  if (typeof document !== "undefined") {
    document.addEventListener("click", (event) => {
      if (
        event.target.id === `list_button_${data._id}` ||
        event.target.id === `list_icon_${data._id}`
      ) {
        setOpenList(!openList);
      } else {
        setOpenList(false);
      }
    });
  }
  return (
    <Box className={`flex jcsb aic g30 ${styles.user}`}>
      <Box className={`flex jcfs aic g10 `}>
        <Link href={`/profile/${data.WrittenBy._id}`}>
          <Box className={`flex jcc aic ${styles.avatar}`}>
            <Image
              loading="lazy"
              width={100}
              height={100}
              la
              alt="avatar"
              src={data.WrittenBy.Image}
            />
          </Box>
        </Link>
        <Box className={`grid jcfs aic`}>
          <Link href={`/profile/${data.WrittenBy._id}`}>
            <Typography variant="h6" sx={{ lineHeight: "20px" }}>
              {data.WrittenBy.Name}
            </Typography>
          </Link>
          <Box className={`flex jcfs aic g5 ${styles.spark_date}`}>
            <Box className={`flex jcfs aic`}>
              <Button
                sx={{ boxShadow: "none", padding: "0px", minWidth: "auto" }}
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
              >
                <Typography variant="subtitle1">
                  {handleSparkDate(data.createdAt)}
                </Typography>
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  {new Date(data.createdAt).toDateString() +
                    " " +
                    new Date(data.createdAt).toLocaleTimeString()}
                </Typography>
              </Popover>
            </Box>
            {data.WrittenBy.Name === data.team.TeamLeader.Name ? (
              <AdminPanelSettings />
            ) : (
              <Person />
            )}
          </Box>
        </Box>
      </Box>
      {(user_id === data.WrittenBy._id || user_id === data.team.TeamLeader._id) && (
        <IconButton
          id={`list_button_${data._id}`}
          onClick={() => setOpenList(!openList)}
        >
          <MoreVertRounded
            id={`list_icon_${data._id}`}
            sx={{ color: (theme) => theme.palette.white }}
          />
        </IconButton>
      )}
      {openList && (
        <List className={`${styles.spark_options}`}>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setSparkId(data._id);
                setUpdateIdea(data.Idea);
                setUpdateDescription(data.Description);
                handleToggleUpdateSparkModal();
              }}
              className={`flex jcfs aic g10`}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <EditRounded />
              </ListItemIcon>
              <ListItemText id="update" primary="update" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => {
                setSparkId(data._id);
                handleToggleDeleteSparkModal();
              }}
              className={`flex jcfs aic g10`}
            >
              <ListItemIcon sx={{ minWidth: "auto" }}>
                <Delete />
              </ListItemIcon>
              <ListItemText id="delete" primary="Delete" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Box>
  );
};

export default SparkHead;
