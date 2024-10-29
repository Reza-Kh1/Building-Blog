"use client";
import { FilterQueryType, TagsType } from "@/app/type";
import {
  Autocomplete,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

export default function FilterClient({ nameTags }: { nameTags: TagsType[] }) {
  const searchParam = useSearchParams();
  const pathName = usePathname()
  const router = useRouter()
  const paramsQuery: FilterQueryType = Object.fromEntries(searchParam.entries())
  const [filterOrder, setFilterOrder] = useState<string>(paramsQuery?.order || "createdAt-DESC")
  const [filterTags, setFilterTags] = useState<{ name: string }>({ name: paramsQuery?.tags || "" })
  paramsQuery.page = "1"
  return (
    <div className="flex items-center gap-5">
      <Autocomplete
        disablePortal
        value={filterTags}
        onChange={(_, value) => {
          setFilterTags({ name: value?.name || "" })
          paramsQuery.tags = value?.name
          router.replace(pathName + "?" + new URLSearchParams(paramsQuery))
        }}
        options={nameTags}
        getOptionLabel={(option) => option.name}
        className="w-1/2 shadow-md"
        renderInput={(params) => <TextField {...params} label="انتخاب دسته" />}
      />
      <FormControl className="w-1/2">
        <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
        <Select
          className="shadow-md"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={({ target }) => setFilterOrder(target.value)}
          value={filterOrder}
          label="مرتب سازی بر اساس"
        >
          <MenuItem value={"createdAt-DESC"} onClick={() => {
            paramsQuery.order = "createdAt-DESC"
            router.replace(pathName + "?" + new URLSearchParams(paramsQuery))
          }}>
            جدید ترین
          </MenuItem>
          <MenuItem value={"createdAt-ASC"} onClick={() => {
            paramsQuery.order = "createdAt-ASC"
            router.replace(pathName + "?" + new URLSearchParams(paramsQuery))
          }}>

            قدیمی ترین
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
