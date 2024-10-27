import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React from "react";
import { AllPostType } from "../type";
const getData = () => {
  return fetchApi({ url: "post?page=1" });
};
export default async function page() {
  const data: AllPostType = await getData();
  return (
    <div className="w-full">
      <div className="max-w-7xl w-full mx-auto my-6">
        <Breadcrums />
        <div className="flex w-full items-center mt-6 justify-between">
          <h1>وبلاگ ساختمان یار</h1>
          <div className="w-1/6">
            <OrderSearch />
          </div>
        </div>
        <span>{data.count} پست</span>
        <div className="my-5">
          <Cards props={data.rows} />
        </div>
        <div>
          <Pagination pagination={data.paginate} />
        </div>
      </div>
    </div>
  );
}
