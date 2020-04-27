import fs from 'fs'
import path from 'path'
import cheerio from 'cheerio'
import { renderMarkdown } from '../src/utils/markdown'
import { Data, Article, ArticleMeta, ArticleList, Category, CategoryList, Tag, TagList } from '../src/interfaces/Article'

interface TempData {
  [key: string]: string[];
}

const rootPath = path.join(__dirname, '..')
const sourceArticlesDir = path.join(rootPath, 'articles/')
const apiDir = path.join(rootPath, 'public/api/')

function readAllArticles (): Article[] {
  return fs.readdirSync(sourceArticlesDir)
    .filter((_path) => _path.endsWith('.md') && fs.statSync(path.join(sourceArticlesDir, _path)).isFile())
    .map((_path) => fs.readFileSync(path.join(sourceArticlesDir, _path)).toString())
    .map((markdownContent) => renderMarkdown(markdownContent))
    .map((htmlContent) => cheerio.load(`<div id="cheerio-container">${htmlContent}</div>`, { _useHtmlParser2: true }))
    .filter(($) => JSON.parse($('#json-meta').html() || 'null') !== null)
    .map(($) => {
      const meta: ArticleMeta = JSON.parse($('#json-meta').html() || 'null')
      $('#json-meta').remove()
      const content = $('#cheerio-container').html() || ''
      return {
        meta,
        content
      }
    })
}

function generateJSON (data: Data, _path: string) {
  fs.mkdirSync(path.join(_path, '..'), { recursive: true })
  fs.writeFileSync(_path, JSON.stringify(data))
}

function generateArticlesData (articles: Article[]) {
  const articlesDir = path.join(apiDir, 'articles/')
  const articlesPath = path.join(apiDir, 'articles.json')
  const articleList: ArticleList = {
    articles: articles.map((article) => article.meta.id)
  }
  generateJSON(articleList, articlesPath)

  articles.forEach((article) => {
    const sourceArticlePath = path.join(sourceArticlesDir, `${article.meta.id}.md`)
    const articleDir = path.join(articlesDir, `${article.meta.id}`)
    const articleMetaPath = path.join(articleDir, 'meta.json')
    const articleContentPath = path.join(articleDir, 'content.html')
    const articleMarkdownPath = path.join(articleDir, 'source.md')
    generateJSON(article.meta, articleMetaPath)
    fs.writeFileSync(articleContentPath, article.content)
    fs.copyFileSync(sourceArticlePath, articleMarkdownPath)
  })
}

function generateCategoriesData (metas: ArticleMeta[]) {
  const categoriesPath = path.join(apiDir, 'categories.json')
  const categoriesDir = path.join(apiDir, 'categories/')
  const tempCategories: TempData = {}
  metas.forEach((meta) => {
    if (tempCategories[meta.category] && tempCategories[meta.category].length) {
      tempCategories[meta.category].push(meta.id)
    } else {
      tempCategories[meta.category] = [meta.id]
    }
  })
  const categoryList: CategoryList = {
    categories: Object.keys(tempCategories)
  }
  generateJSON(categoryList, categoriesPath)

  Object.entries(tempCategories).forEach((entry) => {
    const categoryPath = path.join(categoriesDir, `${entry[0]}.json`)
    const category: Category = {
      name: entry[0],
      articles: entry[1]
    }
    generateJSON(category, categoryPath)
  })
}

function generateTagsData (metas) {
  const tagsPath = path.join(apiDir, 'tags.json')
  const tagsDir = path.join(apiDir, 'tags/')
  const tempTags: TempData = {}
  metas.forEach((meta) => {
    meta.tags.forEach((tag) => {
      if (tempTags[tag] && tempTags[tag].length) {
        tempTags[tag].push(meta.id)
      } else {
        tempTags[tag] = [meta.id]
      }
    })
  })
  const tagList: TagList = {
    tags: Object.keys(tempTags)
  }
  generateJSON(tagList, tagsPath)

  Object.entries(tempTags).forEach((entry) => {
    const tagPath = path.join(tagsDir, `${entry[0]}.json`)
    const tag: Tag = {
      name: entry[0],
      articles: entry[1]
    }
    generateJSON(tag, tagPath)
  })
}

function generate () {
  const articles = readAllArticles()
  const metas = articles
    .map((article) => article.meta)
    .sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
  fs.rmdirSync(apiDir, { recursive: true })
  generateArticlesData(articles)
  generateCategoriesData(metas)
  generateTagsData(metas)
}

generate()
console.log('Article API generated!')
