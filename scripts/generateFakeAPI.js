/* eslint-disable @typescript-eslint/no-var-requires */
/*
type Data = ArticleMeta | ArticleList | Category | CategoryList | Tag | TagList

interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  createdTime: Date;
  updatedTime?: Date;
}

interface ArticleList {
  articles: number[];
}

interface CategoryList {
  categories: string[];
}

interface Category {
  name: string;
  articles: number[];
}

interface TagList {
  tags: string[];
}

interface Tag {
  name: string;
  articles: number[];
}
*/
const fs = require('fs')
const path = require('path')
const rootPath = path.join(__dirname, '..')
const sourceArticlesDir = path.join(rootPath, 'articles/')
const apiDir = path.join(rootPath, 'public/api/')

/**
 * Output JSON file
 *
 * @param {Data} data
 * @param {string} path
 * @returns
 */
async function generateJSON (data, _path) {
  await fs.promises.mkdir(path.join(_path, '..'), { recursive: true })
  await fs.promises.writeFile(_path, JSON.stringify(data))
}
/**
 * Read all articles meta.json
 *
 * @returns
 */
async function readAllArticlesMeta () {
  const articlesDir = sourceArticlesDir
  const articlesDirs = (await fs.promises.readdir(articlesDir).catch(() => []))
    .map((dirname) => path.join(articlesDir, dirname))
    .filter(async (dir) => (await fs.promises.stat(dir)).isDirectory())
  const metas = articlesDirs.map(dir => {
    const metaPath = path.join(dir, 'meta.json')
    const meta = require(metaPath)
    return meta
  })
  return metas
}
/**
 * Generate articles' data
 *
 * @param {ArticleMeta[]} metas
 */
async function generateArticlesData (metas) {
  const articlesDir = path.join(apiDir, 'articles/')
  const articlesPath = path.join(apiDir, 'articles.json')
  const articleList = {
    articles: metas.map((meta) => meta.id)
  }
  await generateJSON(articleList, articlesPath)

  metas.forEach(async (meta) => {
    const articleDir = path.join(articlesDir, `${meta.id}`)
    const articleMetaPath = path.join(articleDir, 'meta.json')
    const sourceArticleContentPath = path.join(sourceArticlesDir, `${meta.id}`, 'content.md')
    const articleContentPath = path.join(articleDir, 'content.md')
    await generateJSON(meta, articleMetaPath)
    await fs.promises.copyFile(sourceArticleContentPath, articleContentPath)
  })
}
/**
 * Generate categories' data
 *
 * @param {ArticleMeta[]} metas
 */
async function generateCategoriesData (metas) {
  const categoriesPath = path.join(apiDir, 'categories.json')
  const categoriesDir = path.join(apiDir, 'categories/')
  const tempCategories = {}
  metas.forEach((meta) => {
    if (tempCategories[meta.category] && tempCategories[meta.category].length) {
      tempCategories[meta.category].push(meta.id)
    } else {
      tempCategories[meta.category] = [meta.id]
    }
  })
  const categoryList = {
    categories: Object.keys(tempCategories)
  }
  await generateJSON(categoryList, categoriesPath)

  Object.entries(tempCategories).forEach(async (entry) => {
    const categoryPath = path.join(categoriesDir, `${entry[0]}.json`)
    const category = {
      name: entry[0],
      articles: entry[1]
    }
    await generateJSON(category, categoryPath)
  })
}
/**
 * Generate tags' data
 *
 * @param {ArticleMeta[]} metas
 */
async function generateTagsData (metas) {
  const tagsPath = path.join(apiDir, 'tags.json')
  const tagsDir = path.join(apiDir, 'tags/')
  const tempTags = {}
  metas.forEach((meta) => {
    meta.tags.forEach((tag) => {
      if (tempTags[tag] && tempTags[tag].length) {
        tempTags[tag].push(meta.id)
      } else {
        tempTags[tag] = [meta.id]
      }
    })
  })
  const tagList = {
    tags: Object.keys(tempTags)
  }
  await generateJSON(tagList, tagsPath)

  Object.entries(tempTags).forEach(async (entry) => {
    const tagPath = path.join(tagsDir, `${entry[0]}.json`)
    const tag = {
      name: entry[0],
      articles: entry[1]
    }
    await generateJSON(tag, tagPath)
  })
}
/**
 * Script's main function
 *
 */
async function generate () {
  const metas = (await readAllArticlesMeta())
    .sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
  await fs.promises.rmdir(apiDir, { recursive: true })
  await generateArticlesData(metas)
  await generateCategoriesData(metas)
  await generateTagsData(metas)
}

generate()
  .then(() => console.log('FakeAPI generated!'))
