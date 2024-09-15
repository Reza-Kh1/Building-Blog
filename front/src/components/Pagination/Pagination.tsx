"use client"
import { PaginationType } from "@/app/type";
import { Button, IconButton } from "@mui/material";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
// import { Button, IconButton } from "@material-tailwind/react";
import {
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";
// import { Link, useLocation } from "react-router-dom";
type PaginationComponentsType = {
    setPage: (value: number) => void;
    pagination: PaginationType | undefined;
};
export default function Pagination({ pagination }: PaginationComponentsType) {
    // if (!pagination) return;
    const { page, ...otherQuery } = useSearchParams()
    // console.log(location, path);

    return (

        <div className="w-full flex bg-gray-50 mt-4 rounded-md p-2 justify-between">
            <Link href={{ query: new URLSearchParams(otherQuery).toString() + `&page=${Number(page) + 1}` }}>test</Link>
            {/* <div className="flex items-center">
                {pagination?.prevPage && (
                    <Link
                        href={location.pathname + `?page=${pagination.prevPage || 1}`}
                    >
                        <Button
                            variant="outlined"
                            className="flex items-center"
                            // size="sm"
                            onClick={() => setPage(pagination.prevPage || 1)}
                        >
                            <MdKeyboardDoubleArrowRight className="ml-1 text-lg" />
                            صفحه قبل
                        </Button>
                    </Link>
                )}
            </div>
            <div className="flex items-center gap-2">
                {pagination.allPage &&
                    Array.from({ length: pagination.allPage }, (_, i) => i + 1).map(
                        (i) => {
                            return (
                                <Link
                                    key={i}
                                    href={location.pathname + `?page=${i || 1}`}
                                >
                                    <IconButton
                                        variant="outlined"
                                        // size="sm"
                                        onClick={() => setPage(i)}
                                        className={i === Number(page) ? "bg-blue-400" : ""}
                                    >
                                        {i}
                                    </IconButton>
                                </Link>
                            );
                        }
                    )}
            </div>
            <div className="flex items-center">
                {pagination?.nextPage && (
                    <Link
                        to={location.pathname + `?page=${pagination.nextPage || 1}`}
                    >
                        <Button
                            variant="outlined"
                            className="flex items-center"
                            // size="sm"
                            onClick={() => setPage(pagination.nextPage || 1)}
                        >
                            صفحه بعد
                            <MdKeyboardDoubleArrowLeft className="mr-1 text-lg" />
                        </Button>
                    </Link>
                )}
            </div> */}
        </div>
    );
}