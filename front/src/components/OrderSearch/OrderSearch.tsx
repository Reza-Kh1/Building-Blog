"use client";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function OrderSearch() {
  const [filter, setFilter] = React.useState<string>("");
  const searchParams = useSearchParams();
  const { order, search } = Object.fromEntries(searchParams.entries());
  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
      <Select
        className="shadow-md"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={order ? order : filter}
        label="مرتب سازی بر اساس"
        onChange={handleChange}
      >
        <MenuItem value={"createdAt-ASC"}>
          <Link
            href={{
              query: `${
                search ? "search=" + search + "&" : ""
              }order=createdAt-ASC&page=1`,
            }}
          >
            قدیمی ترین
          </Link>
        </MenuItem>
        <MenuItem value={"createdAt-DESC"}>
          <Link
            href={{
              query: `${
                search ? "search=" + search + "&" : ""
              }order=createdAt-DESC&page=1`,
            }}
          >
            جدید ترین
          </Link>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
