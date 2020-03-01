<template>
  <main id="article" class="view-container">
    <h1 style="color: white;">Article</h1>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Article extends Vue {
  public mounted () {
    this.$emit('render')
  }
}
</script>
