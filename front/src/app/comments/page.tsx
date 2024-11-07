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
    <div className="w-full mx-auto max-w-7xl my-8">
      <Breadcrums />
      <h1 className="mt-6 text-xl mb-6">نظرات مشتریان نسبت به ما</h1>
      <span>
        {data.countNull} {" "}
        نظر تا اکنون ثبت شده
      </span>
      <div className="max-w-4xl mx-auto mt-4">
        <Comments comments={data.comments.rows} />
        <div className="mt-8">
          <FormComments />
        </div>
      </div>
      <Pagination pagination={data.paginate} />
      <ContactSocialMedia classDiv="mt-20" />
    </div>
  );
}
