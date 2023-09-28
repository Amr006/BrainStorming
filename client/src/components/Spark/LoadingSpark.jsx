import React from "react";
import { Box, Skeleton } from "@mui/material";
import styles from "./Spark.module.css";
import LoadingSparkHead from "./LoadingSparkHead";
import { useInView } from "react-intersection-observer";
import { useDispatch, useSelector } from "react-redux";
import { getSparks } from "@/store/sparksSlice";
import { useParams } from "next/navigation";
import axios from "axios";

const LoadingSpark = ({ last, setSparks, setCounter, counter ,setDone, done}) => {
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const handleFetchTeamSparks = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}?limit=5&page=${
          counter + 1
        }`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setSparks((prev) => [...prev, ...res.data.data]);
        if (res.data.message !== "last spark") {
          setCounter(counter + 1);
        }else{
          setDone(true)
        }
      })
      .catch((err) => {
        handleAlertToastify(err.response.data.message, "error");
      });
  };
  const { ref, inView } = useInView({
    threshold: 0,
  });
  if (inView && last && !done) {
    handleFetchTeamSparks();
  }
  return (
    <Box
      className={`grid jcs aic g10 ${styles.spark} ${styles.loading_spark}`}
      ref={last && ref}
    >
      <LoadingSparkHead />
      <Box className={`grid jcs aic g10 ${styles.spark_data}`}>
        <Box className={`grid jcfs aic g10 ${styles.loading_spark_data}`}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </Box>
    </Box>
  );
};

export default LoadingSpark;
