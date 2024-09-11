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
  const [data, setData] = useState()
  const [loading, setLoading] = useState<boolean>(false)
  const route = useRouter()
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
        setLoading(true)
      }, 200);
      setTimerLoading(newTimerLoading)
    }
    setLoading(false)
    setTimer(newTimer);
  };

  const searchHandler = async (searchValue: string) => {
    if (!searchValue) return
    setLoading(false)
    const url = `post?search=${searchValue}&order=${"createdAt-ASC"}&page=1`
    fetchApi({ url, method: "GET" }).then((data) => {
      console.log(data);
      route.push(url)
      setData(data)
    }).catch(() => {
      toast.error("به مشکل برخوردیم !")
    }).finally(() => { setLoading(false) })
  };

  return (
    <>
      <div className="w-2/12 flex items-center">
        <div className="mr-3 text-gray-800 dark:text-gray-300">
          <i
            onClick={() => {
              setIsShow(true);
            }}
            className="cursor-pointer"
          >
            <BsSearch size={22} />
          </i>
        </div>
      </div>
      <div
        className={`w-full absolute right-0 top-36 bg-gradient-to-tr from-blue-300/80  to-gray-100 dark:from-slate-700 dark:to-zinc-500 backdrop-blur-lg shadow-md rounded-md ${isShow ? "opacity-100 z-20 !top-24" : "opacity-0 -z-20"
          }`}
        style={{
          transition: "all ease 0.5s",
        }}
      >
        <div className="max-w-7xl rounded-xl p-3 mx-auto flex justify-between items-center">
          <form className="w-11/12 relative">
            <input
              ref={ref}
              value={valSearch}
              onChange={timerSearch}
              type="text"
              className="p-3 bg-transparent border-b w-full border-b-black focus-visible:outline-none"
              placeholder="جستجوی هوشمند..."
            />
            {loading &&
              <div className="absolute left-0 top-0"> <LoadingSearch /> </div>}
          </form>
          <i onClick={() => setIsShow(false)} className="cursor-pointer">
            <MdClose size={25} />
          </i>
        </div>
      </div>
      <div className=" fixed w-full bottom-0 left-0 p-3 rounded-md flex justify-between">
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quis distinctio, magnam tenetur doloremque sit ipsa animi exercitationem! Perspiciatis vero nostrum odio sapiente obcaecati quisquam quidem labore, aut adipisci vitae.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quis distinctio, magnam tenetur doloremque sit ipsa animi exercitationem! Perspiciatis vero nostrum odio sapiente obcaecati quisquam quidem labore, aut adipisci vitae.</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non quis distinctio, magnam tenetur doloremque sit ipsa animi exercitationem! Perspiciatis vero nostrum odio sapiente obcaecati quisquam quidem labore, aut adipisci vitae.</p>
      </div>
    </>
  );
}