import Breadcrums from '@/components/Breadcrums/Breadcrums'
import ImgTag from '@/components/ImgTag/ImgTag';
import Image from 'next/image';
import React from 'react'
const getData = () => {

}
export default async function page({ params }: { params: { slug: string } }) {
    // const data = getData()
    console.log(params.slug);

    return (
        <div className='w-full'>
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
