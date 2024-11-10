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
import NotFound from "../not-found";
const getData = async (query: FilterQueryType) => {
  const url = "project?" + new URLSearchParams(query);
  const data = await fetchApi({ url });
  if (data.error) return NotFound();
  return data
};
export default async function page({
  searchParams,
}: {
  searchParams: FilterQueryType;
}) {
  const data: AllProjectType = await getData(searchParams);
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv mb-20">
        <div className="mt-6 flex justify-between items-center">
          <h1 className="lg:text-xl font-semibold">پروژه های ما</h1>
          <div className="w-3/6">
            <OrderSearch />
          </div>
        </div>
        <div className="my-5 md:my-10 grid grid-cols-2 md:grid-cols-3 gap-5">
          {data.rows.map((item, index) => (
            <CardProjects project={item} key={index} />
          ))}
        </div>
        <div>
          <Suspense fallback={<LoadingSearch />}>
            <Pagination pagination={data.paginate} />
          </Suspense>
        </div>
      </div>
      <BannerCallUs />
      <ContactSocialMedia />
    </div>
  );
}
