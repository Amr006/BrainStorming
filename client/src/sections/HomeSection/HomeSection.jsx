"use client";
import Dashboard from "@/components/Dashboard/Dashboard";
import Home from "@/components/Home/Home";
import { getUserSparks, reset } from "@/store/userSparksSlice";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../../app/Main/Main";

const HomeSection = () => {
  const { signed } = useSelector((state) => state.auth);
  const { sparks, counter } = useSelector((state) => state.user_sparks);
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserSparks({ counter, token }));
  }, [dispatch]);
  return signed && sparks && sparks.length > 0 ? <Dashboard /> : <Home />;
};

export default HomeSection;
