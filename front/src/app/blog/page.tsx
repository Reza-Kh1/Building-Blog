import Breadcrums from "@/components/Breadcrums/Breadcrums";
import CardPost from "@/components/CardPost/CardPost";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React from "react";
const pager = {
  allPage: 1,
};
export default function page() {
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
        <div className="my-5">
          <Cards />
        </div>
        <div>
          <Pagination pagination={pager} />
        </div>
      </div>
    </div>
  );
}
