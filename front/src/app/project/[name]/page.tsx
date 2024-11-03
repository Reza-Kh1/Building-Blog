import { fetchApi } from '@/action/fetchApi';
import { ProjectType } from '@/app/type';
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import ImgTag from '@/components/ImgTag/ImgTag';
import { Metadata } from 'next';
import Image from 'next/image';
import Script from 'next/script';
import React from 'react'
const getData = (name: string) => {
    return fetchApi({ url: `project/${name.replace(/-/, " ")}` })
}
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
            url: process.env.NEXTAUTH_URL + "/project/" + data?.name.replace(/ /g, "-"),
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
    };
}
export default async function page({ params }: { params: { name: string } }) {
    const { data }: { data: ProjectType } = getData(params.name)
    const jsonld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: data?.name || "عنوان مقاله",
        image: data?.image || "آدرس تصویر",
        description: data?.description || "توضیحات مقاله",
        author: {
            "@type": "Person",
            name: data?.Worker.name || "نام نویسنده",
        },
        datePublished: data?.updatedAt || "تاریخ انتشار",
        articleBody: data?.description || "متن مقاله",
        keywords: data?.Tags.map((i) => i.name) || "کلمات کلیدی",
        url:
            `${process.env.NEXTAUTH_URL}/project/${data?.name.replace(/ /g, "-")}` ||
            "آدرس پروژه",
    };
    return (
        <div className='w-full'>
            <Script
                type="application/ld+json"
                id="jsonld-product"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
            />
            <div className='relative w-full h-[500px]'>
                <Image
                    src="/5.jpg"
                    quality={90}
                    alt="test"
                    fill
                    objectFit='cover'
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className='max-w-7xl w-full mx-auto mt-6'>
                <div className='mb-6'>
                    <Breadcrums />
                </div>
                <h1>
                    پروژه جدید
                </h1>
            </div>
        </div>
    )
}
