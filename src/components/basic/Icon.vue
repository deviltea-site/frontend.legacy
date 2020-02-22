<template>
  <span>
    <svg fill="currentColor" viewBox="0 0 24 24" :width="size" :height="size">
      <path :d="path"></path>
    </svg>
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as icons from '@mdi/js'

@Component({})
export default class Icon extends Vue {
  @Prop() public name!: string
  @Prop({ default: 16 }) public size!: string | number

  private get mdiName () {
    return 'mdi' + this.name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join()
  }

  private get path () {
    return (icons as { [key: string]: string })[this.mdiName]
  }
}
</script>
