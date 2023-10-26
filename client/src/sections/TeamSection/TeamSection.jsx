"use client";
import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Container, Typography } from "@mui/material";
import Head from "@/components/Head/Head";
import CreateIdeaSection from "./CreateIdeaSection/CreateIdeaSection";
import SparksSection from "./SparksSection/SparksSection";
import styles from "./TeamSection.module.css";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import MembersBox from "@/components/MembersBox/MembersBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "@/store/teamSlice";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MainIconButton } from "@/MUIComponents/MainIconButton/MainIconButton";
import { EditRounded, ExitToAppRounded } from "@mui/icons-material";
import { useContext } from "react";
import { TeamModalContext } from "@/context/TeamModalContext";
import LoadingTeamSection from "./LoadingTeamSection";
import { RedIconButton } from "@/MUIComponents/RedIconButton/RedIconButton";
import { handleAlertToastify } from "@/functions/reactToastify";
import { socket } from "../../../app/Main/Main";

const TeamSection = () => {
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <Box
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <MyBox className={`grid jcs aifs g30 ${styles.grid_layout}`}>
              <Box className={`grid jcs aic g20`}>
                <MembersBox />
                <RedIconButton onClick={handleToggleLeaveTeamModal}>
                  <ExitToAppRounded />
                  <Typography variant="h6">Leave Team</Typography>
                </RedIconButton>
              </Box>
              {children}
            </MyBox>
          </Container>
        )}
      </Box>
    );
  }

  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(1);
  const { handleToggleLeaveTeamModal } = useContext(TeamModalContext);
  const {
    handleToggleChangeTeamImageModal,
    handleToggleViewTeamImageModal,
    handleSetTeamImage,
  } = useContext(TeamModalContext);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const { team, isLoading } = useSelector((state) => state.team);
  const { user_id } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    try {
      const token = Cookies.get("token")
      dispatch(getTeam({ team_id: id, token }));
    } catch (err) {
      router.push("/");
      handleAlertToastify("Can't Access This Page", "error");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && team) {
      socket.emit("join_room", team.Name);
    }
  }, [isLoading, socket]);

  return isLoading || !team ? (
    <LoadingTeamSection />
  ) : (
    <Box className={`grid jcs aic`}>
      <Box
        className={`grid jcc aife ${styles.room_head}`}
        sx={{ backgroundImage: `url(${team.Image})` }}
      >
        <Head
          title={team.Name}
          teamName={true}
          align="center"
          color="#fff"
          h="h2"
        />
        <Tabs
          value={value}
          centered
          onChange={handleChange}
          aria-label="basic tabs example"
          className={`${styles.tabs}`}
        >
          <Tab label="Create a Spark" {...a11yProps(0)} />
          <Tab label="Sparks" {...a11yProps(1)} />
        </Tabs>
        <Box
          className={"overlay"}
          sx={{ "&:hover": { cursor: "pointer" } }}
          onClick={() => {
            handleSetTeamImage(team.Image);
            handleToggleViewTeamImageModal();
          }}
        />
        {!isLoading && team.TeamLeader._id === user_id && (
          <MainIconButton
            sx={{ position: "absolute", top: "10%", right: "0" }}
            onClick={handleToggleChangeTeamImageModal}
            className={`${styles.change_cover_button}`}
          >
            <EditRounded />
            <Typography variant="h6">Change Cover</Typography>
          </MainIconButton>
        )}
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateIdeaSection setValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SparksSection />
      </CustomTabPanel>
    </Box>
  );
};

export default TeamSection;
