import React from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import Spark from "../Spark/Spark";
import LoadingDashboard from "./LoadingDashboard";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";

const Dashboard = () => {
  const { userSparks, isLoading } = useSelector((state) => state.user_sparks);
  return (
    <MyBox>
      <Container className={`grid jcs aic g30`}>
        {!isLoading ? (
          userSparks.map((spark, i) => {
            return <Spark key={i} data={spark} teamShow={true} />;
          })
        ) : (
          <LoadingDashboard />
        )}
      </Container>
    </MyBox>
  );
};

export default Dashboard;
