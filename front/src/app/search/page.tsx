import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { CardPostType, CardProjectsType, ExpertType } from "@/app/type";
import React from "react";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
type pageType = {
  searchParams: { tags: string };
};
type DataSearchType = {
  projects: CardProjectsType[];
  posts: CardPostType[];
  workers: ExpertType[];
};
const getData = async (tagId: string) => {
  let url = "tag?tags=" + tagId;
  const data = await fetchApi({ url, method: "GET" });
  if (data.error) return NotFound();
  return data;
};
export default async function page({ searchParams }: pageType) {
  const { projects, posts, workers }: DataSearchType = await getData(
    searchParams.tags
  );
  return (
    <div className="search-page w-full">
      <Breadcrums />
      <div className="classDiv">
        <div className="navbar-search flex md:my-6">
          <div className="w-2/3">
            <h1 className="text-lg my-3">
              جستجو در تگ :
              <span className=" text-xl text-blue-400 mr-2">
                {searchParams.tags}
              </span>
            </h1>
          </div>
        </div>
        <SwiperCards
          data={posts}
          title="پست ها"
          url={`/blog?order=createdAt-DESC&page=1&tags=${searchParams.tags}`}
          isPost
        />
        <SwiperCards
          data={projects}
          title="پروژه ها"
          isProject
          url={`/project?order=createdAt-DESC&page=1&tags=${searchParams.tags}`}
        />
        <SwiperCards
          data={workers}
          title="مجریان"
          isExpert
          url={`/experts?order=createdAt-DESC&page=1&tags=${searchParams.tags}`}
        />
      </div>
      <ContactSocialMedia />
    </div >
  );
}
