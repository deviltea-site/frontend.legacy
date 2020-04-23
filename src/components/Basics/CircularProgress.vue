<template>
  <div class="lds-ring" :style="{
    '--color': color,
    '--size': size,
    '--width': width
  }">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CircularProgress extends Vue {
  @Prop() private color!: string
  @Prop() private size!: string
  @Prop() private width!: string
}
</script>
