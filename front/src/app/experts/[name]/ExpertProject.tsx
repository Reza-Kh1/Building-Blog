"use client"
import { CardProjectsType } from '@/app/type'
import CardProjects from '@/components/CardProjects/CardProjects'
import CustomButton from '@/components/CustomButton/CustomButton'
import React, { useState } from 'react'
import { MdOutlineDataSaverOn } from 'react-icons/md'

export default function ExpertProject({ data }: { data: CardProjectsType[] }) {
    const [project, setProject] = useState<CardProjectsType[]>(data || [])
    const [page, setPage] = useState<number | null>(null)
    const getProject = () => {

    }
    console.log(project);

    return (
        <>
            <div className='w-full grid grid-cols-4 gap-5'>
                <CardProjects data={project} />
            </div>
            <div className='flex w-full justify-center my-6'>
                <CustomButton className='w-1/5' name='نمایش بیشتر' iconEnd={<MdOutlineDataSaverOn />} type='button' onClick={getProject} />
            </div>
        </>
    )
}
