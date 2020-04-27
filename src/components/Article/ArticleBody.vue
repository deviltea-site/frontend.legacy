<template>
  <section v-html="content" class="article-body"></section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ArticleBody extends Vue {
  @Prop() private content!: string
}
</script>
