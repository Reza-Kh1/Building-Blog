"use client"
import { PaginationType } from "@/app/type";
import { IconButton } from "@mui/material";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
type PaginationComponentsType = {
    pagination: PaginationType | undefined;
};
export default function Pagination({ pagination }: PaginationComponentsType) {
    const searchParams = useSearchParams() as any
    if (!pagination || !pagination.allPage) return;
    let { page, ...otherQuery } = Object.fromEntries(searchParams.entries());
    page = page || 1
    const newQuery = new URLSearchParams(otherQuery).toString()
    const startPage = Math.max(1, Number(page) - 3);
    const endPage = Math.min(pagination.allPage, Number(page) + 3);
    return (
        <div className="flex justify-between items-center mt-3">
            {
                pagination?.prevPage ?
                    <Link
                        href={{ query: newQuery + `&page=${pagination.prevPage}` }}
                    >
                        <IconButton type="button" title="صفحه قبل" aria-label="صفحه قبل" className="shadow-md dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none !bg-[#77adff]" disabled={pagination.prevPage ? false : true}>
                            <FaAnglesRight size={22} color="#ededed" />
                        </IconButton>
                    </Link>
                    :
                    <IconButton disabled={true} type="button" title="صفحه قبل" aria-label="صفحه قبل">
                        <FaAnglesRight size={22} />
                    </IconButton>
            }
            <div className="flex gap-2 items-center justify-evenly">
                {Number(page) > 4 && (
                    <>
                        <Link href={{ query: newQuery + `&page=${1}` }}>
                            <IconButton type="button" title={'1'} size="small" className="shadow-md !px-4 dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none !bg-[#77adff]">
                                <span className="text-gray-50 pt-1">
                                    1
                                </span>
                            </IconButton>
                        </Link>
                        <span>...</span>
                    </>
                )}
                {pagination.allPage
                    ? Array.from(
                        { length: Math.min(11, endPage - startPage + 1) },
                        (_, i) => startPage + i
                    ).map((i) => {
                        return i === Number(page) ?
                            <IconButton title={`${i}`} type="button" key={i} disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#d4d3d3] dark:!bg-zinc-800/80" : "!bg-[#77adff] dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none"}`}>
                                <span className="text-gray-50 pt-1">
                                    {i}
                                </span>
                            </IconButton>
                            :
                            <Link href={{ query: newQuery + `&page=${i}` }} key={i}>
                                <IconButton title={`${i}`} type="button" disabled={Number(page) === i} size="small" className={`!px-4 shadow-md ${i === Number(page) ? "!bg-[#d4d3d3] dark:!bg-zinc-800/80" : "!bg-[#77adff] dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none"}`}>
                                    <span className="text-gray-50 pt-1">
                                        {i}
                                    </span>
                                </IconButton>
                            </Link>
                    })
                    : null}
                {pagination.allPage - Number(page) > 3 && (
                    <>
                        <span>...</span>
                        <Link href={{ query: newQuery + `&page=${pagination.allPage}` }}>
                            <IconButton title={`${pagination.allPage}`} type="button" size="small" className="shadow-md !px-4 !bg-[#77adff] dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none">
                                <span className="text-gray-50 pt-1">
                                    {pagination.allPage}
                                </span>
                            </IconButton>
                        </Link>
                    </>
                )}
            </div>
            {
                pagination.nextPage ?
                    <Link href={{ query: newQuery + `&page=${pagination.nextPage ? Number(page) + 1 : page}` }}>
                        <IconButton type="button" title="صفحه بعد" aria-label="صفحه بعد" className="shadow-md !bg-[#77adff] dark:!bg-slate-700 dark:shadow-full-dark dark:hover:shadow-none" disabled={pagination.nextPage ? false : true}>
                            <FaAnglesLeft size={22} color="#ededed" />
                        </IconButton>
                    </Link>
                    :
                    <IconButton disabled={true} type="button" title="صفحه بعد" aria-label="صفحه بعد">
                        <FaAnglesLeft size={22} />
                    </IconButton>
            }
        </div >
    );
}