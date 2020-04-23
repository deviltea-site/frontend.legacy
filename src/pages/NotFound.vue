<template>
  <main
    id="not-found"
    class="view-container breathe animated very-slow infinite"
  >
    <h2>404</h2>
    <h1>Not Found</h1>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import '@/assets/scss/pages/not-found.scss'

@Component({})
export default class NotFound extends Vue {
  public mounted () {
    this.$emit('render')
  }
}
</script>
