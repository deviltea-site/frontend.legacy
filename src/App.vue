<template>
  <div id="app">
    <div id="top-anchor"></div>
    <Navbar></Navbar>
    <keep-alive :include="needKeepAliveRoutesName">
      <router-view class="fade-in animated" @render="onPageRender" />
    </keep-alive>
    <Footer></Footer>
    <button
      v-if="showScrollToTopButton"
      class="scroll-to-top-btn icon-circular-btn"
      v-scroll-to="'#top-anchor'"
    >
      <Icon name="arrow-collapse-up"></Icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import Navbar from '@/components/shared/Navbar.vue'
import Footer from '@/components/shared/Footer.vue'
import Icon from '@/components/basic/Icon.vue'
import appModule, { DeviceType } from '@/store/modules/app'
import head from './utils/head'

@Component({
  components: {
    Navbar,
    Footer,
    Icon
  }
})
export default class App extends Vue {
  private needKeepAliveRoutesName = ['Home', 'About', 'ArticleList', 'NotFound']

  private get showScrollToTopButton () {
    return ['About', 'ArticleList', 'Article'].includes(this.$route.name || '')
  }

  private async onPageRender () {
    this.detectHeadMeta(this.$route)
    await this.$nextTick()
    this.detectRouteScroll(this.$route)
    document.dispatchEvent(new Event('x-app-rendered'))
  }

  private detectRouteScroll (route: Route) {
    const hashValue = route.hash.substr(1)
    if (hashValue) {
      this.$scrollTo(`#${CSS.escape(hashValue)}`)
    } else {
      this.$scrollTo('#top-anchor')
    }
  }

  private detectDeviceType () {
    const windowWidth = window.innerWidth
    const root = document.documentElement
    const mobileMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--mobile-max-width').replace('px', ''))
    const tabletMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--tablet-max-width').replace('px', ''))
    if (windowWidth > tabletMaxWidth) {
      appModule.setDeviceType(DeviceType.Desktop)
    } else if (windowWidth > mobileMaxWidth) {
      appModule.setDeviceType(DeviceType.Tablet)
    } else {
      appModule.setDeviceType(DeviceType.Mobile)
    }
  }

  private startToDetectDeviceType () {
    this.detectDeviceType()
    window.addEventListener('resize', this.detectDeviceType)
  }

  private detectHeadMeta (route: Route) {
    if (route.name !== 'Article') {
      head.reset()
      const { title, description, withSuffix = true } = route.meta
      if (title) {
        head.title(title, withSuffix)
        head.ogTitle(title, withSuffix)
      }
      if (description) {
        head.description(description)
        head.ogDescription(description)
      }
    }
    head.ogUrl(`https://deviltea.me${route.fullPath}`)
  }

  @Watch('$route')
  private onRouteChange (to: Route) {
    this.detectHeadMeta(to)
    this.detectRouteScroll(to)
  }

  private mounted () {
    this.startToDetectDeviceType()
  }

  private beforeDestroy () {
    window.removeEventListener('resize', this.detectDeviceType)
  }
}
</script>
