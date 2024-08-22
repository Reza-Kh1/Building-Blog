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
export type FormPostType = {
  title: string;
  slug: string;
  description: string;
  status: boolean;
  categoryId: string;
  titleDetail: string;
};
export type FormDetailType = {
  text: string;
  title: string;
  keyward: string[];
  id: string;
};
export type AllPostType = {
  count: number;
  rows: PostType[];
  paginate: PaginationType;
};
export type PostType = {
  id: number;
  title: string;
  image: null;
  slug: string;
  description: string;
  totalComments: null;
  status: true;
  updatedAt: Date;
  Category: {
    slug: string;
    name: string;
  };
  User: {
    name: string;
  };
};
export type SinglePostType = {
  id: string;
  title: string;
  image: string;
  slug: string;
  description: string;
  totalComments: null | number;
  status: boolean;
  updatedAt: Date;
  DetailPost: {
    text: string | null;
    title: string | null;
    keyword: null | string[];
  };
  User: {
    name: string;
  };
  Category?: {
    name: string;
    id: string;
    slug: string;
  };
};
export type AllReviewType = {
  count: number;
  rows: ReviewType[];
  paginate: PaginationType;
};
export type ReviewType = {
  id: number;
  name: string | null;
  text: string | null;
  email: string | null;
  phone: string | null;
  parentId: number | null;
  status: boolean;
  createdAt: Date;
  Post?: {
    id: string;
    slug?: string;
  };
};
