export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CategoryList {
  categories: Category[];
  message: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface CreateCategoryResponse {
  message: string;
  category: Category;
}

export interface UpdateCategoryRequest extends CreateCategoryRequest {
  id: string;
}

export interface UpdateCategoryResponse {
  message: string;
  category: Category;
}

export interface DeleteCategoryResponse {
  message: string;
}
