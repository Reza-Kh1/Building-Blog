"use client";
import { fetchApi } from "@/action/fetchApi";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import LoadingSearch from "../LoadingSearch/LoadingSearch";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);
  const [valSearch, setValSearch] = useState<string>("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [timerLoading, setTimerLoading] = useState<NodeJS.Timeout | null>(null);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const route = useRouter();
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
  };

  const searchHandler = async (searchValue: string) => {
    if (!searchValue) return;
    setLoading(false);
    const url = `post?search=${searchValue}&order=${"createdAt-ASC"}&page=1`;
    fetchApi({ url, method: "GET" })
      .then((data) => {
        console.log(data);
        route.push(url);
        setData(data);
      })
      .catch(() => {
        toast.error("به مشکل برخوردیم !");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="w-2/12 flex items-center">
        <div className="mr-3 text-gray-800 dark:text-gray-300">
          <i
            onClick={() => {
              setIsShow(true);
              setData("text");
            }}
            className="cursor-pointer"
          >
            <BsSearch size={22} />
          </i>
        </div>
      </div>
      <div
        className={`w-full absolute transition-all right-0 top-36 ${
          isShow ? "opacity-100 z-20 !top-28" : "opacity-0 -z-20"
        }`}
      >
        <div className="max-w-7xl transition-all rounded-xl p-3 mx-auto flex justify-between items-center bg-gradient-to-tr from-blue-300/60  to-gray-100/60 dark:from-slate-700 dark:to-zinc-500 backdrop-blur-lg shadow-md">
          <form className="w-11/12 relative">
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
          <i
            onClick={() => {
              setIsShow(false), setData("");
            }}
            className="cursor-pointer"
          >
            <MdClose size={25} />
          </i>
        </div>
      </div>
      <div
        className={`-z-20 opacity-0 absolute w-full top-52 left-0 flex justify-center transition-all ${
          data ? "z-20 opacity-100 top-48" : ""
        }`}
      >
        <div className="max-w-7xl bg-gradient-to-tr from-blue-300/60 backdrop-blur-md  to-gray-100/60 shadow-md p-4 rounded-lg flex justify-between">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nam
            inventore modi doloribus eligendi dolore nihil saepe perferendis
            fugiat, harum blanditiis asperiores iure quisquam illum doloremque
            laborum nemo. Laboriosam, quo?
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum nam
            inventore modi doloribus eligendi dolore nihil saepe perferendis
            fugiat, harum blanditiis asperiores iure quisquam illum doloremque
            laborum nemo. Laboriosam, quo?
          </p>
        </div>
      </div>
    </>
  );
}
