<template>
  <main id="about" class="view-container">
    <article class="content-container">
      <ProfileBlock :profile-data="aboutData.profile"></ProfileBlock>
      <IntroBlock :intro-data="aboutData.intro"></IntroBlock>
      <div class="experience-skill-container">
        <ExperienceBlock
          :experience-data="aboutData.experience"
        ></ExperienceBlock>
        <SkillBlock
          :skill-data="aboutData.skill"
          :skill-sort-sequence="aboutData.skillSortSequence"
        ></SkillBlock>
      </div>
      <!-- <ProjectBlock></ProjectBlock> -->
    </article>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProfileBlock from '@/components/About/ProfileBlock.vue'
import IntroBlock from '@/components/About/IntroBlock.vue'
import ExperienceBlock from '@/components/About/ExperienceBlock.vue'
import SkillBlock from '@/components/About/SkillBlock.vue'
// import ProjectBlock from '@/components/About/ProjectBlock.vue'
import AboutData from '@/interfaces/AboutData'
import aboutData from '@/assets/json/about.json'
import '@/assets/scss/pages/about.scss'

@Component({
  components: {
    ProfileBlock,
    IntroBlock,
    ExperienceBlock,
    SkillBlock
    // ProjectBlock
  }
})
export default class About extends Vue {
  private aboutData: AboutData = aboutData

  public mounted () {
    this.$emit('render')
  }
}
</script>
