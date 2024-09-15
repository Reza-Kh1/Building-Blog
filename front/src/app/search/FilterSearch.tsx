"use client";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import React from "react";
export default function FilterSearch() {
  const [age, setAge] = React.useState("");
  const search = useSearchParams().get("search")
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="w-10/12">
          <Breadcrums />
        </div>
        <div className="w-2/12">
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              مرتب سازی بر اساس
            </InputLabel>
            <Select
              className="shadow-md"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="مرتب سازی بر اساس"
              onChange={handleChange}
            >
              <MenuItem value={"created-ASC"}>قدیمی ترین</MenuItem>
              <MenuItem value={"created-DESC"}>جدید ترین</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div>
        <h3 className="text-lg my-3">
          نتایج جستجو :
          <span className="font-semibold text-blue-400 mr-2">
            {search}
          </span>
        </h3>
      </div>
    </>
  );
}