"use client";
import React from "react";
import "../../app/globals.css";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Container, Typography } from "@mui/material";
import Head from "@/components/Head/Head";
import CreateIdeaSection from "./CreateIdeaSection/CreateIdeaSection";
import SparksSection from "./SparksSection/SparksSection";
import styles from "./TeamSection.module.css";
import roomImg from "../../../public/images/team3.jpg";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import MembersBox from "@/components/MembersBox/MembersBox";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTeam } from "@/store/teamSlice";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MainIconButton } from "@/MUIComponents/MainIconButton/MainIconButton";
import { EditRounded } from "@mui/icons-material";
import { useContext } from "react";
import { TeamModalContext } from "@/context/TeamModalContext";

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
              <MembersBox />
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
  const {
    handleToggleChangeTeamImageModal,
    handleToggleViewTeamImageModal,
    handleSetTeamImage,
  } = useContext(TeamModalContext);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const { id } = useParams();
  const { team,isLoading } = useSelector((state) => state.team);
  const router = useRouter();
  useEffect(() => {
    try {
      dispatch(getTeam({ team_id: id, token: Cookies.get("token") }));
    } catch (err) {
      router.push("/");
      handleAlertToastify("Can't Access This Page", "error");
    }
  }, []);
  return (
    !isLoading && (
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
            className={`flex jcc aic ${styles.tabs}`}
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
          <MainIconButton
            sx={{ position: "absolute", top: "10%", right: "0" }}
            onClick={handleToggleChangeTeamImageModal}
            className={`${styles.change_cover_button}`}
          >
            <EditRounded />
            <Typography variant="h6">Change Cover</Typography>
          </MainIconButton>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CreateIdeaSection />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <SparksSection />
        </CustomTabPanel>
      </Box>
    )
  );
};

export default TeamSection;
