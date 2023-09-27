import Reacts from "react";
import { Box, Typography } from "@mui/material";
import Spark from "@/components/Spark/Spark";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSparks } from "@/store/sparksSlice";
import { useParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { handleAlertToastify } from "@/functions/reactToastify";
import { socket } from "../../../../app/Main/Main";

const SparksSection = () => {
  const { id } = useParams();
  const { sparks, isLoading } = useSelector((state) => state.sparks);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getSparks({ team_id: id, token: Cookies.get("token") }));
    } catch (err) {
      router.push("/");
      handleAlertToastify("Can't Access This Page", "error");
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading && id) {
      socket.on("receive_message", (data) => {
        dispatch(getSparks({ team_id: id, token: Cookies.get("token") }));
      });
    }
  }, [dispatch,isLoading]);

  return (
    <Box className={`grid jcs aic g30`}>
      {sparks.length > 0 ? (
        sparks.map((spark, i) => <Spark key={i} data={spark} />)
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
