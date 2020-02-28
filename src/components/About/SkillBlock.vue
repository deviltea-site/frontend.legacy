<template>
  <section id="skill" class="about-block">
    <h3 class="underlined">技能</h3>
    <section
      v-for="data in groupedData"
      :key="`section-${data.title}`"
      class="skill-section"
    >
      <h4>{{ data.title }}</h4>
      <div>
        <span
          v-for="skill in data.skills"
          :key="`skill-${skill.name}`"
          class="skill-chip"
          :data-tooltip="skill[subSortSequence[groupedBy]]"
        >
          {{ skill.name }}
        </span>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { SkillData, SkillSortSequence } from '@/interfaces/AboutData'
import { groupBy } from 'lodash-es'

const subSortSequence: { [key: string]: string } = {
  category: 'proficiency',
  type: 'proficiency',
  proficiency: 'type'
}

@Component({})
export default class SkillBlock extends Vue {
  @Prop() private skillData!: SkillData[]
  @Prop() private skillSortSequence!: SkillSortSequence
  private groupedBy = 'category'
  private subSortSequence = subSortSequence

  private get groupedData () {
    return Object.entries(groupBy(this.skillData, this.groupedBy))
      .sort((entryA, entryB) => {
        return this.skillSortSequence[this.groupedBy].indexOf(entryA[0]) - this.skillSortSequence[this.groupedBy].indexOf(entryB[0])
      })
      .map((entry) => {
        return {
          title: entry[0],
          skills: entry[1].sort((skillA: SkillData, skillB: SkillData) => {
            const s = subSortSequence[this.groupedBy]
            return this.skillSortSequence[s].indexOf(skillA[s]) - this.skillSortSequence[s].indexOf(skillB[s])
          })
        }
      })
  }
}
</script>
