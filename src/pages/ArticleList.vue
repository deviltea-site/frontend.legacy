<template>
  <main id="article-list" class="view-container content-container" :class="{
    loading: isLoading
  }">
    <CircularProgress v-if="isLoading" color="#ccc"></CircularProgress>
    <ul v-else>
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
    </ul>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import ArticleListItem from '@/components/ArticleList/ArticleListItem.vue'
import CircularProgress from '@/components/Basic/CircularProgress.vue'
import { getArticleList, getArticleMeta } from '@/controllers/articles'
import { ArticleMeta } from '../interfaces/API'
import { delay } from '@/utils/util'
import { Route } from 'vue-router'
import '@/assets/scss/pages/article-list.scss'

const COUNT_OF_ARTICLES_PER_PAGE = 10

interface FilterOption {
  accordingTo: 'category' | 'tag';
  value: string;
}

@Component({
  components: {
    ArticleListItem,
    CircularProgress
  }
})
export default class ArticleList extends Vue {
  private currentPage = 0
  private articlesId: string[] = []
  private articlesMeta: ArticleMeta[] = []
  private isLoading = false
  private filterOptions: FilterOption[] = []

  @Watch('$route')
  private async onRouteChange (newRoute: Route) {
    await this.detectFilterOptions(newRoute)
  }

  private get filteredArticlesMeta () {
    if (this.filterOptions.length === 0) {
      return this.articlesMeta
    }
    return this.articlesMeta
      .filter((articleMeta) => {
        const options = this.filterOptions
        const handlers = {
          category: (option: FilterOption) => articleMeta.category === option.value,
          tag: (option: FilterOption) => articleMeta.tags.includes(option.value)
        }
        return options.map((option) => handlers[option.accordingTo](option))
          .some((match) => match)
      })
  }

  private get sortedArticlesMeta () {
    return this.filteredArticlesMeta
      .sort((a, b) => new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime())
  }

  private async loadAllArticlesId () {
    this.isLoading = true
    const { articles } = await getArticleList()
    this.articlesId = articles
    this.isLoading = false
  }

  private async loadNextPageMetas () {
    this.isLoading = true
    const nextPage = this.currentPage + 1
    const articlesId = this.articlesId.filter((id, index) => {
      return index >= (nextPage - 1) * COUNT_OF_ARTICLES_PER_PAGE &&
              index < nextPage * COUNT_OF_ARTICLES_PER_PAGE
    })

    if (articlesId.length === 0) {
      await delay(300)
      this.isLoading = false
      return
    }

    const nextPageMetas = await Promise.all(articlesId.map((id) => getArticleMeta(id)))
    this.articlesMeta.push(...nextPageMetas)

    this.currentPage += 1

    await delay(500)
    this.isLoading = false
  }

  private async loadInitData () {
    await this.loadAllArticlesId()
    await this.loadNextPageMetas()
  }

  private async detectFilterOptions (route: Route) {
    this.isLoading = true
    const filterOptions: FilterOption[] = []
    const { query } = route
    if (query.tags) {
      (query.tags as string).split(',').forEach((tag) => filterOptions.push({
        accordingTo: 'tag',
        value: tag
      }))
    }

    if (query.categories) {
      (query.categories as string).split(',').forEach((category) => filterOptions.push({
        accordingTo: 'category',
        value: category
      }))
    }

    this.filterOptions = filterOptions

    await delay(300)
    this.isLoading = false
  }

  public async mounted () {
    await this.loadInitData()
    await this.detectFilterOptions(this.$route)
    this.$emit('render')
  }
}
</script>
