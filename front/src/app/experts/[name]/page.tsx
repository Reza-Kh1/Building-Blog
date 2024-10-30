import { fetchApi } from '@/action/fetchApi';
import { ExpertType } from '@/app/type';
import BannerCallUs from '@/components/BannerCallUs/BannerCallUs';
import Breadcrums from '@/components/Breadcrums/Breadcrums';
import CardProjects from '@/components/CardProjects/CardProjects';
import CustomButton from '@/components/CustomButton/CustomButton';
import ImgTag from '@/components/ImgTag/ImgTag';
import SwiperCards from '@/components/SwiperCards/SwiperCards';
import Link from 'next/link';
import React from 'react'
import { FaPhone, FaWhatsapp } from 'react-icons/fa6';
import ExpertProject from './ExpertProject';
const getData = (name: string) => {
    const url = 'worker/' + name.replace(/-/g, " ")
    return fetchApi({ url })
}
export default async function page({ params }: { params: { name: string } }) {
    const { data }: { data: ExpertType } = await getData(params.name)
    return (
        <div className='w-full'>
            <div className='w-full max-w-7xl mx-auto mt-6'>
                <Breadcrums />
                <div className='bg-black w-full text-white flex gap-1 shadow-2xl my-5 rounded-md h-[600px]'>
                    <div className='w-1/2 flex flex-col items-center gap-3 h-full'>
                        <div className='w-full bg-slate-50 min-h-[400px] custom-rounded pt-2 flex justify-center pb-8 shadow-md'>
                            <div className='text-center'>
                                <ImgTag alt={"alt"} src={"/errorImage.png"} width={300} height={300} className='rounded-full shadow-md w-40 h-40 object-cover' />
                                <h1 className='font-semibold text-slate-700 text-xl mt-2'>
                                    رضا خانی
                                </h1>
                            </div>
                        </div>
                        <p className='p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ea earum consequatur hic. Eum, obcaecati! Voluptates sunt vitae exercitationem magnam, quod voluptatum consequuntur aliquam deleniti explicabo ipsa harum, aspernatur quibusdam.</p>
                    </div>
                    <div className='w-1/2 flex flex-col items-center justify-between h-full gap-3'>
                        <p className='p-1'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt ea earum consequatur hic. Eum, obcaecati! Voluptates sunt vitae exercitationem magnam, quod voluptatum consequuntur aliquam deleniti explicabo ipsa harum, aspernatur quibusdam.</p>
                        <div className='w-full min-h-[400px] gap-1 bg-slate-50 text-slate-600 custom-rounded-reverse pt-8 flex flex-col items-center pb-2 shadow-md'>
                            <Link href={""} className='w-1/3 block'>
                                <CustomButton name='تماس بگیرید' className='w-full' type='button' iconEnd={<FaPhone />} />
                            </Link>
                            <Link href={""} className='flex items-center gap-2'>
                                <i><FaWhatsapp /></i>
                                <span>واتساپ</span>
                            </Link>
                            <Link href={""} className='flex items-center gap-2 hover:bg-gradient-to-tr hover:to-blue-400 hover:text-white hover:from-slate-600 hover:shadow-md p-2 rounded-md'>
                                <i><FaPhone /></i>
                                <span>09390199977</span>
                            </Link>
                            <Link href={""} className='flex items-center gap-2 hover:bg-gradient-to-tr hover:to-blue-400 hover:text-white hover:from-slate-600 hover:shadow-md p-2 rounded-md'>
                                <i><FaPhone /></i>
                                <span>09226115716</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <BannerCallUs />
            <div className='w-full max-w-7xl mx-auto'>
                <ExpertProject data={data.Projects} />
            </div>
        </div>

    )
}
