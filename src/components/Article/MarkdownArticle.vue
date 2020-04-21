<template>
  <article class="article-body">
    <header>
      <div class="feature-image-container"></div>
      <div class="meta">
        <div></div>
      </div>
    </header>
    <section v-html="renderedHtml"></section>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import renderMarkdown from '@/utils/renderMarkdown'
import { ArticleMeta } from '@/interfaces/API'

@Component({})
export default class MarkdownArticle extends Vue {
  @Prop() private meta!: ArticleMeta
  @Prop() private content!: string

  private get renderedHtml () {
    return renderMarkdown(this.content)
  }
}
</script>
