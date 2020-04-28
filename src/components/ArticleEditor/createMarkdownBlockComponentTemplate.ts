import { VueConstructor } from 'vue'
import { Vue, Component } from 'vue-property-decorator'
import { compileToFunctions } from 'vue-template-compiler'
import { getElementMarkdownContent } from '@/utils/markdown'

const createBlockComponentTemplate = function (el: HTMLElement, index: number): VueConstructor<Vue> {
  el.setAttribute('v-if', '!isEditing')
  el.setAttribute('v-on:click.prevent', 'clickBlock')
  const template = `<div>
    ${el.outerHTML}
    <textarea v-else v-model="content" @click="isEditing = false" rows="4"></textarea>
  </div>
  `

  @Component({
    ...compileToFunctions(template)
  })
  class MarkdownBlock extends Vue {
    private isEditing = false
    private content = getElementMarkdownContent(el)
    private clickBlock () {
      this.isEditing = true
    }
  }

  return Vue.component('MarkdownBlock', MarkdownBlock)
}

export default createBlockComponentTemplate
