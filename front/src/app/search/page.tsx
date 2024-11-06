import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { CardPostType, CardProjectsType, ExpertType } from "@/app/type";
import React, { Suspense } from "react";
import TextSearch from "./TextSearch";
import Link from "next/link";
import CustomButton from "@/components/CustomButton/CustomButton";
import { FaHome } from "react-icons/fa";
import Pagination from "@/components/Pagination/Pagination";
import Cards from "@/components/Cards/Cards";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
type pageType = {
  searchParams: { tags: string }
};
type DataSearchType = {
  projects: CardProjectsType[]
  posts: CardPostType[]
  workers: ExpertType[]
}
const getData = async (tagId: string) => {
  let url = "tag?tags=1" + tagId
  const data = await fetchApi({ url, method: "GET" });
  if (data.error) return NotFound();
  return data;
};
export default async function page({ searchParams }: pageType) {
  if (!searchParams) return NotFound();
  const { projects, posts, workers }: DataSearchType = await getData(searchParams.tags);
  return (
    <div className="search-page max-w-7xl my-5 mx-auto px-2">
      <Breadcrums />
      <div className="navbar-search mb-4 flex my-6">
        <div className="w-2/3">
          <h1 className="text-lg my-3">
            جستجو در تگ :
            <span className=" text-xl text-blue-400 mr-2">
              {searchParams.tags}
            </span>
          </h1>
        </div>
      </div>
      <div>
        <SwiperCards data={posts} title="پست ها" url={`/blog?order=createdAt-DESC&page=1&tags=${searchParams.tags}`} isPost />
      </div>
      <div>
        <SwiperCards data={projects} title="پروژه ها" url={`/projects?order=createdAt-DESC&page=1&tags=${searchParams.tags}`} />
      </div>
      <div>
        
      </div>
    </div>
  );
}