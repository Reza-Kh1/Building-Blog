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
type FilterClienttype = {
  nameTags: TagsType[];
  nameExpert: { id: string; name: string }[];
};
export default function FilterClient({
  nameTags,
  nameExpert,
}: FilterClienttype) {
  const searchParam = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  const paramsQuery: FilterQueryType = Object.fromEntries(
    searchParam.entries()
  );
  const [filterOrder, setFilterOrder] = useState<string>(
    paramsQuery?.order || "createdAt-DESC"
  );
  const [filterExpert, setFilterExpert] = useState<{
    id: string;
    name: string;
  }>({
    id: paramsQuery?.expert || "",
    name:
      nameExpert.find((i: any) => i.id === Number(paramsQuery?.expert))?.name ||
      "",
  });
  const [filterTags, setFilterTags] = useState<{ name: string }>({
    name: paramsQuery?.tags || "",
  });
  paramsQuery.page = "1";
  return (
    <div className="flex items-center gap-5">
      <Autocomplete
        fullWidth
        disablePortal
        value={filterTags}
        onChange={(_, value) => {
          setFilterTags({ name: value?.name || "" });
          if (value === null) {
            const { tags, ...other } = paramsQuery;
            router.replace(pathName + "?" + new URLSearchParams(other));
          } else {
            paramsQuery.tags = value?.name;
            router.replace(pathName + "?" + new URLSearchParams(paramsQuery));
          }
        }}
        options={nameTags}
        getOptionLabel={(option) => option.name}
        className="shadow-md"
        renderInput={(params) => <TextField {...params} label="انتخاب دسته" />}
      />
      {pathName.search("/project") === 0 ? (
        <Autocomplete
          fullWidth
          disablePortal
          value={filterExpert}
          onChange={(_, value) => {
            setFilterExpert({ id: value?.id || "", name: value?.name || "" });
            if (value === null) {
              const { expert, ...other } = paramsQuery;
              router.replace(pathName + "?" + new URLSearchParams(other));
            } else {
              paramsQuery.expert = value?.id;
              router.replace(pathName + "?" + new URLSearchParams(paramsQuery));
            }
          }}
          options={nameExpert}
          getOptionLabel={(option) => option.name}
          className="shadow-md"
          renderInput={(params) => (
            <TextField {...params} label="انتخاب مجری" />
          )}
        />
      ) : null}
        
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">مرتب سازی بر اساس</InputLabel>
        <Select
          fullWidth
          className="shadow-md"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={({ target }) => setFilterOrder(target.value)}
          value={filterOrder}
          label="مرتب سازی بر اساس"
        >
          <MenuItem
            value={"createdAt-DESC"}
            onClick={() => {
              paramsQuery.order = "createdAt-DESC";
              router.replace(pathName + "?" + new URLSearchParams(paramsQuery));
            }}
          >
            جدید ترین
          </MenuItem>
          <MenuItem
            value={"createdAt-ASC"}
            onClick={() => {
              paramsQuery.order = "createdAt-ASC";
              router.replace(pathName + "?" + new URLSearchParams(paramsQuery));
            }}
          >
            قدیمی ترین
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
