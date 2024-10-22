"use client";
import React from "react";
import { FaComments } from "react-icons/fa";

export default function ScollComment({
  totalComments,
}: {
  totalComments: number;
}) {
  const scrollToComments = () => {
    const element = document.getElementById("comments");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <span
      onClick={scrollToComments}
      className="flex gap-2 items-center cursor-pointer hover:text-blue-400 transition-all"
    >
      <FaComments />
      {totalComments || 0}
    </span>
  );
}
