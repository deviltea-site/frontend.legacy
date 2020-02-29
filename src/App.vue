<template>
  <div id="app">
    <Navbar></Navbar>
    <router-view class="fade-in animated" @render="dispatchRenderEvent" />
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
  public dispatchRenderEvent () {
    document.dispatchEvent(new Event('x-app-rendered'))
  }

  public detectDeviceType () {
    const windowWidth = window.innerWidth
    console.log('windowWidth: ', windowWidth)
    const root = document.documentElement
    const mobileMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--mobile-max-width').replace('px', ''))
    console.log('mobileMaxWidth: ', mobileMaxWidth)
    const tabletMaxWidth = parseInt(getComputedStyle(root).getPropertyValue('--tablet-max-width').replace('px', ''))
    console.log('tabletMaxWidth: ', tabletMaxWidth)
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
    window.addEventListener('resize', () => {
      this.detectDeviceType()
    })
  }

  public mounted () {
    this.startToDetectDeviceType()
  }
}
</script>
