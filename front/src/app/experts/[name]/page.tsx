import { fetchApi } from '@/action/fetchApi';
import React from 'react'
const getData = () => {
    return fetchApi({ url: "" })
}
export default async function page({ params }: { params: { name: string } }) {
    // const data = await getData(params)
    return (
        <div className='bg-black w-full text-white'>page</div>
    )
}
