import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { CardPostType } from "@/app/type";
import CardPost from "@/components/CardPost/CardPost";
import React, { useEffect } from "react";
import FilterSearch from "./FilterSearch";
type pageType = {
  params: {
    slug?: string;
  };
  searchParams: any;
};
const getData = async (slug: string) => {
  const data = await fetchApi({ url: `post?search=${slug}`, method: "GET" });
  if (data.error) return NotFound();
  return data;
};
export default async function page({ params }: pageType) {
  if (!params.slug) return NotFound();
  const data: CardPostType = await getData(params.slug);

  return (
    <div className="search-page max-w-7xl my-5 mx-auto px-2">
      <div className="navbar-search mb-4">
        <FilterSearch />
      </div>
      <div className="grid grid-cols-4 gap-3">
        <CardPost props={data} />
      </div>
    </div>
  );
}
