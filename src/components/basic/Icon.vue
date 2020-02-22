<template>
  <span class="icon">
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      style="width: 100%; height: auto;"
    >
      <path :d="path"></path>
    </svg>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as icons from '@mdi/js'

@Component({})
export default class Icon extends Vue {
  private get mdiName () {
    if (!this.$slots.default || !this.$slots.default[0] || !this.$slots.default[0].text) {
      return ''
    }
    return 'mdi' + this.$slots.default[0].text.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('')
  }

  private get path () {
    return (icons as { [key: string]: string })[this.mdiName]
  }
}
</script>

<style lang="scss">
.icon {
  display: inline-block;
  width: 24px;
  height: 24px;
}
</style>
