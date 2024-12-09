"use client";
import { TagsType } from "@/app/type";
import Filters from "./Filters";
import CustomButton from "../CustomButton/CustomButton";
import { FaFilter } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { useSearchParams } from "next/navigation";
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
          className="!w-1/2"
          onClick={() => setOpen((prev) => !prev)}
          iconEnd={<FaFilter size={15}/>}
        />
        <Drawer anchor={"right"} open={open} onClose={() => setOpen(false)}>
          <div className="min-w-56 md:hidden flex flex-col gap-2 p-3">
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
