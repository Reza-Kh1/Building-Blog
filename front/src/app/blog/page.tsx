import Breadcrums from "@/components/Breadcrums/Breadcrums";
import CardPost from "@/components/CardPost/CardPost";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React from "react";
const pager = {
  allPage: 1,
};
const test = [
  {
    Category: { slug: "test2", name: "مصالح" },
    id: 4,
    name: "test",
    title: "as",
    image:
      "https://building-blog.storage.iran.liara.space/1718433007077-Screenshot 2024-06-11 091827.png",
    slug: "as",
    status: true,
    description: "as",
    totalComments: null,
    updatedAt: new Date(),
  },
];
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
          <Cards props={test} />
        </div>
        <div>
          <Pagination pagination={pager} />
        </div>
      </div>
    </div>
  );
}
