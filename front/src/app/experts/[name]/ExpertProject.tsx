"use client"
import { fetchApi } from '@/action/fetchApi'
import { CardProjectsType } from '@/app/type'
import CardProjects from '@/components/CardProjects/CardProjects'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MdOutlineDataSaverOn } from 'react-icons/md'

export default function ExpertProject({ data, expertId }: { data: CardProjectsType[], expertId: number }) {
    const [project, setProject] = useState<CardProjectsType[]>(data || [])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState<number | null>(2)
    const getProject = async () => {
        setLoading(true)
        toast.loading("...صبر کنید", { id: "expert", position: "bottom-center" })
        const url = `project?page=${page}&expert=${expertId}`
        const data = await fetchApi({ url })
        setProject([...project, ...data?.rows])
        setPage(data.paginate.nextPage || null)
        setLoading(false)
        toast.dismiss("expert")
        if (data?.error) {
            toast.error("با خطا مواجه شدیم!")
        }
    }
    return (
        <>
            <div className='w-full grid grid-cols-4 gap-5'>
                {project.map((item, index) => (
                    <CardProjects project={item} key={index} />
                ))}
            </div>
            <div className='w-1/6 mx-auto my-6'>
                {page ?
                    <CustomButton name='نمایش بیشتر' disable={loading} iconEnd={<MdOutlineDataSaverOn />} type='button' onClick={getProject} />
                    : null}
            </div>
        </>
    )
}
