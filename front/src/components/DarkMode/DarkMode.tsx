"use client";
import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { ThemeContext } from "@/context/ThemeContext";
export default function DarkMode() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const { setMode, mode } = useContext(ThemeContext);
  useEffect(() => {
    const position = localStorage.getItem("darkMode");
    if (position) {
      document.body.classList.add("dark");
      setIsDark(true);
      setMode(true);
    }
  }, [isDark]);
  const darkHandler = () => {
    const position = localStorage.getItem("darkMode");
    if (position) {
      setIsDark(false);
      localStorage.setItem("darkMode", "");
      document.body.classList.remove("dark");
      setMode(false);
    } else {
      setIsDark(true);
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", JSON.stringify("on"));
      setMode(true);
    }
  };
  return (
    <div
      className={`darkmode ${isDark ? "btn-dark" : ""}`}
      onClick={darkHandler}
    >
      <MdSunny color="white" className="z-10" />
      <FaMoon color="#838383" className="z-10" />
      <span className="btn-darkmode"></span>
    </div>
  );
}
