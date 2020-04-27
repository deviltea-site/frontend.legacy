export type Data = ArticleMeta | ArticleList | Category | CategoryList | Tag | TagList

export interface Article {
  meta: ArticleMeta;
  content: string;
}

export interface ArticleMeta {
  id: string;
  title: string;
  thumb?: string;
  description: string;
  category: string;
  tags: string[];
  createdTime: string;
  updatedTime: string | null;
}

export interface ArticleList {
  articles: string[];
}

export interface CategoryList {
  categories: string[];
}

export interface Category {
  name: string;
  articles: string[];
}

export interface TagList {
  tags: string[];
}

export interface Tag {
  name: string;
  articles: string[];
}
