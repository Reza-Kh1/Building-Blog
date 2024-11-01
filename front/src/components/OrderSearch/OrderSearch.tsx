import React from "react";
import { fetchApi } from "@/action/fetchApi";
import FilterClient from "./FilterClient";
import { TagsType } from "@/app/type";
const getTags = () => {
  return fetchApi({ url: "tag", next: 8000 });
};
const getExpertName = () => {
  return fetchApi({ url: "worker/name-worker" });
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
