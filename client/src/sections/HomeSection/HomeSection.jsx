"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Home from "@/components/Home/Home";
import { getUserSparks } from "@/store/userSparksSlice";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../app/Main/Main";

const HomeSection = () => {
  const { signed } = useSelector((state) => state.auth);
  const { userSparks, isLoading } = useSelector((state) => state.user_sparks);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!isLoading) {
      const token = Cookies.get("token");
      const user_id = Cookies.get("user_id");
      socket.on("receive_message", (data) => {
        console.log("hello");
        dispatch(getUserSparks({ token, user_id }));
      });
    }
    try {
      const token = Cookies.get("token");
      const user_id = Cookies.get("user_id");
      if (token && user_id) {
        console.log(1)
        dispatch(getUserSparks({ token, user_id }));
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, isLoading]);
  return signed && userSparks && userSparks.length > 0 ? (
    <Dashboard />
  ) : (
    <Home />
  );
};

export default HomeSection;
