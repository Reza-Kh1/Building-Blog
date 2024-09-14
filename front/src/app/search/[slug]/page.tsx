import { fetchApi } from '@/action/fetchApi'
import NotFound from '@/app/not-found'
import { CardPostType } from '@/app/type'
import React from 'react'
type pageType = {
  params: {
    slug?: string
  }
  searchParams: any
}
const getData = async (slug: string) => {
  const data = await fetchApi({ url: `post?search=${slug}`, method: "GET" })
  if (data.error) return NotFound()
  return data
}
export default async function page({ params }: pageType) {
  if (!params.slug) return NotFound()
  const data: CardPostType = getData(params.slug)

  return (
    <div>page search</div>
  )
}