"use client";
import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Container, Skeleton } from "@mui/material";
import styles from "./TeamSection.module.css";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import LoadingCreateIdeaSection from "./CreateIdeaSection/LoadingCreateIdeaSection";
import LoadingSparksSection from "./SparksSection/LoadingSparksSection";
import LoadingMembersBox from "@/components/MembersBox/LoadingMembersBox";

const LoadingTeamSection = () => {
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
              {/* <Box className={`grid jcs aic g20`}>
                <LoadingMembersBox />
                <Skeleton variant="rectangular" height={40} width={"100%"} />
              </Box> */}
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

  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={`grid jcs aic`}>
      <Skeleton
        variant="rectangular"
        width={"100%"}
        className={`grid jcc aife ${styles.room_head}`}
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          zIndex: 1,
        }}
      />
      <Tabs
        value={value}
        centered
        onChange={handleChange}
        aria-label="basic tabs example"
        className={`flex jcc aic ${styles.tabs}`}
        sx={{
          zIndex: 2,
          bottom: "100%",
        }}
      >
        <Tab label="Create a Spark" {...a11yProps(0)} />
        <Tab label="Sparks" {...a11yProps(1)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <LoadingCreateIdeaSection />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LoadingSparksSection />
      </CustomTabPanel>
    </Box>
  );
};

export default LoadingTeamSection;
