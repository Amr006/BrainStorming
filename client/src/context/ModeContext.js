"use client";

import { createContext, useContext, useState } from "react";

export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const toggle = () => {
    setMode(mode === "dark" ? "light" : "dark");
    console.log(1)
  };

  return (
    <ModeContext.Provider value={{ toggle, mode }}>
      {children}
    </ModeContext.Provider>
  );
};
