import { fetchApi } from '@/action/fetchApi'
import React from 'react'
import OrderSearch from '@/components/OrderSearch/OrderSearch'
import { Breadcrumbs } from '@mui/material'
import { AllExpertType, FilterQueryType } from '../type'
import CardExperts from '@/components/CardExperts/CardExperts'
import Pagination from '@/components/Pagination/Pagination'
import DontData from '@/components/DontData/DontData'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
import NotFound from '../not-found'
const getData = async (query: FilterQueryType) => {
    const url = "worker?" + new URLSearchParams(query)
    const data = await fetchApi({ url })
    if (data.error) return NotFound();
    return data
}
export default async function page({ searchParams }: { searchParams: FilterQueryType }) {
    const data: AllExpertType = await getData(searchParams)
    return (
        <div className='w-full my-6'>
            <Breadcrumbs />
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-semibold'> مجریان سایت ساختمان یار</h1>
                    <div className='w-1/3'>
                        <OrderSearch />
                    </div>
                </div>
                {data?.rows?.length ?
                    <div className='grid gap-5 grid-cols-4 my-6'>
                        {data.rows.map((items, index) => (
                            <CardExperts key={index} {...items} />
                        ))}
                    </div>
                    : <DontData name='هیچ متخصصی یافت نشد!' />}
                <Pagination pagination={data.paginate} />
            </div>
            <ContactSocialMedia />
        </div >
    )
}
