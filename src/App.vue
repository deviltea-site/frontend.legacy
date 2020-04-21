<template>
  <div id="app">
    <Navbar></Navbar>
    <keep-alive :include="needKeepAliveRoutesName">
      <router-view class="fade-in animated" @render="dispatchRenderEvent" />
    </keep-alive>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Navbar from '@/components/shared/Navbar.vue'
import Footer from '@/components/shared/Footer.vue'
import appModule, { DeviceType } from '@/store/modules/app'

@Component({
  components: {
    Navbar,
    Footer
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
