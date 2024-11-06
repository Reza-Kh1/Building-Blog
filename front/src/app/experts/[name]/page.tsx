import { fetchApi } from '@/action/fetchApi';
import { ExpertType } from '@/app/type';
import BannerCallUs from '@/components/BannerCallUs/BannerCallUs';
import Breadcrums from '@/components/Breadcrums/Breadcrums';
import ImgTag from '@/components/ImgTag/ImgTag';
import Link from 'next/link';
import React from 'react'
import { FaPhone, FaWhatsapp } from 'react-icons/fa';
import SwiperCards from '@/components/SwiperCards/SwiperCards';
import { IoIosCheckmarkCircleOutline, IoLogoTwitter } from 'react-icons/io';
import { FaInstagram, FaLinkedin, FaTelegram } from 'react-icons/fa6';
import { BiLogoInternetExplorer } from 'react-icons/bi';
const dataSocialMedia = [
    {
        value: "whatsapp",
        icon: <FaWhatsapp className="text-2xl text-green-700" />,
    },
    {
        value: "telegram",
        icon: <FaTelegram className="text-2xl text-sky-500" />,
    },
    {
        value: "instagram",
        icon: <FaInstagram className="text-2xl text-red-500" />,
    },
    {
        value: "phone",
        icon: <FaPhone className="text-xl text-green-400" />,
    },
    {
        name: "Website",
        value: "web",
        icon: <BiLogoInternetExplorer className="text-2xl text-indigo-500" />,
    },
    {
        value: "twitter",
        icon: <IoLogoTwitter className="text-2xl text-sky-400" />,
    },
    {
        value: "linkedin ",
        icon: <FaLinkedin className="text-2xl text-blue-700" />,
    },
];
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
                    <div className='bg-gradient-to-t from-blue-400 to-slate-200 rounded-md shadow-md w-1/3 p-4 flex flex-col gap-3 justify-evenly items-center'>
                        <div className='flex justify-between items-center w-full bg-slate-50 shadow-md rounded-md text-black p-2'>
                            <h1 className='font-semibold text-center text-xl'>
                                {data.name}
                            </h1>
                            <span className='flex items-center gap-2'>
                                مورد تایید
                                <IoIosCheckmarkCircleOutline className='text-green-500 text-xl' />
                            </span>
                        </div>
                        <ImgTag alt={"alt"} src={"/errorImage.png"} width={300} height={300} className='rounded-full shadow-md w-40 h-40 object-cover mx-auto' />
                        <Link href={"tel:" + data.phone} className='flex gap-3 items-center py-2 px-4 hover:bg-blue-400/70 hover:shadow-md rounded-md'>
                            <FaPhone />
                            <h2>
                                {data.phone}
                            </h2>
                        </Link>
                        <div className='text-sm hover:bg-blue-400/70 hover:shadow-md py-2 px-4 rounded-md text-white'>
                            عضویت : {" "}
                            <span>
                                {new Date(data.createdAt).toLocaleDateString("fa")}
                            </span>
                        </div>
                        <div className='w-full justify-center text-white flex gap-1 items-center'>
                            <p>تخصص :</p>
                            {data.Tags.map((i, index) => {
                                if ((index + 1) === data.Tags.length) {
                                    return <Link key={index} className='hover:bg-blue-400/70 hover:shadow-md py-1 px-2 rounded-md' href={"/search?tags=" + i.name}>{i.name}</Link>
                                }
                                return <div key={index}><Link className='hover:bg-blue-400/70 hover:shadow-md py-1 px-2 rounded-md' href={"/search?tags=" + i.name}>{i.name}</Link><span> ، </span></div>
                            })}
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
                        <div className='bg-gradient-to-br to-blue-400 from-slate-300 rounded-md shadow-md p-4'>
                            <span className='text-xl mb-3 block'>معرفی</span>
                            <p>
                                {data?.description}
                            </p>
                            {data.address ? <>
                                <span className='text-xl my-3 block'>آدرس</span>
                                <p>
                                    {data.address}
                                </p>
                            </> : null}
                        </div>
                        <div className='bg-gradient-to-tr to-blue-400 from-slate-300 rounded-md shadow-md p-4'>
                            <span className='text-xl mb-3 block'>شبکه های اجتماعی</span>
                            <div className='grid grid-cols-2 gap-5'>
                                {data.socialMedia.map((i, index) => (
                                    <Link href={i.link} key={index} className='flex bg-slate-50 hover:shadow-blue-300 hover:text-blue-300 p-3 shadow-md text-gray-900 gap-2 rounded-md items-center'>
                                        <i>{dataSocialMedia?.find((item) => item.value === i.type)?.icon}</i>
                                        <span>{i.text}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BannerCallUs />
            <div className='w-full max-w-7xl mx-auto'>
                <SwiperCards title='پروژه های مشابه' url={`/project?page=1&order=createdAt-DESC&expert=${data.id}`} data={data.Projects} />
            </div>
        </div>
    )
}
