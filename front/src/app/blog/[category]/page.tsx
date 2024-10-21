import { fetchApi } from '@/action/fetchApi'
import { ALlPostCategory } from '@/app/type'
import Breadcrums from '@/components/Breadcrums/Breadcrums'
import Cards from '@/components/Cards/Cards'
import Pagination from '@/components/Pagination/Pagination'
import React from 'react'
type PageType = { params: { category: string }, searchParams: { page: string } }
const getData = (query: PageType) => {
    const url = `category/${query.params.category}?page=${query.searchParams.page || 1}`
    return fetchApi({ url, next: 60 * 60 * 24 * 5 })
}
export default async function page(query: PageType) {
    const data: ALlPostCategory = await getData(query)
    console.log(data);

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
        </div>
    )
}
