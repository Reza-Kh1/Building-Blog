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
type MenuComType = {
    name: string
    url: string
    child?: MenuComType
}[]

export type {
    CardPostType,
    PaginationType,
    MenuComType
}
