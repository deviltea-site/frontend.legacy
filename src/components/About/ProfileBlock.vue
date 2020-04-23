<template>
  <section id="profile" class="about-block">
    <img class="avatar" :src="profileData.avatarUrl" alt="my handsome avatar" />
    <div class="info">
      <h2 class="underlined">{{ profileData.realname }}</h2>
      <div
        v-for="(row, index) in contactRows"
        :key="`contacts-row-${index}`"
        class="contacts"
      >
        <div v-for="contact in row" :key="contact.name" class="contact">
          <DButton
            class="contact__btn"
            :href="contact.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="contact.ariaLabel"
            circular
          >
            <DIcon :name="contact.icon"></DIcon>
          </DButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ProfileData } from '@/interfaces/AboutData'
import DButton from '@/components/Basic/DButton.vue'
import DIcon from '@/components/Basic/DIcon.vue'

@Component({
  components: {
    DIcon,
    DButton
  }
})
export default class ProfileBlock extends Vue {
  @Prop() private profileData!: ProfileData

  private get contactRows () {
    const contacts = this.profileData.contacts
    const halfLength = contacts.length / 2
    return [
      contacts.slice(0, halfLength),
      contacts.slice(halfLength)
    ]
  }
}
</script>
