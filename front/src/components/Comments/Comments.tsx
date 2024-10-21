import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { IoArrowRedoSharp } from 'react-icons/io5'
import { CommentsType } from '@/app/type'
export default function Comments({ comments }: { comments: CommentsType[] }) {
    const ReplyComments = ({ data }: { data: CommentsType }) => {
        return <>
            <div key={data.id} className='relative'>
                <div className='w-16 absolute right-0 transform translate-x-1/2 top-4 p-1 bg-white border rounded-full'>
                    <ImgTag width={80} height={50} className='rounded-full shadow-md' src={"/image-admin.png"} alt={"person"} />
                </div>
                <div className='border my-2 rounded-sm shadow-sm pr-10 pl-3 py-5'>
                    <div className='flex w-full justify-between mb-3'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-gray-700'>{data.name}</span>
                            <span className='text-xs text-gray-400 italic'>{new Date(data.createdAt).toLocaleDateString("fa")}</span>
                        </div>
                        <i className='cursor-pointer hover:text-gray-950 text-gray-500'>
                            <IoArrowRedoSharp />
                        </i>
                    </div>
                    <div className='text-justify text-sm text-gray-700 pl-5'>
                        <p>{data.text}</p>
                    </div>
                </div>
            </div>
            {data.replies.length ?
                <div className='mr-8 relative'>
                    {data.replies.map((i, index) => (
                        <ReplyComments data={i} key={index} />
                    ))}
                </div>
                : null}
        </>
    }
    return (
        <div className='comments mb-3' id='comments'>
            <h5 className=' text-lg mb-3'><span className='text-[#58b2e9]'>کامنت</span> کاربران</h5>
            <div className='mr-8 relative'>
                {comments.length ? comments.map((i, index) => (
                    <ReplyComments data={i} key={index} />
                )) : <span>هیچ کامنتی ثبت نشده !</span>}
            </div>
        </div>
    )
}
