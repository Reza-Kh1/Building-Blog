import React from "react";
import { fetchApi } from "@/action/fetchApi";
import FilterClient from "./FilterClient";
import { TagsType } from "@/app/type";
import { dataApi } from "@/data/tagsName";
const getTags = () => {
  return fetchApi({ url:dataApi.tags.url,next:dataApi.tags.cache,tags:dataApi.tags.tags  });
};
const getExpertName = () => {
  return fetchApi({ url:dataApi.expertName.url,next:dataApi.expertName.cache,tags:dataApi.expertName.tags });
};
type ExpertNameType = {
  name: string;
  id: string;
};
export default async function OrderSearch() {
  const { data: dataExpert }: { data: ExpertNameType[] } =
    await getExpertName();
  const { data: dataTags }: { data: TagsType[] } = await getTags();
  return <FilterClient nameExpert={dataExpert} nameTags={dataTags} />;
}
