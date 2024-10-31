import Breadcrums from "@/components/Breadcrums/Breadcrums";
import CardProjects from "@/components/CardProjects/CardProjects";
import LoadingSearch from "@/components/LoadingSearch/LoadingSearch";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import BannerCallUs from "../../components/BannerCallUs/BannerCallUs";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import OrderSearch from "@/components/OrderSearch/OrderSearch";
import { fetchApi } from "@/action/fetchApi";
import { AllProjectType, FilterQueryType } from "../type";
const getData = (query: FilterQueryType) => {
  const url = "project?" + new URLSearchParams(query)
  return fetchApi({ url })
}
export default async function page({ searchParams }: { searchParams: FilterQueryType }) {
  const data: AllProjectType = await getData(searchParams)
  return (
    <div className="w-full my-8">
      <div className="w-full max-w-7xl mx-auto mb-20">
        <Breadcrums />
        <div className="mt-6 flex justify-between items-center">
          <h1 className="font-semibold">پروژه های ساختمان یار</h1>
          <div className="w-1/3">
            <OrderSearch />
          </div>
        </div>
        <div className="my-10 grid grid-cols-3 gap-5">
          {data.rows.map((item, index) => (
            <CardProjects project={item} key={index} />
          ))}
        </div>
        <div>
          <Suspense fallback={<LoadingSearch />}>
            <Pagination pagination={{ allPage: 1 }} />
          </Suspense>
        </div>
      </div>
      <BannerCallUs />
      <div className="w-full max-w-7xl mx-auto">
        <ContactSocialMedia classDiv="mt-20" />
      </div>
    </div>
  );
}
