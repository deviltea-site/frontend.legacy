<template>
  <main id="article" class="view-container content-container">
    <article>
      <header>
        <div class="feature-image-container"></div>
        <div class="meta">
          <div></div>
        </div>
      </header>
      <section v-html="renderedHtml"></section>
    </article>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getArticleMeta, getArticleContent } from '@/controllers/articles'
import { ArticleMeta } from '@/interfaces/API'
import renderMarkdown from '@/utils/renderMarkdown'
import head from '../utils/head'

@Component({})
export default class Article extends Vue {
  private markdownContent = ''
  private meta: ArticleMeta | null = null

  private get renderedHtml () {
    return renderMarkdown(this.markdownContent)
  }

  private async loadInitData () {
    try {
      const articleId = parseInt(this.$route.params.articleId)
      this.meta = await getArticleMeta(articleId)
      this.markdownContent = await getArticleContent(articleId)
    } catch (error) {
      await this.$router.replace({
        name: 'NotFound'
      }).catch(() => null)
    }
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
