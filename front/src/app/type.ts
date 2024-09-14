type CardPostType = {
    count: number
    paginate: PaginationType
    rows: {
        Category: { slug: string, name: string }
        description: string
        id: number
        image: string
        slug: string
        status: boolean
        title: string
        totalComments: null | number
        updatedAt: Date
    }[]
}
type PaginationType = {
    allPage: number
    nextPage?: number
    prevPage?: number
}
export type {
    CardPostType,
    PaginationType
}