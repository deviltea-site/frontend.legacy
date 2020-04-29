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
      <ContentSection :content="content"></ContentSection>
    </article>
    <DButton v-if="isDevelopment" class="edit-article-btn" :to="{
      name: 'EditArticle',
      params: {
        articleId: $route.params.articleId
      }
    }">
      <DIcon name="pencil"></DIcon>
      <span>編輯文章</span>
    </DButton>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import CircularProgress from '@/components/Basic/CircularProgress.vue'
import MetaHeader from '@/components/Article/MetaHeader.vue'
import ContentSection from '@/components/Article/ContentSection.vue'
import DButton from '@/components/Basic/DButton.vue'
import DIcon from '@/components/Basic/DIcon.vue'
import { getArticleMeta, getArticleContent } from '@/controllers/articles'
import { ArticleMeta } from '@/interfaces/Article'
import head from '@/utils/head'
import { delay } from '@/utils/util'
import '@/assets/scss/pages/article.scss'
import appModule from '@/store/modules/app'

@Component({
  components: {
    CircularProgress,
    MetaHeader,
    ContentSection,
    DIcon,
    DButton
  }
})
export default class Article extends Vue {
  private content = ''
  private meta: ArticleMeta | null = null
  private isLoading = true

  private get isDevelopment () {
    return appModule.isDevelopment
  }

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
