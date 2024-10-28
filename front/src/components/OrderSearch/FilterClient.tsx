"use client";
import { TagsType } from "@/app/type";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function FilterClient({ nameTags }: { nameTags: TagsType[] }) {
  const searchPara = useSearchParams();
  const { order, search, tags } = Object.fromEntries(searchPara.entries());
  
  return (
    <div>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={nameTags}
        getOptionLabel={(option) => option.name}
        defaultValue={[]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
        <Select
          className="shadow-md"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue={order || "createdAt-DESC"}
          label="مرتب سازی بر اساس"
        >
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
        </Select>
      </FormControl>
    </div>
  );
}
