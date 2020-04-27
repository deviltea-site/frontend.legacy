<template>
  <section class="content">
    <component
      v-for="(component, index) in blocks"
      :key="`md-block-${index}`"
      :is="component"
    ></component>
  </section>
</template>

<script lang="ts">
import { VueConstructor } from 'vue'
import { Vue, Component, Model } from 'vue-property-decorator'
import { renderMarkedMarkdown } from '@/utils/markdown'
import createMarkdownBlockComponentTemplate from './createMarkdownBlockComponentTemplate'

interface Block {
  component: VueConstructor<Vue>;
  content: string;
}

@Component({})
export default class MarkdownEditor extends Vue {
  @Model() private content!: string

  private get renderedHtml () {
    return renderMarkedMarkdown(this.content)
  }

  private get blocks (): VueConstructor<Vue>[] {
    const container = document.createElement('div')
    container.innerHTML = this.renderedHtml
    const elements = Array.from(container.children) as HTMLElement[]
    return elements.map((element, index) => {
      const id = `md-block-${index}`
      element.id = id
      return createMarkdownBlockComponentTemplate(element)
    })
  }
}
</script>
