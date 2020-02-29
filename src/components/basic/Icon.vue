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
import { Component, Vue, Prop } from 'vue-property-decorator'
import icons from '@/utils/icon'

@Component({})
export default class Icon extends Vue {
  @Prop()
  private name!: string

  private get mdiName () {
    return 'mdi' + this.name.trim().split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('')
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
