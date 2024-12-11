"use client";
import { TagsType } from "@/app/type";
import Filters from "./Filters";
import CustomButton from "../CustomButton/CustomButton";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { BsFilterLeft } from "react-icons/bs";
type SelectTagType = {
  dataTags: TagsType[];
  urlPage: string;
  dataProject?: {
    name: string;
    id: string;
  }[];
};
export default function SelectTag({
  dataTags,
  urlPage,
  dataProject,
}: SelectTagType) {
  const [open, setOpen] = useState<boolean>(false);
  const search = useSearchParams();
  useEffect(() => {
    setOpen(false);
  }, [search]);
  return (
    <>
      <div className="w-full hidden md:flex md:gap-2">
        <Filters
          dataTags={dataTags}
          urlPage={urlPage}
          dataProject={dataProject}
        />
      </div>
      <div className="w-full block md:hidden text-left" aria-labelledby="menu responsive mobile in client">
        <CustomButton
          name="فیلتر"
          type="button"
          className="!w-10/12 !text-xs"
          onClick={() => setOpen((prev) => !prev)}
          iconEnd={<BsFilterLeft size={15}/>}
        />
        <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
          <div className="min-w-56 md:hidden flex flex-col gap-3 p-3 overflow-hidden h-full dark:bg-zinc-900/80">
            <Filters
              dataTags={dataTags}
              urlPage={urlPage}
              dataProject={dataProject}
            />
          </div>
        </Drawer>
      </div>
    </>
  );
}
