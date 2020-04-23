<template>
  <img :src="currentSrc" v-bind="attrs"/>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import CircularProgress from '@/components/Basic/CircularProgress.vue'
import { delay } from '@/utils/util'

@Component({
  components: {
    CircularProgress
  }
})
export default class LazyImage extends Vue {
  @Prop() private src!: string
  private attrs: Record<string, string> = {}
  private currentSrc = '/images/loading.gif'

  private created () {
    const { ...attrs } = this.$attrs
    const src = this.src
    this.attrs = attrs
    const imgElement = document.createElement('img')
    imgElement.onload = async () => {
      await delay(100)
      this.currentSrc = src
    }
    imgElement.src = src
  }
}
</script>
