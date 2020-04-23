<template>
  <span class="d-icon" :style="{
    '--icon-size': size,
    '--icon-color': color
  }">
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
export default class DIcon extends Vue {
  @Prop() private name!: string
  @Prop() private size!: string
  @Prop() private color!: string

  private get mdiName () {
    return 'mdi' + this.name.trim().split('-').map(word => word[0].toUpperCase() + word.slice(1)).join('')
  }

  private get path () {
    return (icons as { [key: string]: string })[this.mdiName]
  }
}
</script>
