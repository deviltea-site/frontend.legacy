<template>
  <div id="app">
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Footer from '@/components/shared/Footer.vue'

@Component({
  components: {
    Footer
  }
})
export default class App extends Vue {

}
</script>
