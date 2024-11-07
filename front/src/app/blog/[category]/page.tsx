import { fetchApi } from '@/action/fetchApi'
import NotFound from '@/app/not-found'
import { ALlPostCategory } from '@/app/type'
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import Cards from '@/components/Cards/Cards'
import ContactSocialMedia from '@/components/ContactSocialMedia/ContactSocialMedia'
import Pagination from '@/components/Pagination/Pagination'
import React from 'react'
type PageType = { params: { category: string }, searchParams: { page: string } }
const getData = async (query: PageType) => {
    const url = `category/${query.params.category}?page=${query.searchParams.page || 1}`
    const data = await fetchApi({ url })
    if (data.error) return NotFound();
    return data
}
export default async function page(query: PageType) {
    const data: ALlPostCategory = await getData(query)
    return (
        <div className='w-full'>
            <div className="max-w-7xl w-full mx-auto my-6">
                <Breadcrums />
                <div className="flex w-full items-center mt-6 justify-between">
                    <h1 className='font-semibold'>پست های دسته بندی {data?.category?.name}</h1>
                </div>
                <div className="my-5">
                    <Cards props={data.rows} />
                </div>
                <div>
                    <Pagination pagination={data.paginate} />
                </div>
            </div>
            <ContactSocialMedia />
        </div>
    )
}
