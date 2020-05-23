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
      aria-label="the button for scrolling to top"
      circular
      @click="scrollTo('#top-anchor')"
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
import appModule, { DeviceType, EnvironmentType } from '@/store/modules/app'
import head from './utils/head'
import { getFullUrl, isSameRoute, scrollTo } from './utils/util'
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

  private async scrollTo (selector: string) {
    const container = document.getElementById('app')
    if (container === null) return
    await scrollTo({
      container,
      to: document.querySelector(selector) as HTMLElement
    })
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
      this.scrollTo(`#${CSS.escape(hashValue)}`)
    } else {
      this.scrollTo('#top-anchor')
    }
  }

  private detectDevice () {
    const windowWidth = window.innerWidth
    const root = document.documentElement
    const mobileMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--mobile-max-width').replace('px', ''))
    const tabletMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--tablet-max-width').replace('px', ''))
    if (windowWidth > tabletMaxWidth) {
      appModule.setDevice(DeviceType.Desktop)
    } else if (windowWidth > mobileMaxWidth) {
      appModule.setDevice(DeviceType.Tablet)
    } else {
      appModule.setDevice(DeviceType.Mobile)
    }
  }

  private startToDetectDevice () {
    this.detectDevice()
    window.addEventListener('resize', this.detectDevice)
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
    this.startToDetectDevice()
    appModule.setEnvironment(process.env.NODE_ENV === 'development' ? EnvironmentType.Development : EnvironmentType.Production)
  }

  private beforeDestroy () {
    window.removeEventListener('resize', this.detectDevice)
  }
}
</script>
