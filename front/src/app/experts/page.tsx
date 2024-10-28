import { fetchApi } from '@/action/fetchApi'
import React from 'react'
import FilterSearch from '../search/FilterSearch'
import OrderSearch from '@/components/OrderSearch/OrderSearch'
import { Breadcrumbs } from '@mui/material'
const getData = () => {
    return fetchApi({ url: "worker/page" })
}
export default async function page({ searchParams }) {
    const data = getData()
    return (
        <div className='w-full my-6'>
            <div className='max-w-7xl mx-auto'>
                <Breadcrumbs />
                <div className=' flex items-center justify-between'>
                    <h1 className='font-semibold'> اعضای تیم سایت ساختمان یار</h1>
                    <div className='w-1/4'>
                        <OrderSearch />
                    </div>
                </div>
            </div>

        </div >
    )
}
