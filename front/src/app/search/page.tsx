import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { AllCardPostType } from "@/app/type";
import React, { Suspense } from "react";
import TextSearch from "./TextSearch";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FaHome } from "react-icons/fa";
import Pagination from "@/components/Pagination/Pagination";
import Cards from "@/components/Cards/Cards";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
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
  const data = await fetchApi({ url, method: "GET" });
  if (data.error) return NotFound();
  return data;
};
export default async function page({ searchParams }: pageType) {
  if (!searchParams) return NotFound();
  const data: AllCardPostType = await getData(searchParams);
  return (
    <div className="search-page max-w-7xl my-5 mx-auto px-2">
      <Breadcrums />
      <div className="navbar-search mb-4 flex my-6">
        <div className="w-2/3">
          <TextSearch />
        </div>
        <div className="w-1/3">
          <OrderSearch />
        </div>
      </div>
      <div>
        <span>
          تعداد پست های یافت شده
          <span className="text-blue-300 font-semibold mr-2">
            {data.count}
          </span>
        </span>
      </div>
      <div className="flex flex-col w-full gap-3 my-6">
        <Cards props={data.rows} />
      </div>
      {data.rows?.length ? (
        <div className="paginate mt-9">
          <Suspense fallback={<div>loading...</div>}>
            <Pagination pagination={data.paginate} />
          </Suspense>
        </div>
      ) : null}
      {!data.rows?.length && (
        <div className=" w-full text-center flex flex-col gap-5 my-10">
          <span className="text-lg">
            هیچ پستی با کلمه جستجوی شما یافت نشد !!!
          </span>
          <div>
            <Link href="/" className="inline-block">
              <CustomButton disable={false} name="بازگشت به خانه" type="button" iconEnd={<FaHome />} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}