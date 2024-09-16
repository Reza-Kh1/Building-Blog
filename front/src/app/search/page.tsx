import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { CardPostType } from "@/app/type";
import CardPost from "@/components/CardPost/CardPost";
import React from "react";
import FilterSearch from "./FilterSearch";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FaHome } from "react-icons/fa";
import Pagination from "@/components/Pagination/Pagination";
type pageType = {
  searchParams: QueryType
};
type QueryType = {
  search: string
  order?: "createdAt-ASC" | "createdAt-DESC"
  page?: string
}
const getData = async (query: QueryType) => {
  const newQuery = new URLSearchParams(query).toString()
  let url = "post?" + newQuery
  const data = await fetchApi({ url, cache: "force-cache", method: "GET" });
  if (data.error) return NotFound();
  return data;
};
export default async function page({ searchParams }: pageType) {
  if (!searchParams) return NotFound();
  const data: CardPostType = await getData(searchParams);
  return (
    <div className="search-page max-w-7xl my-5 mx-auto px-2">
      <div className="navbar-search mb-4">
        <FilterSearch />
      </div>
      <div>
        <span>
          تعداد پست های یافت شده
          <span className="text-blue-300 font-semibold mr-2">
            {data.count}
          </span>
        </span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        <CardPost props={data} />
      </div>
      {data.rows?.length ? (
        <div className="paginate mt-9">
          <Pagination pagination={data.paginate} />
        </div>
      ) : null}
      {!data.rows?.length && (
        <div className=" w-full text-center flex flex-col gap-5 my-10">
          <span className="text-lg">
            هیچ پستی با کلمه جستجوی شما یافت نشد !!!
          </span>
          <div>
            <Link href="/" className="inline-block">
              <CustomButton name="بازگشت به خانه" type="button" iconEnd={<FaHome />} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}