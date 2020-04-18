export interface ArticleMeta {
  id: number;
  title: string;
  thumb?: string;
  description: string;
  category: string;
  tags: string[];
  createdTime: string;
  updatedTime?: string;
}

export interface ArticleList {
  articles: number[];
}

export interface CategoryList {
  categories: string[];
}

export interface Category {
  name: string;
  articles: number[];
}

export interface TagList {
  tags: string[];
}

export interface Tag {
  name: string;
  articles: number[];
}
