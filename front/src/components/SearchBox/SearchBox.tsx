"use client";
import { fetchApi } from "@/action/fetchApi";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose, MdManageSearch } from "react-icons/md";
import LoadingSearch from "../LoadingSearch/LoadingSearch";
import { toast } from "react-toastify";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import CustomButton from "../CustomButton/CustomButton";
import { CardPostType } from "@/app/type";
import CardPost from "../CardPost/CardPost";
import { usePathname, useSearchParams } from "next/navigation";
export default function SearchBox() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const [valSearch, setValSearch] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timerLoading, setTimerLoading] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState<CardPostType>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const paramasPath: string = usePathname()
  const paramsQuery = useSearchParams()
  useEffect(() => {
    setIsShow(false)
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
    const url = `post?search=${searchValue}&order=${"createdAt-ASC"}&page=1`;
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
        className={`w-full absolute transition-all right-0 top-36 ${isShow ? "opacity-100 z-20 !top-28" : "opacity-0 -z-20 pointer-events-none"
          }`}
      >
        <div className="max-w-7xl transition-all rounded-xl p-3 mx-auto flex justify-between items-center bg-gradient-to-tr from-blue-300/60  to-gray-100/60 dark:from-slate-700 dark:to-zinc-500 backdrop-blur-lg shadow-md">
          <form className="w-10/12 relative">
            <input
              ref={ref}
              value={valSearch}
              onChange={timerSearch}
              type="text"
              className="p-3 bg-transparent border-b w-full border-b-black focus-visible:outline-none"
              placeholder="جستجوی هوشمند..."
            />
            {loading && (
              <div className="absolute left-0 top-0">
                <LoadingSearch />{" "}
              </div>
            )}
          </form>
          <span className="w-2/12 flex justify-around items-center">
            <Link href={"/search?search=" + valSearch}>
              <CustomButton
                type="button"
                className=""
                name="جستجو"
                iconEnd={<FaSearch />}
              />
            </Link>
            <i
              onClick={() => setIsShow(false)}
              className="cursor-pointer hover:bg-blue-500/70 hover:shadow-md hover:text-white transition-all rounded-full p-3"
            >
              <MdClose size={25} />
            </i>
          </span>
        </div>
      </div>
      <div
        className={`-z-20 h-screen opacity-0 absolute w-full top-52 left-0 flex justify-center transition-all ${valSearch && isShow ? "z-20 opacity-100 top-48" : "invisible"
          }`}
      >
        <div className="max-w-7xl h-3/4 overflow-y-auto w-full bg-gradient-to-tr from-blue-300/60 backdrop-blur-md to-gray-100/60 shadow-md p-4 rounded-lg">
          {!isSearch ? null : isSearch && data?.count ?
            <>
              <div className="grid grid-cols-3 gap-3">
                <CardPost props={data} />
              </div>
              <Link className="mt-4 block" href={`/search?search=${valSearch}`}>
                <CustomButton
                  name="مشاهده همه پست ها"
                  type="button"
                  iconClass="text-lg"
                  iconEnd={<MdManageSearch />}
                />
              </Link>
            </>
            :
            <span className="text-xl text-gray-700">
              هیچ پستی با کلمه جستجوی شما یافت نشد !!!
            </span>
          }
        </div>
      </div>
    </>
  );
}
