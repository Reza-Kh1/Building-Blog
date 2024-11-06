"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function TextSearch() {
  const searchParams = useSearchParams()
  const { tags } = Object.fromEntries(searchParams.entries());
  return (
    <h3 className="text-lg my-3">
      جستجو در تگ :
      <span className=" text-xl text-blue-400 mr-2">
        {tags}
      </span>
    </h3>
  );
}