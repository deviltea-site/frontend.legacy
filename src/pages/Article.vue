<template>
  <main
    id="article"
    class="view-container content-container"
    :class="{
      loading: isLoading
    }"
  >
    <CircularProgress v-if="isLoading" color="#ccc"></CircularProgress>
    <article v-else class="article-body">
      <MetaHeader :meta="meta"></MetaHeader>
      <hr class="divider">
      <MarkdownSection :content="content"></MarkdownSection>
    </article>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CircularProgress from '@/components/Basic/CircularProgress.vue'
import MetaHeader from '@/components/Article/MetaHeader.vue'
import MarkdownSection from '@/components/Article/MarkdownSection.vue'
import { getArticleMeta, getArticleContent } from '@/controllers/articles'
import { ArticleMeta } from '@/interfaces/API'
import head from '@/utils/head'
import { delay } from '@/utils/util'
import '@/assets/scss/pages/article.scss'

@Component({
  components: {
    CircularProgress,
    MetaHeader,
    MarkdownSection
  }
})
export default class Article extends Vue {
  private content = ''
  private meta: ArticleMeta | null = null
  private isLoading = true

  private async loadInitData () {
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
  }

  private updateHead () {
    head.reset()
    if (this.meta === null) return
    const { title, description } = this.meta
    if (title) {
      head.title(title)
      head.ogTitle(title)
    }
    if (description) {
      head.description(description)
      head.ogDescription(description)
    }
  }

  public async mounted () {
    this.isLoading = true
    await this.loadInitData()
    this.updateHead()
    this.$emit('render')
    this.isLoading = false
  }
}
</script>
