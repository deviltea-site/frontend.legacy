<template>
  <div id="app">
    <div id="top-anchor"></div>
    <Navbar></Navbar>
    <keep-alive :include="needKeepAliveRoutesName">
      <router-view class="fade-in animated" @render="dispatchRenderEvent" />
    </keep-alive>
    <Footer></Footer>
    <button class="scroll-to-top-btn icon-circular-btn" v-scroll-to="'#top-anchor'">
      <Icon name="arrow-collapse-up"></Icon>
    </button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/shared/Navbar.vue'
import Footer from '@/components/shared/Footer.vue'
import Icon from '@/components/basic/Icon.vue'
import appModule, { DeviceType } from '@/store/modules/app'

@Component({
  components: {
    Navbar,
    Footer,
    Icon
  }
})
export default class App extends Vue {
  private needKeepAliveRoutesName = ['Home', 'About', 'ArticleList', 'NotFound']

  public dispatchRenderEvent () {
    document.dispatchEvent(new Event('x-app-rendered'))
  }

  public detectDeviceType () {
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

  public startToDetectDeviceType () {
    this.detectDeviceType()
    window.addEventListener('resize', this.detectDeviceType)
  }

  public mounted () {
    this.startToDetectDeviceType()
  }

  public beforeDestroy () {
    window.removeEventListener('resize', this.detectDeviceType)
  }
}
</script>
