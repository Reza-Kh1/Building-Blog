"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function FilterSearch() {
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  return (
    <div className="flex ">
      <div className="w-10/12"></div>
      <div className="w-2/12">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            مرتب سازی بر اساس
          </InputLabel>
          <Select
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
  );
}
