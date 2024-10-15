type CategortType = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  parentCategory?: {
    name: string;
  };
  parentCategoryId: string | null;
};
type UserArrayType = {
  count: number;
  rows: UserType[];
  pagination: PaginationType;
};
type PaginationType = {
  allPage: number;
  nextPage?: number;
  prevPage?: number;
};
type UserType = {
  id: string;
  name?: string;
  email: string;
  phone?: string;
  role?: string;
  password?: string;
  createdAt: Date;
};
type FormPostType = {
  title: string;
  slug: string;
  description: string;
  status: boolean;
  categoryId: string;
  titleDetail: string;
};
type FormDetailType = {
  text: string;
  title: string;
  keyward: string[];
  id: string;
};
type AllPostType = {
  count: number;
  rows: PostType[];
  paginate: PaginationType;
};
type PostType = {
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
type SinglePostType = {
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
type AllReviewType = {
  count: number;
  rows: ReviewType[];
  paginate: PaginationType;
};
type ReviewType = {
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
type LinkSidebarType = {
  icon: React.ReactNode;
  url: string;
  name: string;
};
type AllonlinePriceType = {
  count: number;
  rows: OnlinePriceType[];
  paginate: PaginationType;
};
type OnlinePriceType = {
  id: number;
  name: string;
  phone: string;
  price: string;
  description: string;
  subject: string;
  images: string[];
  size: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};
type AllMessageType = {
  count: number;
  rows: MessageType[];
  pager: PaginationType;
};
type MessageType = {
  id: number;
  name: string;
  phone: string;
  status: boolean;
  subject: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
};
type MediaType = {
  url: string;
  id: number;
  status: boolean;
  type: "video" | "image";
};
type DataMediaType = {
  url: string;
  alt: string;
};
type TagType = {
  id: number;
  name: string;
};
type WorkerType = {
  id: number;
  name: string;
  phone: string;
  socialMedia: {
    link: string;
    type: string;
    id: number;
    text: string;
  }[];
  address: string;
  description: string;
  image: string;
  alt: string | null;
  createdAt: Date;
  updatedAt: Date;
  Tags: 
    {
      name: string;
      workerTags?: {
        TagId: number;
        WorkerId: number;
      };
    }[]
};
type AllWorkerType = {
  count: number;
  rows: WorkerType[];
  paginate: PaginationType;
};
export type {
  ReviewType,
  CategortType,
  UserArrayType,
  PaginationType,
  UserType,
  FormPostType,
  FormDetailType,
  AllPostType,
  PostType,
  SinglePostType,
  AllReviewType,
  LinkSidebarType,
  OnlinePriceType,
  AllonlinePriceType,
  AllMessageType,
  MessageType,
  MediaType,
  DataMediaType,
  TagType,
  WorkerType,
  AllWorkerType,
};