import { fetchApi } from "@/action/fetchApi";
import Breadcrums from "@/components/Breadcrums/Breadcrums";
import Cards from "@/components/Cards/Cards";
import Pagination from "@/components/Pagination/Pagination";
import React, { Suspense } from "react";
import { AllPostType, FilterQueryType, TagsType } from "../../../type";
import ContactSocialMedia from "@/components/ContactSocialMedia/ContactSocialMedia";
import { Metadata } from "next";
import { dataApi } from "@/data/tagsName";
import DontData from "@/components/DontData/DontData";
import { notFound } from "next/navigation";
import SelectTag from "@/components/SelectTag/SelectTag";
const nameSite = process.env.NEXT_PUBLIC_NAME_SITE || ""
type PageType = { params: { category: string }, searchParams: FilterQueryType }
const getData = async (query: FilterQueryType) => {
    const url = "post?" + new URLSearchParams(query);
    const data = await fetchApi({ url, next: dataApi.posts.cache, tags: dataApi.posts.tags });
    if (data.error) return notFound();
    return data;
};
const getTags = () => {
    return fetchApi({ url: dataApi.tags.url, next: dataApi.tags.cache, tags: dataApi.tags.tags });
};
export async function generateMetadata({ searchParams }: PageType): Promise<Metadata> {
    const tag = searchParams?.tags || "وبلاگ";
    const title = `${tag} | ${nameSite}`
    const desc = `در این صفحه تمامی مقالات مرتبط با تگ ${tag} را مشاهده می‌کنید. این مقالات به شما در انتخاب بهتر و آگاهی بیشتر کمک می‌کنند.`
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
        title: title,
        description: desc,
        keywords: [
            tag,
            "پروژه‌های ساختمانی",
            "مشاوره ساخت‌وساز",
            "خدمات پیمانکاری",
            nameSite,
        ],
        openGraph: {
            type: 'website',
            siteName: nameSite,
            locale: "fa_IR",
            title: title,
            description: desc,
            url: `${process.env.NEXT_PUBLIC_URL}/blog/tags/${searchParams.tags}?tags=${encodeURIComponent(tag)}`,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_URL}/category.jpg`,
                    width: 600,
                    height: 350,
                    alt: `صفحه وبلاگ با تگ ${tag} در سایت ${nameSite}`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            creator: "@buildMasters",
            site: "@buildMasters",
        },
        robots: "index, follow",
        alternates: {
            canonical: `/blog/tags/${searchParams.tags}?tags=${encodeURIComponent(tag)}`,
        },
    };
}
export default async function page({ searchParams }: { searchParams: FilterQueryType; }) {
    const { data: dataTags }: { data: TagsType[] } = await getTags();
    const data: AllPostType = await getData(searchParams);
    return (
        <>
            <Breadcrums />
            <div className="classDiv">
                <section className="flex w-full items-center justify-between">
                    <h1 className="font-semibold lg:text-xl">{searchParams.tags}</h1>
                    <div className="w-2/6 flex gap-2">
                        <SelectTag urlPage="blog" dataTags={dataTags} />
                    </div>
                </section>
                {searchParams.search?
                <span className="text-sm mt-5 md:text-lg text-gray-600 dark:text-p-dark flex items-center gap-2">
                    <i className="w-3 h-3 dark:bg-gray-300 bg-gray-500 rounded-full inline-block"></i>
                             کلمه جستجو شده : <b>{searchParams.search}</b>
                </span>
                :null}
                <h2 className="text-sm mt-5 md:text-lg text-gray-600 dark:text-p-dark flex items-center gap-2">
                    <i className="w-3 h-3 dark:bg-gray-300 bg-gray-500 rounded-full inline-block"></i>
                    تمام مطالب مرتبط با تگ {'"'}{searchParams.tags}{'"'} در این صفحه فهرست شده‌اند.
                </h2>
                <div className="my-5">
                    {
                        data.rows.length ?
                            <Cards props={data.rows} />
                            :
                            <DontData name="هیچ پستی یافت نشد!" />
                    }
                </div>
                <Suspense fallback={"در حال بارگیری ..."}>
                    <Pagination pagination={data.paginate} />
                </Suspense>
            </div>
            <ContactSocialMedia />
        </>
    );
}