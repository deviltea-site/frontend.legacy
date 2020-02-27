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
}
</script>
