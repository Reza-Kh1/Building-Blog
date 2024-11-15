import { fetchApi } from "@/action/fetchApi";
import NotFound from "@/app/not-found";
import { CardPostType, CardProjectsType, ExpertType } from "@/app/type";
import React from "react";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import SwiperCards from "@/components/SwiperCards/SwiperCards";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import { Metadata } from "next";
import Script from "next/script";
import { dataApi } from "@/data/tagsName";
type pageType = {
  searchParams: { tags: string };
};
type DataSearchType = {
  projects: CardProjectsType[];
  posts: CardPostType[];
  workers: ExpertType[];
};
const getData = async (tagId: string) => {
  let url = dataApi.search.url + "?tags=" + tagId;
  const data = await fetchApi({ url, next:dataApi.search.cache,tags:dataApi.search.tags });
  if (data.error) return NotFound();
  return data;
};
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
  title: 'نتایج جستجو | ساخت یار',
  description: 'در این صفحه نتایج جستجو برای پروژه‌ها، خدمات، یا مقالات مختلف تیم ساخت یار را مشاهده خواهید کرد. از فیلترهای مختلف برای پیدا کردن دقیق‌تر موارد مورد نظر استفاده کنید.',
  keywords: [
    'جستجو پروژه‌ها',
    'پروژه‌های ساختمانی',
    'خدمات ساختمانی',
    'مشاوره ساخت و ساز',
    'پروژه‌های عمرانی',
    'پیمانکاری',
  ],
  openGraph: {
    title: 'نتایج جستجو | ساخت یار',
    description: 'با استفاده از نتایج جستجو در ساخت یار، پروژه‌ها و خدمات مختلف ساختمانی خود را بیابید.',
    url: `${process.env.NEXT_PUBLIC_URL + "/search"}`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
        width: 800,
        height: 600,
        alt: 'نتایج جستجو در سایت ساخت یار',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'نتایج جستجو | ساخت یار',
    description: 'در این صفحه، نتایج جستجو و فیلترهای مختلف پروژه‌های ساختمانی تیم ساخت یار را مشاهده کنید.',
    images: [`${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`],
  },
  robots: "index, follow",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_URL + "/search"}`,
  },
};
export default async function page({ searchParams }: pageType) {
  const { projects, posts, workers }: DataSearchType = await getData(
    searchParams.tags
  );
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": "نتایج جستجو در ساخت یار",
    "url": `${process.env.NEXT_PUBLIC_URL + "/search"}`,
    "description": "نتایج جستجو برای پروژه‌های ساختمانی، خدمات مشاوره و طراحی در سایت ساخت یار",
    "query": "پروژه‌های ساختمانی",
    "mainEntity": {
      "@type": "WebPage",
      "url": `${process.env.NEXT_PUBLIC_URL + "/search"}`,
      "name": "نتایج جستجو",
      "description": "صفحه‌ای برای نمایش نتایج جستجوی پروژه‌ها و خدمات مختلف در ساخت یار.",
    },
    "image": `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
    "keywords": ["جستجو پروژه", "پروژه‌های ساختمانی", "خدمات ساخت و ساز", "پیمانکاری"],
  };
  return (
    <>
      <Script
        type="application/ld+json"
        id="jsonld-search-results"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <Breadcrums />
      <div className="classDiv">
        <section className="navbar-search flex md:my-6">
          <div className="w-2/3">
            <h1 className="text-lg my-3">
              جستجو در تگ :
              <span className=" text-xl text-blue-400 mr-2">
                {searchParams.tags}
              </span>
            </h1>
          </div>
        </section>
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
    </ >
  );
}
