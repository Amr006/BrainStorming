import React from "react";
import { Box, Typography } from "@mui/material";
import Spark from "@/components/Spark/Spark";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import LoadingSpark from "@/components/Spark/LoadingSpark";
import { useDispatch, useSelector } from "react-redux";
import { getSparks, reset } from "@/store/sparksSlice";
import { useInView } from "react-intersection-observer";
import { Fragment } from "react";
import { socket } from "../../../../app/Main/Main";
import { getUserSparks } from "@/store/userSparksSlice";

const SparksSection = () => {
  const { sparks, counter, isLoading, totalSparks } = useSelector((state) => state.sparks);
  const { id } = useParams();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
  });
  socket.on('receive_message', (data) => {
    console.log(data)
    dispatch(getSparks({ token, team_id: id, newSpark: data }))
    dispatch(getUserSparks({ token, newSpark: data }))
  })
  useEffect(() => {
    if (inView) {
      dispatch(getSparks({ counter, token, team_id: id }));
    }
  }, [inView]);

  useEffect(() => {
    if (!sparks || sparks.length === 0) {
      dispatch(reset())
      dispatch(getSparks({ counter, token, team_id: id }));
    }
  }, []);
  return (
    <Box className={`grid jcs aic g30`}>
      {isLoading ? (new Array(10).fill(0).map((_, i) => (
        <LoadingSpark key={i} />
      ))) : sparks.length > 0 ? (
        sparks.map((spark, i) => {
          if (i === sparks.length - 1) {
            return (
              <Fragment key={i}>
                <Spark key={i} index={i} data={spark} />
                {totalSparks > sparks.length && (
                  <LoadingSpark refProp={ref && ref} key={1} last={true} />
                )}
              </Fragment>
            );
          } else {
            return <Spark key={i} index={i} data={spark} />;
          }
        })
      ) : (
        <Typography
          variant="h2"
          sx={{ color: (theme) => theme.palette.gray }}
          className={`tac`}
        >
          No Sparks Yet...
        </Typography>
      )}
    </Box>
  );
};

export default SparksSection;
