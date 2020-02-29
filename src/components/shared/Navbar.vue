<template>
  <nav id="navbar" class="slide-fade-left-in animated">
    <div
      v-for="item in items"
      :key="`navbar-item-${item.name}`"
      class="navbar__item"
      :class="{ hidden: !showAllItems }"
    >
      <a
        class="btn"
        :class="{ active: item.name === currentRouteName }"
        @click="clickItem(item)"
      >
        <Icon :name="item.icon"></Icon>
      </a>
    </div>
    <div v-if="isMobile" class="navbar__item">
      <a class="btn" @click="isToggled = !isToggled">
        <Icon :name="menuIcon"></Icon>
      </a>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Icon from '@/components/basic/Icon.vue'
import appModule from '@/store/modules/app'

interface NavbarItem {
  name: string;
  icon: string;
  ariaLabel: string;
}

@Component({
  components: {
    Icon
  }
})
export default class Navbar extends Vue {
  private isToggled = false
  private items: NavbarItem[] = [
    {
      name: 'Home',
      icon: 'home',
      ariaLabel: 'click to go to Home page'
    },
    {
      name: 'About',
      icon: 'information',
      ariaLabel: 'click to go to About page'
    }
  ]

  private get isMobile () {
    return appModule.isMobile
  }

  private get menuIcon () {
    return this.isMobile && this.isToggled ? 'menu-left' : 'menu-right'
  }

  private get showAllItems () {
    return !this.isMobile || (this.isMobile && this.isToggled)
  }

  private get currentRouteName () {
    return this.$route.name
  }

  private clickItem (item: NavbarItem) {
    this.$router.push({
      name: item.name
    }).catch(() => null)
  }
}
</script>
