"use client";
import React from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TeamModal from "@/components/Models/TeamModal";
import FloatActionButtons from "@/components/FloatActionButtons/FloatActionButtons";
import { useParams, usePathname } from "next/navigation";
import { PageBox } from "@/MUIComponents/PageBox/PageBox";
import BackLoading from "@/components/BackLoading/BackLoading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "@/components/Models/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "@/components/Sidebar/Sidebar";
import { useEffect } from "react";
import { getUserData } from "@/store/userSlice";
import Cookies from "js-cookie";
import { getAuthData } from "@/store/authSlice";
import SparkModal from "@/components/Models/SparkModal";
import { getUserSparks } from "@/store/userSparksSlice";
import { getTeam } from "@/store/teamSlice";
import { MyBox } from "@/MUIComponents/MyBox/MyBox";
import { io } from "socket.io-client";

export const socket = io.connect("localhost:3000");

const Main = ({ children }) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { id, unique } = useParams();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    try {
      const token = Cookies.get("token");
      const user_id = Cookies.get("user_id");
      dispatch(getAuthData({ token, user_id }));
      function socketConnected() {
        console.log("Connected to the server");
      }
      socket.on("connect", socketConnected);
      if (user_id) {
        dispatch(getUserData(user_id));
      }
      if (id) {
        dispatch(getTeam({ team_id: id, token }));
      }
    } catch (err) {
      console.log(err);
    }
  }, [Cookies, dispatch, id]);
  if (
    pathname === process.env.NEXT_PUBLIC_REGISTER_PAGE ||
    pathname === process.env.NEXT_PUBLIC_LOGIN_PAGE ||
    pathname === `/reset-password/${id}/${unique}` ||
    pathname === process.env.NEXT_PUBLIC_FORGOTPASSWORD_PAGE ||
    pathname === `/verify-account/${id}/${unique}`
  ) {
    return (
      <MyBox component={"main"} className={`flex jcc aic`}>
        <ToastContainer />
        <BackLoading />
        {children}
      </MyBox>
    );
  }

  return (
    <PageBox
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.white
            : theme.palette.black,
      }}
      component={"main"}
    >
      <Header />
      <BackLoading />
      <Sidebar />
      {children}
      <TeamModal type="add_new_team" />
      <TeamModal type="leave_team" />
      <TeamModal type="join_team" />
      <TeamModal type="view_team_image" />
      <TeamModal type="change_team_image" />
      <SparkModal type="update_spark" />
      <SparkModal type="upload_file" />
      <SparkModal type="delete_spark" />
      <SparkModal type="view_data" />
      <SparkModal type="show_data" />
      <ProfileModal type="change_cover" />
      <ProfileModal type="change_avatar" />
      <ProfileModal type="edit_profile" />
      <ProfileModal type="delete_account" />
      <ProfileModal type="view_avatar" img={userData && userData.Image} />
      <ProfileModal
        type="view_cover"
        img={userData && userData.BackgroundImage}
      />
      <FloatActionButtons />
      <ToastContainer />
      <Footer />
    </PageBox>
  );
};

export default Main;
