import React from "react";
import { fetchApi } from "@/action/fetchApi";
import FilterClient from "./FilterClient";
import { TagsType } from "@/app/type";
const getData = () => {
  return fetchApi({ url: "tag", next: 8000 });
};
export default async function OrderSearch() {
  const { data }: { data: TagsType[] } = await getData();
  return <FilterClient nameTags={data} />;
}
