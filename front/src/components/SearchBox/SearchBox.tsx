"use client";
import { fetchApi } from "@/action/fetchApi";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose, MdManageSearch } from "react-icons/md";
import LoadingSearch from "../LoadingSearch/LoadingSearch";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import CustomButton from "../CustomButton/CustomButton";
import { AllCardPostType, AllExpertType, AllProjectType, CardPostType, CardProjectsType, ExpertType } from "@/app/type";
import CardPost from "../CardPost/CardPost";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormControl, MenuItem, Select } from "@mui/material";
import CardProjects from "../CardProjects/CardProjects";
import CardExperts from "../CardExperts/CardExperts";
export default function SearchBox() {
  const [filterName, setFilterName] = useState<"post" | "project" | "expert" | string>("post")
  const [isShow, setIsShow] = useState<boolean>(false);
  const [valSearch, setValSearch] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timerLoading, setTimerLoading] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<AllCardPostType | AllProjectType | AllExpertType | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const ref = useRef<HTMLInputElement>(null);
  const paramasPath: string = usePathname()
  const paramsQuery = useSearchParams()
  const route = useRouter()
  useEffect(() => {
    setIsShow(false)
    const search = Object.fromEntries(
      paramsQuery.entries()
    );
    if (search?.search) {
      setValSearch(search.search)
    } else {
      setValSearch("")
    }
    const filterNameParam = paramasPath.split("/")[1] === "experts" ? "expert" : paramasPath.split("/")[1] === "project" ? "project" : "post"
    setFilterName(filterNameParam)
  }, [paramasPath, paramsQuery])
  useEffect(() => {
    if (isShow && ref.current) {
      ref.current.focus();
    }
  }, [isShow]);
  const timerSearch = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setValSearch(value);
    if (timerLoading) {
      clearTimeout(timerLoading);
    }
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      searchHandler(value);
    }, 1500);
    if (target.value) {
      const newTimerLoading = setTimeout(() => {
        setLoading(true);
      }, 200);
      setTimerLoading(newTimerLoading);
    }
    setLoading(false);
    setTimer(newTimer);
    setIsSearch(false)
  };
  const searchHandler = async (searchValue: string) => {
    if (!searchValue) return;
    setLoading(false);
    let url
    if (filterName === "post") {
      url = `post?search=${searchValue}&order=createdAt-DESC`;
    }
    if (filterName === "project") {
      url = `project?order=createdAt-DESC&search=${searchValue}`;
    }
    if (filterName === "expert") {
      url = `worker?order=createdAt-DESC&search=${searchValue}`;
    }
    if (!url) return
    fetchApi({ url, method: "GET" })
      .then((data) => {
        setData(data);
      })
      .catch(() => {
        toast.error("به مشکل برخوردیم !");
      })
      .finally(() => {
        setLoading(false);
        setIsSearch(true)
      });
  };
  return (
    <>
      <div className="w-2/12 flex items-center">
        <div className="mr-3 text-gray-800 dark:text-gray-300">
          <i onClick={() => setIsShow(true)} className="cursor-pointer">
            <BsSearch size={22} />
          </i>
        </div>
      </div>
      <div
        className={`w-full absolute transition-all right-0 top-36 ${isShow ? "opacity-100 z-20 !top-28" : "opacity-0 -z-20 pointer-events-none"}`}
      >
        <div className="max-w-7xl transition-all rounded-xl p-3 mx-auto flex justify-between items-center bg-gradient-to-tr from-blue-200/70  to-gray-100/60 dark:from-slate-700 dark:to-zinc-500 backdrop-blur-lg">
          <div className="w-11/12 relative bg-white p-2 rounded-full shadow-md">
            <input
              ref={ref}
              value={valSearch}
              onChange={timerSearch}
              type="text"
              onKeyDown={(props) => {
                if (props.key === "Enter") {
                  let url
                  if (filterName === "post") {
                    url = `blog?search=${valSearch}&order=createdAt-DESC`;
                  }
                  if (filterName === "project") {
                    url = `project?order=createdAt-DESC&search=${valSearch}`;
                  }
                  if (filterName === "expert") {
                    url = `experts?order=createdAt-DESC&search=${valSearch}`;
                  }
                  if (!url) return
                  route.push(url)
                }
              }}
              className="p-3 bg-transparent w-full border-b-black focus-visible:outline-none"
              placeholder="جستجوی هوشمند..."
            />
            {loading && (
              <i className="absolute left-36 flex p-2 top-1/2 text-xl transform -translate-y-1/2">
                <LoadingSearch />
              </i>
            )}
            < Link href={`/${filterName === "post" ? "blog" : filterName === "expert" ? "experts" : "project"}?page=1&order=createdAt-DESC&search=` + valSearch} className="absolute text-xl left-2 transform top-1/2 -translate-y-1/2">
              <i className="p-3 rounded-full shadow-md block hover:bg-blue-600/70 bg-blue-400/90 text-white">
                <FaSearch />
              </i>
            </Link>
            <div className="absolute left-12 transform top-1/2 -translate-y-1/2">
              <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                <Select
                  id="demo-select-small"
                  value={filterName}
                  variant="standard"
                  onChange={({ target }) => {
                    setData(null)
                    setValSearch("")
                    setFilterName(target.value)
                  }}
                >
                  <MenuItem value="post">
                    پست ها
                  </MenuItem>
                  <MenuItem value="project">
                    پروژه ها
                  </MenuItem>
                  <MenuItem value="expert">
                    مجری ها
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <span className="w-1/12 text-left flex justify-end">
            <i
              onClick={() => setIsShow(false)}
              className="cursor-pointer bg-blue-500/50 hover:bg-blue-600/70 text-white shadow-md transition-all rounded-full p-3"
            >
              <MdClose size={20} />
            </i>
          </span>
        </div>
      </div >
      <div
        className={`-z-20 h-screen opacity-0 absolute w-full top-52 left-0 flex justify-center transition-all ${valSearch && isShow ? "z-20 opacity-100 top-48" : "invisible"
          }`}
      >
        <div className="max-w-7xl h-3/4 overflow-y-auto w-full bg-gradient-to-tr from-blue-300/60 backdrop-blur-md to-gray-100/60 shadow-md p-4 rounded-lg">
          {!isSearch ? null : isSearch && data?.rows.length ?
            <>
              {filterName === "project" ?
                <div className="grid grid-cols-3 gap-3">
                  {data.rows.map((item, index) => (
                    <CardProjects project={item as CardProjectsType} key={index} />
                  ))}
                </div>
                : filterName === "expert" ?
                  <div className="grid grid-cols-4 gap-3">
                    {data.rows.map((item, index) => (
                      <CardExperts {...item as ExpertType} key={index} />
                    ))}
                  </div> :
                  <div className="grid grid-cols-3 gap-3">
                    {data.rows.map((item, index) => (
                      <CardPost post={item as CardPostType} key={index} />
                    ))}
                  </div>
              }
              <Link className="mt-4 block w-1/6 mx-auto" href={`/${filterName === "post" ? "blog" : filterName === "expert" ? "experts" : "project"}?page=1&order=createdAt-DESC&search=` + valSearch}>
                <CustomButton
                  name="مشاهده همه"
                  type="button"
                  iconEnd={<MdManageSearch className="text-xl" />}
                />
              </Link>
            </>
            :
            <span className="text-xl text-gray-700">
              هیچ اطلاعاتی با کلمه جستجوی شما یافت نشد !!!
            </span>
          }
        </div>
      </div>
    </>
  );
}