import ImgTag from "@/components/ImgTag/ImgTag";
import React from "react";
import { FaPhotoVideo } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import ScollComment from "./ScollComment";
import FormComments from "@/components/FormComments/FormComments";
import BannerCallUs from "@/components/BannerCallUs/BannerCallUs";
import { fetchApi } from "@/action/fetchApi";
import { Metadata } from "next";
import { CardPostType, CardProjectsType, PostType } from "@/app/type";
import Script from "next/script";
import parse from "html-react-parser";
import CommentPost from "./CommentPost";
import { notFound } from "next/navigation";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
type DataPostPageType = {
  data: PostType;
  posts: CardPostType[];
  projects: CardProjectsType[];
};
const getData = async (name: string) => {
  const data = await fetchApi({ url: `post/${name.replace(/-/g, " ")}` });
  if (data?.error) {
    return notFound();
  }
  return data;
};
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data }: DataPostPageType = await getData(params.slug);
  return {
    title: data?.DetailPost?.title,
    description: data?.description,
    keywords: data?.DetailPost?.keyword,
    openGraph: {
      url:
        process.env.NEXTAUTH_URL + "/post/" + data?.title?.replace(/ /g, "-"),
      title: data?.DetailPost?.title,
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
  const { data, posts, projects }: DataPostPageType = await getData(
    params.slug
  );
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
    url:
      `${process.env.NEXTAUTH_URL}/blog/${data?.title.replace(/ /g, "-")}` ||
      "آدرس مقاله",
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
            alt={data?.title}
            src={data?.image}
            className="h-96 object-cover w-full md:max-h-[600px] md:h-auto md:min-h-[450px]"
          />
          <div className="bg-gray-50 py-3 md:py-6 rounded-md w-11/12 md:w-3/4 shadow-lg text-center absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 translate-y-full">
            <h1 className="lg:text-xl font-bold">{data?.title}</h1>
            <div className="flex text-gray-400 text-sm items-center justify-center gap-2 md:gap-4 mt-4 md:mt-7">
              <span>
                <FaPhotoVideo />
              </span>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <ScollComment totalComments={data?.totalComments} />
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 items-center">
                {data?.User?.name}
                <IoPerson />
              </span>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 items-center">
                {new Date(data?.updatedAt).toLocaleDateString("fa")}
                <FaCalendarDays />
              </span>
            </div>
          </div>
        </div>
        <Breadcrums className="mt-14 md:!mt-20" />
        <article className="classDiv !max-w-3xl mx-auto text-justify leading-8">
          {data?.DetailPost?.text && parse(data?.DetailPost?.text)}
        </article>
        <BannerCallUs />
        <div className="classDiv">
          <SwiperCards
            title="پست های مشابه"
            isPost
            data={posts}
            url={`/blog?page=1&tags=${data.Tags[data.Tags.length - 1]}`}
          />
          <SwiperCards
            title="پروژه های مشابه"
            isProject
            data={projects}
            url={`/blog?page=1&tags=${data.Tags[data.Tags.length - 1]}`}
          />
        </div>
        <div className="classDiv !max-w-3xl">
          <CommentPost
            comments={data.Comments}
            postId={data.id}
            totalComments={data.totalComments}
          />
          <div className="mt-6">
            <FormComments postId={data.id} />
          </div>
        </div>
      </div>
    </>
  );
}
