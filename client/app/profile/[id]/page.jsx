"use client"
import { SpecialBox } from "@/MUIComponents/SpecialBox/SpecialBox";
import ProfileSection from "@/sections/ProfileSection/ProfileSection";
import React from "react";

const User = () => {
  return (
    <SpecialBox data-testid={"profile_box"}>
      <ProfileSection />
    </SpecialBox>
  );
};

export default User;
