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
