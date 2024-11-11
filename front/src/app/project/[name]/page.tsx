import { fetchApi } from "@/action/fetchApi";
import { CardProjectsType, ProjectType } from "@/app/type";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import ImgTag from "@/components/ImgTag/ImgTag";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";
import { FaCalendarDays, FaTags } from "react-icons/fa6";
import { GrUserWorker } from "react-icons/gr";
import { SiGooglemaps } from "react-icons/si";
import { BiDollar } from "react-icons/bi";
import { GiPencilRuler } from "react-icons/gi";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
import BannerCallUs from "@/components/BannerCallUs/BannerCallUs";
import CardExperts from "@/components/CardExperts/CardExperts";
import SwiperGallery from "@/components/SwiperGallery/SwiperGallery";
const getData = async (name: string) => {
  const data = await fetchApi({ url: `project/${name.replace(/-/g, " ")}` });
  if (data?.error) {
    return notFound();
  }
  return data;
};
export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { data }: { data: ProjectType } = await getData(params.name);
  return {
    title: data?.name,
    description: data?.description,
    keywords: data?.Tags.map((i) => i.name),
    openGraph: {
      type: "article",
      url:
        process.env.NEXTAUTH_URL + "/project/" + data?.name.replace(/ /g, "-"),
      title: data?.name,
      description: data?.description,
      images: [
        {
          url: data?.image,
          width: 1200,
          height: 800,
          alt: data?.alt,
        },
      ],
      siteName: process.env.NEXTAUTH_URL,
    },
    alternates: {
      canonical:
        process.env.NEXTAUTH_URL + "/project/" + data?.name.replace(/ /g, "-"),
    },
  };
}
export default async function page({ params }: { params: { name: string } }) {
  const {
    data,
    projects,
  }: { data: ProjectType; projects: CardProjectsType[] } = await getData(
    params.name
  );
  if (!data) return notFound();
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "article",
    headline: data?.name || "عنوان پروژه",
    image: data?.image || "آدرس تصویر",
    description: data?.description || "توضیحات پروژه",
    author: {
      "@type": "Person",
      name: data?.Worker.name || "نام نویسنده",
    },
    datePublished: data?.updatedAt || "تاریخ انتشار",
    articleBody: data?.description || "متن پروژه",
    keywords: data?.Tags.map((i) => i.name) || "کلمات کلیدی",
    url:
      `${process.env.NEXTAUTH_URL}/project/${data?.name.replace(/ /g, "-")}` ||
      "آدرس پروژه",
  };
  return (
    <>
      <div className="w-full">
        <div className="w-full mx-auto relative">
          <ImgTag width={1450} height={450} alt={data?.alt} src={data?.image} className="h-96 object-cover w-full md:max-h-[600px] md:h-auto md:min-h-[450px]" />
          <div className="bg-gray-50 py-3 md:py-6 rounded-md w-11/12 md:w-3/4 shadow-lg text-center absolute bottom-12 md:bottom-20 left-1/2 transform -translate-x-1/2 translate-y-full">
            <h1 className="lg:text-xl font-semibold">{data?.name}</h1>
            <div className="flex text-gray-400 text-sm items-center justify-center gap-2 md:gap-4 mt-4 md:mt-7">
              <div className="flex text-sm md:text-base items-center gap-2">
                {data.Tags.map((i, index) => (
                  <Link
                    key={index}
                    className="hover:text-blue-400"
                    href={"/search?tag=" + i.name}
                  >
                    {i.name}
                    {data.Tags.length !== Number(index + 1) ? " ،" : null}
                  </Link>
                ))}
                <FaTags />
              </div>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 text-sm md:text-base items-center">
                {data?.Worker?.name}
                <GrUserWorker />
              </span>
              <span className="border-r border-dashed border-black h-6 w-1"></span>
              <span className="flex gap-2 text-sm md:text-base items-center">
                {new Date(data?.updatedAt).toLocaleDateString("fa")}
                <FaCalendarDays />
              </span>
            </div>
          </div>
        </div>
        <Breadcrums className="mt-14 md:!mt-20" />
        <div className="classDiv flex flex-col md:flex-row relative gap-3">
          <div className="w-full md:w-2/3">
            <span className="text-sm font-bold md:text-xl">توضیحات</span>
            <p className="text-sm md:text-base text-gray-700">{data.description}</p>
            <span className="border-t w-full h-1 block my-4 md:my-6"></span>
            <div className="w-full flex flex-col gap-2 md:gap-5">
              <div className="flex items-center gap-5">
                <i className="text-base lg:text-2xl p-3 hover:bg-gray-200 rounded-full bg-gray-100 shadow-md">
                  <SiGooglemaps />
                </i>
                <span className="text-sm lg:text-xl">موقعیت : {data.address}</span>
              </div>
              <div className="flex items-center gap-5">
                <i className="text-base lg:text-2xl p-3 hover:bg-gray-200 rounded-full bg-gray-100 shadow-md">
                  <BiDollar />
                </i>
                <p className="text-sm lg:text-xl">
                  بودجه :
                  {Number(data.price) ? (
                    <>
                      {Number(data.price).toLocaleString("fa")}
                      <span className="text-xs lg:text-sm"> تومان</span>
                    </>
                  ) : (
                    <span className="text-xs lg:text-sm"> ثبت نشده!</span>
                  )}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <i className="text-base lg:text-2xl p-3 hover:bg-gray-200 rounded-full bg-gray-100 shadow-md">
                  <GiPencilRuler />
                </i>
                <p className="text-sm lg:text-xl">
                  متراژ :
                  {Number(data.size) ? (
                    <>
                      {Number(data.size).toLocaleString("fa")}
                      <span className="text-xs lg:text-sm"> متر مربع</span>
                    </>
                  ) : (
                    <span className="text-xs lg:text-sm"> ثبت نشده!</span>
                  )}
                </p>
              </div>
            </div>
            <span className="border-t w-full h-1 block my-4 md:my-6"></span>
            <div className="w-full">
              <h3 className="text-base lg:text-xl font-bold mb-3">تصاویر پروژه</h3>
              <SwiperGallery imagesSrc={data.gallery} />
            </div>
            {data?.video ? (
              <>
                <span className="border-t w-full h-1 block my-6"></span>
                <h3 className="text-base lg:text-xl font-bold mb-3 block">فیلم پروژه</h3>
                <div className="video-container">
                  <video
                    className="video-player"
                    controls
                    poster={data.gallery[data.gallery.length - 1].url}
                  >
                    {data?.video?.search(".mp4") ? (
                      <source src={data?.video} type="video/mp4" />
                    ) : (
                      <source src={data?.video} type="video/webm" />
                    )}
                    مرورگر شما از نمایش ویدئو پشتیبانی نمی‌کند.
                  </video>
                </div>
              </>
            ) : null}
          </div>
          <div className="w-full sm:w-1/2 mx-auto md:w-1/3 md:h-80 md:sticky md:left-0 overflow-hidden md:top-24 md:p-2">
            <CardExperts {...data.Worker} />
          </div>
        </div>
        <BannerCallUs />
        <div className="classDiv">
          <SwiperCards
            isProject
            title="پروژه های مشابه"
            data={projects}
            url={`/project?page=1&tags=${data.Tags[0].name}`}
          />
        </div>
      </div>
      <Script
        type="application/ld+json"
        id="jsonld-product"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
    </>
  );
}
