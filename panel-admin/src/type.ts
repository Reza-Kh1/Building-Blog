export type CategortType = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  parentCategory?: {
    name: string;
  };
  parentCategoryId: string | null;
};
export type UserArrayType = {
  count: number;
  rows: UserType[];
  pagination: PaginationType;
};

export type PaginationType = {
  allPage: number;
  nextPage?: number;
  prevPage?: number;
};
export type UserType = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  password?: string;
  createdAt: Date;
};
