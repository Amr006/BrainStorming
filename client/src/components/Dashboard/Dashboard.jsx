import React from "react";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import Spark from "../Spark/Spark";
import LoadingDashboard from "./LoadingDashboard";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import LoadingSpark from "../Spark/LoadingSpark";
import { handleAlertToastify } from "@/functions/reactToastify";

const Dashboard = () => {
  // const { userSparks, isLoading } = useSelector((state) => state.user_sparks);
  const [userSparks, setUserSparks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [totalSparks , setTotalSparks] = useState(0)
  const token = Cookies.get("token");
  const [done, setDone] = useState(false);

  const handleFetchUserSparks = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/allIdeas?page=${counter}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.message === "last spark") {
          setDone(true);
        }
        setTotalSparks(res.data.totalSparks)
        setUserSparks(res.data.data);
      })
      .catch((err) => {
        handleAlertToastify(err.response.data.message, "error");
      });
  };

  useEffect(() => {
    handleFetchUserSparks();
  }, []);
  return (
    <MyBox>
      <Container className={`grid jcs aic g30`}>
        {userSparks.length > 0 ? (
          userSparks.map((spark, i) => {
            if (i === userSparks.length - 1) {
              return (
                <>
                  <Spark key={i} data={spark} teamShow={true} />
                  {!done && (
                    <>
                      <LoadingSpark
                        key={i * 100}
                        setCounter={setCounter}
                        setUserSparks={setUserSparks}
                        last={true}
                        done={done}
                        setDone={setDone}
                        counter={counter}
                        all={true}
                      />
                      <LoadingSpark />
                      <LoadingSpark />
                      <LoadingSpark />
                    </>
                  )}
                </>
              );
            }
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
