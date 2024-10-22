import ImgTag from "@/components/ImgTag/ImgTag";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import ScollComment from "./ScollComment";
import FormComments from "@/components/FormComments/FormComments";
import Comments from "@/components/Comments/Comments";
import BannerCallUs from "@/app/about-us/BannerCallUs";
import { fetchApi } from "@/action/fetchApi";
import { Metadata } from "next";
import { PostType } from "@/app/type";
import Script from "next/script";
import parse from "html-react-parser"
const getData = (slug: string) => {
  return fetchApi({ url: `post/${slug.replace(/-/g, " ")}`, next: 10 })
}
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data: PostType = await getData(params.slug);
  return {
    title: data.DetailPost.title,
    description: data?.description,
    keywords: data?.DetailPost?.keyword,
    openGraph: {
      url: process.env.NEXTAUTH_URL + "/post/" + data?.title.replace(/ /g, "-"),
      title: data?.DetailPost.title,
      description: data?.description,
      images: [
        {
          url: data?.image,
          width: 1200,
          height: 800,
          alt: data?.title,
        },
      ],
      siteName: process.env.NEXTAUTH_URL,
    },
  };
}
export default async function page({ params }: { params: { slug: string } }) {
  const data: PostType = await getData(params.slug)
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data?.title || "عنوان مقاله",
    image: data?.image || "آدرس تصویر",
    description: data?.description || "توضیحات مقاله",
    author: {
      "@type": "Person",
      name: data?.User.name || "نام نویسنده",
    },
    datePublished: data?.updatedAt || "تاریخ انتشار",
    articleBody: data?.DetailPost?.text || "متن مقاله",
    keywords: data?.DetailPost?.keyword?.join(", ") || "کلمات کلیدی",
    url: `${process.env.NEXTAUTH_URL}/blog/${data?.title.replace(/ /g, "-")}` || "آدرس مقاله",
  };
  return (
    <>
      <Script
        type="application/ld+json"
        id="jsonld-product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <div className="w-full">
        <div className="w-full mx-auto relative">
          <ImgTag
            width={1450}
            height={450}
            alt={data.title}
            src={data.image}
          />
          <div className="bg-gray-50 py-7 rounded-md w-3/4 shadow-lg text-center absolute bottom-20 left-1/2 transform -translate-x-1/2 translate-y-full">
            <h1 className="text-xl">{data.title}</h1>
            <div className="flex text-gray-400 text-sm items-center justify-center gap-4 mt-7">
              <span>
                <FaPhotoVideo />
              </span>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <ScollComment totalComments={data.totalComments} />
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 items-center">
                {data.User.name}
                <IoPerson />
              </span>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 items-center">
                {new Date(data.updatedAt).toLocaleDateString("fa")}
                <FaCalendarDays />
              </span>
            </div>
          </div>
        </div>
        <div className="mt-24 max-w-3xl mx-auto text-justify leading-8">
          {parse(data.DetailPost.text)}
        </div>
        <div className="my-8">
          <BannerCallUs />
        </div>
        <div className="max-w-3xl mx-auto my-8">
          <Comments comments={data.Comments} postId={data.id} />
          <div className="mt-6">
            <FormComments postId={data.id} />
          </div>
        </div>
      </div></>

  );
}
