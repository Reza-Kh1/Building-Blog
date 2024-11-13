import { fetchApi } from '@/action/fetchApi'
import React, { Suspense } from 'react'
import OrderSearch from '@/components/OrderSearch/OrderSearch'
import { AllExpertType, FilterQueryType } from '../type'
import CardExperts from '@/components/CardExperts/CardExperts'
import Pagination from '@/components/Pagination/Pagination'
import DontData from '@/components/DontData/DontData'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
import NotFound from '../not-found'
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import { Metadata } from 'next'
const getData = async (query: FilterQueryType) => {
    const url = "worker?" + new URLSearchParams(query)
    const data = await fetchApi({ url })
    if (data.error) return NotFound();
    return data
}
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:3000"),
    title: 'مجری ها | ساخت یار',
    description: 'با مجری های برتر حوزه ساخت و ساز آشنا شوید. در این صفحه می‌توانید پروفایل مجری های ما را مشاهده کنید و برای پروژه‌های خود از آنها مشاوره و خدمات دریافت کنید.',
    keywords: [
        'متخصصان ساختمانی',
        'مشاورین ساخت و ساز',
        'پیمانکاران حرفه‌ای',
        'متخصص ساخت و ساز',
        'خدمات ساختمانی',
        'پروژه‌های ساخت و ساز',
        'مشاوره پروژه ساختمانی',
    ],
    openGraph: {
        title: 'مجری ها | ساخت یار',
        description: 'با متخصصان برتر حوزه ساخت و ساز آشنا شوید. در این صفحه می‌توانید پروفایل متخصصان ما را مشاهده کنید و برای پروژه‌های خود از آنها مشاوره و خدمات دریافت کنید.',
        url: `${process.env.NEXT_PUBLIC_URL + "/experts"}`,
        images: [
            {
                url: `${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`,
                width: 800,
                height: 600,
                alt: 'پروفایل متخصصان ساخت یار',
            },
        ],
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'مجری ها | ساخت یار',
        description: 'با متخصصان و مشاوران ساخت و ساز ما آشنا شوید و از خدمات حرفه‌ای آنها برای پروژه‌های خود استفاده کنید.',
        images: [`${process.env.NEXT_PUBLIC_URL + "/about-us.jpg"}`],
    },
    robots: "index, follow",
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_URL + "/about-us"}`,
    },
};
export default async function page({ searchParams }: { searchParams: FilterQueryType }) {
    const data: AllExpertType = await getData(searchParams)
    return (
        <>
            <Breadcrums />
            <div className='classDiv'>
                <section className='flex items-center justify-between'>
                    <h1 className='font-semibold lg:text-xl'> مجریان</h1>
                    <div className='w-1/3'>
                        <OrderSearch />
                    </div>
                </section>
                {data?.rows?.length ?
                    <div className='grid gap-2 md:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6'>
                        {data.rows.map((items, index) => (
                            <CardExperts key={index} {...items} />
                        ))}
                    </div>
                    : <DontData name='هیچ مجری یافت نشد!' />}
                <Suspense fallback={"در حال بارگیری ..."}>
                    <Pagination pagination={data.paginate} />
                </Suspense>
            </div>
            <ContactSocialMedia />
        </>
    )
}
