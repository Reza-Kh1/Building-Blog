"use client";
import { FilterQueryType, TagsType } from "@/app/type";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa6";
type SelectTagType = {
    title: string
    dataTags: TagsType[]
}
export default function SelectTag({ title, dataTags }: SelectTagType) {
    const searchParam = useSearchParams();
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: number]: boolean }>({});
    const dropdownRefs = useRef<Array<HTMLDivElement | null>>([]);
    const setDropdownRef = (index: number) => (el: HTMLDivElement | null) => {
        dropdownRefs.current[index] = el; // مقداردهی بدون بازگشت مقدار
    };
    const paramsQuery: FilterQueryType = Object.fromEntries(searchParam.entries());
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            dropdownRefs.current.forEach((ref, index) => {
                if (ref && !ref.contains(event.target as Node)) {
                    setOpenDropdowns((prev) => ({ ...prev, [index]: false }));
                }
            });
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    const toggleDropdown = (index: number) => {
        setOpenDropdowns((prev) => ({ ...prev, [index]: !prev[index] }));
    };
    if (!dataTags.length) return
    const orderFilter = { ...paramsQuery }
    orderFilter.page = "1"
    orderFilter.order = paramsQuery.order === "createdAt-DESC" ? "createdAt-ASC" : "createdAt-DESC"
    return (
        <>
            <div ref={setDropdownRef(0)} className="relative w-full">
                <span className="text-sm">{title}</span>
                <div className="w-full cursor-pointer flex relative bg-gradient-to-br dark:to-slate-800 dark:from-gray-600 dark:shadow-low-dark to-blue-400 from-gray-300 rounded-md shadow-md">
                    <button
                        title={paramsQuery.tags || "نمایش همه"}
                        type="button"
                        className="cursor-pointer text-right w-full p-3 text-white dark:text-h-dark"
                        onClick={() => toggleDropdown(0)}
                    >
                        {paramsQuery.tags || "نمایش همه"}
                    </button>
                    <i className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <FaAngleUp className={`transition-all text-white dark:text-h-dark ${openDropdowns[0] ? "rotate-180" : ""}`} />
                    </i>
                    <ul
                        className={`absolute top-[110%] bg-blue-400/80 dark:bg-gray-400/80 text-white w-full max-h-96 h-auto shadow-md z-50 p-2 rounded-md overflow-y-auto left-0 flex flex-col transition-all gap-2 ${openDropdowns[0] ? "" : "opacity-0 invisible"}`}
                    >
                        {paramsQuery.tags ?
                            <li>
                                <Link href={"/blog?order=createdAt-DESC&page=1"} className="bg-slate-200 block text-gray-600 hover:bg-slate-50 p-3 shadow-md dark:bg-gray-700 hover:dark:bg-gray-800 dark:text-h-dark rounded-md">
                                    نمایش همه
                                </Link>
                            </li>
                            : null}
                        {dataTags.map((i, index) => {
                            const { tags, ...other } = paramsQuery
                            return i.name === paramsQuery.tags ? null :
                                <li key={index}>
                                    <Link href={`/blog/tag/${i.name}?${new URLSearchParams(other)}&tags=${i.name}`} className="bg-slate-200 block text-gray-600 hover:bg-slate-50 p-3 shadow-md dark:bg-gray-700 hover:dark:bg-gray-800 dark:text-h-dark rounded-md">
                                        {i.name}
                                    </Link>
                                </li>
                        })}
                    </ul>
                </div>
            </div>
            <div ref={setDropdownRef(1)} className="relative w-full">
                <span className="text-sm">مرتب سازی</span>
                <div className="w-full cursor-pointer flex relative bg-gradient-to-br dark:to-slate-800 dark:from-gray-600 dark:shadow-low-dark to-blue-400 from-gray-300 rounded-md shadow-md">
                    <button
                        title={paramsQuery.order === "createdAt-DESC" ? "جدید ترین" : "قدیمی ترین"}
                        type="button"
                        className="cursor-pointer text-right w-full p-3 text-white dark:text-h-dark"
                        onClick={() => toggleDropdown(1)}
                    >
                        {paramsQuery.order === "createdAt-DESC" ? "جدید ترین" : "قدیمی ترین"}
                    </button>
                    <i className="absolute left-5 top-1/2 transform -translate-y-1/2">
                        <FaAngleUp className={`transition-all text-white dark:text-h-dark ${openDropdowns[1] ? "rotate-180" : ""}`} />
                    </i>
                    <ul
                        className={`absolute top-[110%] bg-blue-400/80 dark:bg-gray-400/80 text-white w-full max-h-96 h-auto shadow-md z-50 p-2 rounded-md overflow-y-auto left-0 flex flex-col transition-all gap-2 ${openDropdowns[1] ? "" : "opacity-0 invisible"}`}
                    >
                        <li>
                            <Link href={`?${new URLSearchParams(orderFilter)}`} className="bg-slate-200 block text-gray-600 hover:bg-slate-50 p-3 shadow-md dark:bg-gray-700 hover:dark:bg-gray-800 dark:text-h-dark rounded-md">
                                {paramsQuery.order === "createdAt-DESC" ? "قدیمی ترین" : "جدید ترین"}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}