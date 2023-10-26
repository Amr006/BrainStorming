import React, { useContext } from "react";
import { Box, Grow } from "@mui/material";
import styles from "./TeamBox.module.css";
import { MainButton } from "@/MUIComponents/MainButton/MainButton";
import { TeamModalContext } from "@/context/TeamModalContext";
import axios from "axios";
import { handleAlertToastify } from "../../functions/reactToastify";
import { LoadingButtonContext } from "@/context/LoadingButtonContext";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Head from "../Head/Head";
import { motion } from "framer-motion";
// import { socket } from "../../../app/Main/Main";

const TeamBox = ({ data }) => {
  const { handleToggleJoinTeamModal, setTeamId } = useContext(TeamModalContext);
  const { setButtonLoading } = useContext(LoadingButtonContext);
  const { user_id, token } = useSelector((state) => state.auth);
  const router = useRouter();

  const handleEnterTeam = async () => {
    setButtonLoading(true);
    await axios
      .get(process.env.NEXT_PUBLIC_SERVER_URL + `/EnterTeam/${data._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        router.push(`/teams/${data._id}`);
      })
      .catch((err) => {
        try {
          handleAlertToastify(err.response.data.message, "error");
        } catch (error) {
          handleAlertToastify(error, "error");
        }
      });
    setButtonLoading(false);
  };

  const handleJoinTeam = () => {
    handleToggleJoinTeamModal();
    setTeamId(data._id);
  };
  return (
    <Grow in={true}>
      <Box className={`grid jcs aic ${styles.room}`}>
        <Box
          className={`flex jcc aic ${styles.room_image_box}`}
          sx={{
            backgroundColor: (theme) => theme.palette.white,
            backgroundImage: `url(${data.Image})`,
          }}
        ></Box>
        <Box className={`grid jcs aic g20 ${styles.room_data}`}>
          <Box className={`grid jcc aic`}>
            <Head
              title={data.Name}
              teamName={true}
              align="center"
              color="#333"
              h="h5"
            />
          </Box>
          <Box className={`grid jcc aic ${styles.room_button}`}>
            {data.Members.includes(user_id) ? (
              <MainButton
                component={motion.button}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleEnterTeam}
              >
                Enter
              </MainButton>
            ) : (
              <MainButton
                component={motion.button}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 1 },
                }}
                whileTap={{ scale: 0.9 }}
                onClick={handleJoinTeam}
              >
                Join
              </MainButton>
            )}
          </Box>
        </Box>
      </Box>
    </Grow>
  );
};

export default TeamBox;
