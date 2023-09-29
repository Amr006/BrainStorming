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

const SparksSection = () => {
  const { sparks, counter, totalSparks } = useSelector((state) => state.sparks);
  const { id } = useParams();
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    dispatch(reset);
  }, []);

  useEffect(() => {
    dispatch(getSparks({ counter, token, team_id: id }));
  }, [inView]);
  return (
    <Box className={`grid jcs aic g30`}>
      {sparks.length > 0 ? (
        sparks.map((spark, i) => {
          if (i === sparks.length - 1) {
            return (
              <Fragment key={i}>
                <Spark key={i} data={spark} />
                {totalSparks > sparks.length && (
                  <LoadingSpark refProp={ref} key={1} last={true} />
                )}
              </Fragment>
            );
          } else {
            return <Spark key={i} data={spark} />;
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
