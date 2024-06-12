export type CategortType = {
    id: number,
    name: string,
    slug: string,
    parentCategoryId: null | number,
    subCategory: CategortType[]
}