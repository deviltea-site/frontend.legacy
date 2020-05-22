<template>
  <section id="content" v-html="content" class="content-section"></section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { delay } from '../../utils/util'

@Component({})
export default class ContentSection extends Vue {
  @Prop() private content!: string

  private intersectionObserver: IntersectionObserver | null = null

  @Watch('content')
  private async onContentChange () {
    this.destroyIntersectionObserver()
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = img.getAttribute('data-src')
          observer.unobserve(img)
          if (src !== null) {
            const _img = new Image()
            _img.onload = async () => {
              await delay(500)
              img.replaceWith(_img)
            }
            _img.src = src
            _img.classList.add('loaded')
            const width = img.getAttribute('width')
            const height = img.getAttribute('height')
            if (width !== null) _img.setAttribute('width', width)
            if (height !== null) _img.setAttribute('height', height)
          }
        }
      })
    })
    await this.$nextTick()
    const contentDOM = document.getElementById('content')
    if (contentDOM === null) return
    contentDOM.querySelectorAll('img.loading')
      .forEach((img) => {
        if (this.intersectionObserver === null) return
        this.intersectionObserver.observe(img)
      })
  }

  private destroyIntersectionObserver () {
    if (this.intersectionObserver !== null) {
      this.intersectionObserver.disconnect()
      this.intersectionObserver = null
    }
  }

  private mounted () {
    this.onContentChange()
  }

  private beforeDestroyed () {
    this.destroyIntersectionObserver()
  }
}
</script>
