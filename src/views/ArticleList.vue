<template>
  <main id="article-list" class="view-container">
    <h1 style="color: white;">List</h1>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class ArticleList extends Vue {
  public mounted () {
    this.$emit('render')
  }
}
</script>
