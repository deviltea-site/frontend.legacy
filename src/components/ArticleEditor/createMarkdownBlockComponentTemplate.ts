import Vue$ from 'vue/dist/vue.esm.js'
import { VueConstructor } from 'vue'
import { Vue, Component } from 'vue-property-decorator'

const createBlockComponentTemplate = function (el: HTMLElement): VueConstructor<Vue$> {
  el.setAttribute('v-if', '!isEditing')
  el.setAttribute('v-on:click', `clickBlock('${el.id}')`)
  const template = `
  ${el.outerHTML}
  <div v-else @click="isEditing = false">waa</div>
  `

  @Component({
    template
  })
  class MarkdownBlock extends Vue {
    private isEditing = false
    private content = el.getAttribute('data-md-content') || ''
    private clickBlock (id: string) {
      this.isEditing = true
      this.$emit('block-click', id)
    }
  }

  return Vue$.component('MarkdownBlock', MarkdownBlock)
}

export default createBlockComponentTemplate
