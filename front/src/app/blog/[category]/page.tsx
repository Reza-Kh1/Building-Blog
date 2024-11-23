import { fetchApi } from '@/action/fetchApi'
import { ALlPostCategory } from '@/app/type'
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import Cards from '@/components/Cards/Cards'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
import Pagination from '@/components/Pagination/Pagination'
import { dataApi } from '@/data/tagsName'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
type PageType = { params: { category: string }, searchParams: { page: string } }
const getData = async (query: PageType) => {
    const url = `${dataApi.category.url}/${query.params.category.replace(/-/g, " ")}?page=${query.searchParams.page || 1}`
    const data = await fetchApi({ url, next: dataApi.category.cache, tags: dataApi.category.tags })
    if (data.error) return notFound();
    return data
}
export async function generateMetadata(query: PageType): Promise<Metadata> {
    const data: ALlPostCategory = await getData(query);
    if (!data.count) return notFound()
    const categoryName = data?.category?.name || 'دسته‌بندی';
    const baseUrl = process.env.NEXTAUTH_URL;
    const categorySlug = query.params.category.replace(/ /g, "-");
    return {
        metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
        title: `پست‌های دسته‌ ${categoryName} | ساخت یار`,
        description: `مطالب و مقالات مرتبط با ${categoryName} در حوزه ساخت و ساز و معماری.`,
        keywords: [categoryName, "ساختمان", "ساخت و ساز", "معماری", "پروژه‌های ساختمانی"],
        robots: "index, follow",
        openGraph: {
            type: "article",
            url: `${baseUrl}/blog/${categorySlug}`,
            title: `پست‌های دسته‌بندی ${categoryName} | ساخت یار`,
            description: `در این بخش از سایت، جدیدترین مطالب مرتبط با ${categoryName} را بخوانید.`,
            images: [
                {
                    url: `${baseUrl}/category.webp`,
                    width: 1200,
                    height: 630,
                    alt: `پست‌های دسته‌بندی ${categoryName}`,
                },
            ],
            siteName: "ساخت یار",
        },
        twitter: {
            card: 'summary_large_image',
            title: `پست‌های دسته‌بندی ${categoryName} | ساخت یار`,
            description: `مطالب جدید در زمینه ${categoryName} را بخوانید.`,
            images: [`${baseUrl}/category.webp`],
        },
        alternates: {
            canonical: `${baseUrl}/blog/${categorySlug}`,
        },
    };
}
export default async function page(query: PageType) {
    const data: ALlPostCategory = await getData(query)
    return (
        <>
            <Breadcrums />
            <div className="classDiv">
                <section className="flex w-full flex-col gap-2 md:gap-3 mt-3 md:mt-6">
                    <h1 className='font-semibold dark:text-h-dark text-gray-700 lg:text-lg'>پست های دسته {data?.category?.name}</h1>
                    <h2 className="mt-2 text-gray-600 dark:text-p-dark">
                        تمامی مطالب مرتبط با دسته‌بندی {'"'}{data?.category?.name}{'"'} در این صفحه فهرست شده‌اند.
                    </h2>
                </section>
                <div className="my-5">
                    <Cards props={data.rows} />
                </div>
                <div>
                    <Suspense fallback={"در حال بارگیری ..."}>
                        <Pagination pagination={data.paginate} />
                    </Suspense >
                </div>
            </div>
            <ContactSocialMedia />
        </>
    )
}
