import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Cards from "@/components/Cards/Cards";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import Pagination from "@/components/Pagination/Pagination";
import React from "react";
import { AllPostType } from "../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import NotFound from "../not-found";
const getData = async () => {
  const data = await fetchApi({ url: "post?page=1" });
  if (data.error) return NotFound();
  return data
};
export default async function page() {
  const data: AllPostType = await getData();
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv">
        <div className="flex w-full items-center justify-between">
          <h1 className="font-semibold lg:text-xl">وبلاگ</h1>
          <div className="w-2/6">
            <OrderSearch />
          </div>
        </div>
        <div className="my-5">
          <Cards props={data.rows} />
        </div>
        <Pagination pagination={data.paginate} />
      </div>
      <ContactSocialMedia />
    </div>
  );
}
