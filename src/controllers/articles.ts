import axios from 'axios'
import { ArticleList, ArticleMeta } from '@/interfaces/Article'

const publicPath = process.env.BASE_URL

export async function getArticleList () {
  const { data } = await axios.get(`${publicPath}api/articles.json`)
  return data as ArticleList
}

export async function getArticleMeta (id: string) {
  const { data } = await axios.get(`${publicPath}api/articles/${id}/meta.json`)
  return data as ArticleMeta
}

export async function getArticleContent (id: string) {
  const { data } = await axios.get(`${publicPath}api/articles/${id}/content.html`)
  return data as string
}

export async function getArticleSource (id: string) {
  const { data } = await axios.get(`${publicPath}api/articles/${id}/source.md`)
  return data as string
}
