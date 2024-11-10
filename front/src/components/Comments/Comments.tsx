import React from 'react'
import ImgTag from '../ImgTag/ImgTag'
import { CommentsType } from '@/app/type'
import ResComment from '../ResComment/ResComment'
export default function Comments({ comments, postId }: { comments: CommentsType[], postId?: number }) {
    const ReplyComments = ({ data }: { data: CommentsType }) => {
        return <>
            <div key={data?.id} className='relative'>
                <div className='w-12 lg:w-16 absolute right-0 transform translate-x-1/2 top-1 lg:top-3 p-1 bg-white border rounded-full'>
                    <ImgTag width={60} height={60} className='rounded-full w-10 lg:w-14 lg:h-14 h-10 shadow-md' src={data.position === "ADMIN" ? "/image-admin.png" : "/semicolon-image.png"} alt={data?.name} />
                </div>
                <div className='border my-2 rounded-sm shadow-sm pr-7 lg:pr-10 pl-2 lg:pl-3 py-2 lg:py-5'>
                    <div className='flex w-full justify-between mb-3'>
                        <div className='flex flex-col'>
                            <span className='font-bold text-sm lg:text-base text-gray-700'>{data?.name}</span>
                            <span className='text-[0.60rem] lg:text-xs text-gray-400 italic'>{new Date(data?.createdAt).toLocaleDateString("fa")}</span>
                        </div>
                        <ResComment comment={data} postId={postId} />
                    </div>
                    <div className='text-justify text-sm text-gray-700 pl-5'>
                        <p>{data?.text}</p>
                    </div>
                </div>
            </div>
            {data?.replies?.length ?
                <div className='mr-6 lg:mr-8 relative'>
                    {data?.replies?.map((i, index) => (
                        <ReplyComments data={i} key={index} />
                    ))}
                </div>
                : null}
        </>
    }
    return (
        <div className='comments mb-3' id='comments'>
            <h5 className='text-sm lg:text-lg mb-3'><span className='text-[#58b2e9]'>کامنت</span> کاربران</h5>
            <div className='mr-6 lg:mr-8 relative'>
                {comments.length ? comments.map((i, index) => (
                    <ReplyComments data={i} key={index} />
                )) : <span className='text-sm lg:text-xl'>هیچ کامنتی ثبت نشده !</span>}
            </div>
        </div>
    )
}
