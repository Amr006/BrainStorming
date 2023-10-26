import React from "react";
import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Spark from "../Spark/Spark";
import LoadingDashboard from "./LoadingDashboard";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import Cookies from "js-cookie";
import { useEffect } from "react";
import LoadingSpark from "../Spark/LoadingSpark";
import { getUserSparks, reset } from "@/store/userSparksSlice";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react";

const Dashboard = () => {
  const { sparks, counter, totalSparks } = useSelector(
    (state) => state.user_sparks
  );
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      dispatch(getUserSparks({ counter, token }));
    }
  }, [dispatch, inView]);
  return (
    <MyBox>
      <Container className={`grid jcs aic g30`}>
        {sparks.length > 0 ? (
          sparks.map((spark, i) => {
            if (i === sparks.length - 1) {
              return (
                <Fragment key={i}>
                  <Spark index={i} key={i} data={spark} teamShow={true} />
                  {totalSparks > sparks.length && (
                    <Fragment key={i + 1}>
                      <LoadingSpark refProp={ref} key={i * 100} last={true} />
                    </Fragment>
                  )}
                </Fragment>
              );
            }
            return <Spark index={i} key={i} data={spark} teamShow={true} />;
          })
        ) : (
          <LoadingDashboard />
        )}
      </Container>
    </MyBox>
  );
};

export default Dashboard;
