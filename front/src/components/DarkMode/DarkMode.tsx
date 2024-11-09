"use client";
import React, { useEffect, useState } from "react";
import "./style.css";
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
export default function DarkMode() {
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const position = localStorage.getItem("darkMode");
    if (position) {
      document.body.classList.add("dark");
      setIsDark(true);
    }
  }, [isDark]);
  const darkHandler = () => {
    const position = localStorage.getItem("darkMode");
    if (position) {
      setIsDark(false);
      localStorage.setItem("darkMode", "");
      document.body.classList.remove("dark");
    } else {
      setIsDark(true);
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", JSON.stringify("on"));
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
