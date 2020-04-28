<template>
  <section v-html="content" class="content-section"></section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ContentSection extends Vue {
  @Prop() private content!: string
}
</script>
