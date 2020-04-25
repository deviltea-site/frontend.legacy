<template>
  <section v-html="renderedHtml" class="markdown-section"></section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { renderMarkedMarkdown as renderMarkdown } from '@/utils/markdown'

@Component({})
export default class ArticleBody extends Vue {
  @Prop() private content!: string

  private get renderedHtml () {
    return renderMarkdown(this.content)
  }
}
</script>
