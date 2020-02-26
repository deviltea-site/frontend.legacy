<template>
  <section id="experience" class="about-block">
    <h3 class="underlined">經驗</h3>
    <ul>
      <li v-for="(exp, index) in experienceData" :key="`exp-${index}`">
        <div>
          <p class="duration">{{ exp.duration }}</p>
          <p class="title">{{ exp.title }}</p>
          <p class="subtitle">{{ exp.subtitle }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ExperienceBlock extends Vue {
  @Prop() private experienceData!: string
}
</script>
