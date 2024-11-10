import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Comments from "@/components/Comments/Comments";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import FormComments from "@/components/FormComments/FormComments";
import React from "react";
import { CommentsPage } from "../type";
import Pagination from "@/components/Pagination/Pagination";
import NotFound from "../not-found";
const getData = async (page: number) => {
  const data = await fetchApi({ url: `comment/null?page=${page || 1}` })
  if (data.error) return NotFound();
  return data
}
export default async function page({ searchParams }: { searchParams: { page: number } }) {
  const data: CommentsPage = await getData(searchParams.page)
  return (
    <div className="w-full">
      <Breadcrums />
      <div className="classDiv">
        <h1 className="lg:text-xl font-semibold mb-3 md:mb-6">نظرات مشتریان نسبت به ما</h1>
        <span className="text-sm lg:text-base">
          {data.countNull} {" "}
          نظر تا اکنون ثبت شده
        </span>
        <div className="max-w-4xl mx-auto my-8">
          <Comments comments={data.comments.rows} />
        </div>
        <Pagination pagination={data.paginate} />
        <div className="max-w-4xl mx-auto mt-8">
          <FormComments />
        </div>
        <ContactSocialMedia />
      </div>
    </div>
  );
}
