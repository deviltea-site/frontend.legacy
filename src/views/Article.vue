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
import renderMarkdown from '@/utils/renderMarkdown'

@Component({})
export default class Article extends Vue {
  private markdownContent = ''

  private get renderedHtml () {
    return renderMarkdown(this.markdownContent)
  }

  private async loadInitData () {
    try {
      const articleId = parseInt(this.$route.params.articleId)
      this.markdownContent = await getArticleContent(articleId)
    } catch (error) {
      await this.$router.replace({
        name: 'NotFound'
      }).catch(() => null)
    }
  }

  public async mounted () {
    await this.loadInitData()
    this.$emit('render')
  }
}
</script>
