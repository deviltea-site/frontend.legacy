<template>
  <main id="article-list" class="view-container content-container">
    <template v-for="(meta, index) in sortedArticlesMeta">
      <div
        v-if="index !== 0"
        class="divider"
        :key="`article-info-divider-${index}`"
      ></div>
      <ArticleListItem
        :key="`article-info-${meta.id}`"
        :article-meta="meta"
      ></ArticleListItem>
    </template>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ArticleListItem from '@/components/ArticleList/ArticleListItem.vue'
import { getArticleList, getArticleMeta } from '@/controllers/articles'
import { ArticleMeta } from '../interfaces/API'

const COUNT_OF_ARTICLES_PER_PAGE = 10

@Component({
  components: {
    ArticleListItem
  }
})
export default class ArticleList extends Vue {
  private currentPage = 0
  private articles: string[] = []
  private articlesMeta: ArticleMeta[] = []

  private get sortedArticlesMeta () {
    return this.articlesMeta
      .sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
  }

  private async loadNextPage () {
    const nextPage = this.currentPage + 1
    const articles = this.articles.filter((id, index) => {
      return index >= (nextPage - 1) * COUNT_OF_ARTICLES_PER_PAGE &&
              index < nextPage * COUNT_OF_ARTICLES_PER_PAGE
    })

    if (articles.length === 0) return

    articles.forEach(async (id) => {
      this.articlesMeta.push(await getArticleMeta(id))
    })
    this.currentPage += 1
  }

  private async loadInitData () {
    const { articles } = await getArticleList()
    this.articles = articles
    await this.loadNextPage()
  }

  public async mounted () {
    await this.loadInitData()
    this.$emit('render')
  }
}
</script>
