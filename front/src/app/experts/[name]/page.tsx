import { fetchApi } from '@/action/fetchApi';
import { ExpertType } from '@/app/type';
import BannerCallUs from '@/components/BannerCallUs/BannerCallUs';
import Breadcrums from '@/components/Breadcrums/Breadcrums';
import CustomButton from '@/components/CustomButton/CustomButton';
import ImgTag from '@/components/ImgTag/ImgTag';
import Link from 'next/link';
import React from 'react'
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import SwiperCards from '@/components/SwiperCards/SwiperCards';
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
                <div className='flex gap-5 my-6 text-white'>
                    <div className='bg-gradient-to-t to-blue-400 from-slate-300 rounded-md shadow-md w-1/3 p-2 py-6 flex flex-col gap-3 justify-center items-center'>
                        <h1 className='font-semibold text-center text-xl'>
                            رضا خانی
                        </h1>
                        <ImgTag alt={"alt"} src={"/errorImage.png"} width={300} height={300} className='rounded-full shadow-md w-40 h-40 object-cover mx-auto' />

                        <Link href={""} className='flex gap-3 items-center py-2 px-4 hover:bg-blue-400/70 hover:shadow-md rounded-md'>
                            <FaPhone />
                            09390199977
                        </Link>
                        <div className='text-sm hover:bg-blue-400/70 hover:shadow-md py-2 px-4 rounded-md text-white'>
                            عضویت : {" "}
                            <span>
                                {new Date(data.createdAt).toLocaleDateString("fa")}
                            </span>
                        </div>
                        <div className='w-full justify-center text-white flex gap-1'>
                            <p>تخصص :</p>
                            <span>
                                {data.Tags.map((i, index) => {
                                    if ((index + 1) === data.Tags.length) return i.name
                                    return i.name + " ، "
                                })}
                            </span>
                        </div>
                        <Link href={`tel:${data.phone}`} className='text-gray-600 mx-auto hover:text-blue-400 hover:shadow-blue-300 flex items-center px-5 bg-gray-50  shadow-md p-1 rounded-md text-[17px] gap-1'>
                            <i>
                                <FaPhone />
                            </i>
                            <span className='inline-block'>
                                تماس بگیرید
                            </span>
                        </Link>
                    </div>
                    <div className='w-2/3 flex flex-col gap-5'>
                        <div className='bg-gradient-to-t to-blue-400 from-slate-300 rounded-md shadow-md  p-2 py-6'>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias soluta blanditiis molestiae at eaque repudiandae recusandae iste quasi cupiditate laudantium, nostrum excepturi nisi adipisci impedit necessitatibus fugit fugiat numquam aliquam.
                            </p>
                        </div>
                        <div className='bg-gradient-to-t to-blue-400 from-slate-300 rounded-md shadow-md p-2 py-6'>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum nam vel aspernatur, placeat perferendis molestias, hic adipisci dicta blanditiis perspiciatis corrupti iure ratione dolorem labore. Obcaecati architecto praesentium rerum vitae!</p>
                        </div>
                    </div>
                </div>
                {/* <div className='bg-black w-full text-white flex gap-1 shadow-2xl my-5 rounded-md h-[600px]'>
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
                </div> */}
            </div>
            <BannerCallUs />
            <div className='w-full max-w-7xl mx-auto'>
                <SwiperCards title='پروژه های مشابه' url={`/project?page=1&order=createdAt-DESC&expert=${data.id}`} data={data.Projects} />
                {/* <h3 className='font-semibold mb-6 text-xl'>
                    پروژه های مجری
                </h3>
                <ExpertProject data={data.Projects} expertId={data.id} /> */}
            </div>
        </div>

    )
}
