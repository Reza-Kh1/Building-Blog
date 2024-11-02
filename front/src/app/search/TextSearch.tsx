"use client";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function TextSearch() {
  const searchParams = useSearchParams()
  const { search } = Object.fromEntries(searchParams.entries());
  return (
    <h3 className="text-lg my-3">
      نتایج جستجو :
      <span className=" text-xl text-blue-400 mr-2">
        {search || "نمایش همه پست ها"}
      </span>
    </h3>
  );
}