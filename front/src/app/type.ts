type CardPostType = {
  Category?: { slug: string; name: string };
  description: string;
  id: number;
  image: string;
  status: boolean;
  title: string;
  totalComments: null | number;
  updatedAt: Date;
};
type ALlPostCategory = {
  count: number,
  rows: CardPostType[]
  category: {
    id: number,
    name: string
  },
  paginate: PaginationType
}
type AllCardPostType = {
  count: number
  rows: CardPostType[]
  paginate: PaginationType
}
type CategoryType = {
  id: number
  name: string
  slug: string
  parentCategoryId: number | null
  subCategory: CategoryType[] | []
}
type PaginationType = {
  allPage: number;
  nextPage?: number;
  prevPage?: number;
};
type CardProjectsType = {
  url: string;
  src: string;
  title: string;
  address: string;
}[];
type CommentsType = {
  id: number
  position: "USER" | "ADMIN" | "AUTHOR"
  name: string,
  text: string
  createdAt: Date,
  replies: CommentsType[]
}
type PostType = {
  id: number,
  title: string,
  image: string,
  description: string,
  totalComments: number,
  status: boolean,
  updatedAt: Date,
  DetailPost: {
    text: string
    title: string,
    keyword: string[]
  },
  User: {
    name: string
  },
  Tags: {
    id: number,
    name: string
  }[]
  Category: CategoryType
  Comments: CommentsType[]
}
type Footertype = {
  data: {
    id: number,
    page: string,
    text: {
      text: string,
      logoUrl: {
        alt: string,
        url: string
      },
      menuLink:
      {
        id: number,
        link: string,
        name: string
      }[][]
    }
  }
}
export type { Footertype, CardPostType, PostType, ALlPostCategory, AllCardPostType, PaginationType, CardProjectsType, CategoryType, CommentsType };
