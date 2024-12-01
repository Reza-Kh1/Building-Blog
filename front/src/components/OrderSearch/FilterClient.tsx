"use client";
import { FilterQueryType, TagsType } from "@/app/type";
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LuFilter } from "react-icons/lu";
import React, { useEffect, useState } from "react";
import { MdClose, MdDataSaverOn } from "react-icons/md";
import CustomButton from "../CustomButton/CustomButton";
import { Box } from "@mui/system";
import Link from "next/link";
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
  const params = usePathname()
  const [open, setOpen] = useState<boolean>(false)
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
  let namePage = ""
  if (pathName.includes("blog")) {
    namePage = "/blog"
  } else if (pathName.includes("expert")) {
    namePage = "/expert"
  } else {
    namePage = "/project"
  }

  paramsQuery.page = "1";
  useEffect(() => {

  }, [params])
  return (
    <>
      <div className=" w-3/5 text-left mr-auto md:hidden">
        <CustomButton
          name="فیلتر"
          type="button"
          className="dark:!shadow-low-dark !text-xs"
          iconEnd={<LuFilter />}
          onClick={() => setOpen(true)}
        />
      </div>
      <div className="hidden md:flex items-center gap-5">
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
              router.replace(pathName + `/tag/${value.name}?` + new URLSearchParams(paramsQuery));
            }
          }}
          options={nameTags}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField name="category" className="dark:shadow-low-dark shadow-md !rounded"  {...params} label="انتخاب دسته" />}
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

            renderInput={(params) => (
              <TextField className="dark:shadow-low-dark shadow-md !rounded" {...params} name="experts" label="انتخاب مجری" />
            )}
          />
        ) : null}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">مرتب سازی</InputLabel>
          <Select
            name="order"
            fullWidth
            className="shadow-md dark:shadow-low-dark"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={({ target }) => setFilterOrder(target.value)}
            value={filterOrder}
            label="مرتب سازی"
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
      <Dialog
        fullWidth={true}
        maxWidth={"xs"}
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent className="dark:!bg-custom-dark">
          <div className="flex flex-col items-center gap-5">
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
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
              className="shadow-md dark:shadow-low-dark"
              renderInput={(params) => <TextField name="category" {...params} label="انتخاب دسته" />}
            />
            {pathName.search("/project") === 0 ? (
              <Autocomplete
                fullWidth
                size="small"
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
                className="shadow-md dark:shadow-low-dark"
                renderInput={(params) => (
                  <TextField {...params} name="expert" label="انتخاب مجری" />
                )}
              />
            ) : null}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">مرتب سازی</InputLabel>
              <Select
                name="order"
                size="small"
                fullWidth
                className="shadow-md dark:shadow-low-dark"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={({ target }) => setFilterOrder(target.value)}
                value={filterOrder}
                label="مرتب سازی"
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
        </DialogContent>
        <DialogActions className="dark:!bg-custom-dark">
          <div className="flex justify-between w-full">
            <Button size="small" onClick={() => setOpen(false)} color="primary" variant="outlined" endIcon={<MdDataSaverOn />}>ذخیره</Button>
            <Button size="small" onClick={() => setOpen(false)} color="error" variant="outlined" endIcon={<MdClose />}>بستن</Button>
          </div>
        </DialogActions>
      </Dialog >
    </>
  );
}
