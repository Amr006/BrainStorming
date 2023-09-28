import Reacts from "react";
import { Box, Typography } from "@mui/material";
import Spark from "@/components/Spark/Spark";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from "js-cookie";
import { handleAlertToastify } from "@/functions/reactToastify";
import LoadingSpark from "@/components/Spark/LoadingSpark";
import { useState } from "react";
import axios from "axios";

const SparksSection = () => {
  const { id } = useParams();
  const [sparks, setSparks] = useState([]);
  const [counter, setCounter] = useState(0);
  const [done, setDone] = useState(false);
  const token = Cookies.get("token");
  const handleFetchTeamSparks = async () => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}?limit=5&page=${counter}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.message === "last spark") {
          setDone(true);
        }
        setSparks(res.data.data);
      })
      .catch((err) => {
        handleAlertToastify(err.response.data.message, "error");
      });
  };
  useEffect(() => {
    handleFetchTeamSparks();
  }, []);

  return (
    <Box className={`grid jcs aic g30`}>
      {sparks.length > 0 ? (
        sparks.map((spark, i) => {
          if (i === sparks.length - 1) {
            return (
              <>
                <Spark key={i} data={spark} />
                {!done && (
                  <>
                    <LoadingSpark
                      key={i * 100}
                      setCounter={setCounter}
                      setSparks={setSparks}
                      last={true}
                      done={done}
                      setDone={setDone}
                      counter={counter}
                    />
                    <LoadingSpark />
                    <LoadingSpark />
                    <LoadingSpark />
                  </>
                )}
              </>
            );
          }
          return <Spark key={i} data={spark} />;
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
