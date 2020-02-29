<template>
  <section id="profile" class="about-block">
    <img
      class="avatar slide-fade-right-in animated"
      :src="profileData.avatarUrl"
      alt="my handsome avatar"
    />
    <div class="info">
      <h2 class="underlined">{{ profileData.realname }}</h2>
      <div
        v-for="(row, index) in contactRows"
        :key="`contacts-row-${index}`"
        class="contacts"
      >
        <div v-for="contact in row" :key="contact.name" class="contact">
          <a
            class="contact-btn"
            :href="contact.href"
            target="_blank"
            :aria-label="contact.ariaLabel"
          >
            <Icon>{{ contact.icon }}</Icon>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ProfileData } from '@/interfaces/AboutData'
import Icon from '@/components/basic/Icon.vue'

@Component({
  components: {
    Icon
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
