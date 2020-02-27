<template>
  <main id="home" class="view-container">
    <div class="logo">
      <div class="first-line slide-fade-top-in animated">Hello, I am</div>
      <div class="second-line font-bold slide-fade-right-in animated">
        DevilTea
      </div>
      <div class="third-line slide-fade-bottom-in animated">
        a newbie frontend developer
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class About extends Vue {
  public mounted () {
    this.$emit('render')
  }
}
</script>
