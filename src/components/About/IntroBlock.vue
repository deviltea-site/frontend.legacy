<template>
  <section id="intro" class="about-block">
    <h3 class="underlined">關於</h3>
    <p>{{ introData }}</p>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class IntroBlock extends Vue {
  @Prop() private introData!: string
}
</script>
