<template>
  <div id="app">
    <div id="top-anchor"></div>
    <Navbar></Navbar>
    <keep-alive :include="needKeepAliveRoutesName">
      <router-view class="fade-in animated" @render="onPageRender" />
    </keep-alive>
    <Footer></Footer>
    <DButton
      v-if="showScrollToTopButton"
      class="scroll-to-top-btn"
      v-scroll-to="'#top-anchor'"
      aria-label="the button for scrolling to top"
      circular
    >
      <DIcon name="arrow-collapse-up"></DIcon>
    </DButton>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import Navbar from '@/components/App/Navbar.vue'
import Footer from '@/components/App/Footer.vue'
import DIcon from '@/components/Basic/DIcon.vue'
import DButton from '@/components/Basic/DButton.vue'
import appModule, { DeviceType } from '@/store/modules/app'
import head from './utils/head'
import { getFullUrl, isSameRoute } from './utils/util'
import '@/assets/scss/app.scss'

@Component({
  components: {
    Navbar,
    Footer,
    DIcon,
    DButton
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
    document.dispatchEvent(new Event('x-app-rendered'))
  }

  private detectRouteScroll (to: Route, from?: Route) {
    if (isSameRoute(to, from)) return
    const hashValue = to.hash.substr(1)
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

  private detectHeadMeta (to: Route, from?: Route) {
    if (isSameRoute(to, from)) return
    if (to.name !== 'Article') {
      head.reset()
      const { title, description, withSuffix = true } = to.meta
      if (title) {
        head.title(title, withSuffix)
        head.ogTitle(title, withSuffix)
      }
      if (description) {
        head.description(description)
        head.ogDescription(description)
      }
    }
    head.ogUrl(getFullUrl(to.fullPath))
  }

  @Watch('$route')
  private async onRouteChange (to: Route, from: Route) {
    this.detectHeadMeta(to, from)
    await this.$nextTick()
    this.detectRouteScroll(to, from)
  }

  private mounted () {
    this.startToDetectDeviceType()
  }

  private beforeDestroy () {
    window.removeEventListener('resize', this.detectDeviceType)
  }
}
</script>
