<template>
  <main
    id="article"
    class="view-container content-container"
    :class="{
      loading: isLoading
    }"
  >
    <CircularProgress v-if="isLoading" color="#ccc"></CircularProgress>
    <MarkdownArticle v-else :meta="meta" :content="content"></MarkdownArticle>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CircularProgress from '@/components/basic/CircularProgress.vue'
import MarkdownArticle from '@/components/Article/MarkdownArticle.vue'
import { getArticleMeta, getArticleContent } from '@/controllers/articles'
import { ArticleMeta } from '@/interfaces/API'
import head from '@/utils/head'
import { delay } from '@/utils/util'

@Component({
  components: {
    CircularProgress,
    MarkdownArticle
  }
})
export default class Article extends Vue {
  private content = ''
  private meta: ArticleMeta | null = null
  private isLoading = false

  private async loadInitData () {
    this.isLoading = true
    try {
      const articleId = this.$route.params.articleId
      this.meta = await getArticleMeta(articleId)
      this.content = await getArticleContent(articleId)
    } catch (error) {
      await this.$router.replace({
        name: 'NotFound'
      }).catch(() => null)
    }
    await delay(300)
    this.isLoading = false
  }

  private updateHead () {
    if (this.meta === null) return
    const { title, description } = this.meta
    if (title) {
      head.title(title)
      head.ogTitle(title)
    }
    if (description) head.ogDescription(description)
  }

  public async mounted () {
    await this.loadInitData()
    this.updateHead()
    this.$emit('render')
  }
}
</script>
