export interface Category {
  id: string;
  name: string;
}

export interface CategoryList {
  categories: Category[];
  message: string;
}
