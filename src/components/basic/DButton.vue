<template>
  <a :class="cssClass" v-if="domType === 'a'" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </a>
  <button :class="cssClass" v-else-if="domType === 'button'" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </button>
  <router-link :class="cssClass" v-else v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

type domType = 'a' | 'button' | 'router-link'

@Component({})
export default class DButton extends Vue {
  private get cssClass () {
    return {
      'd-button': true,
      circular: Object.keys(this.$attrs).includes('circular') && (this.$attrs.circular as unknown) !== false
    }
  }

  private get domType (): domType {
    const attrsKey = Object.keys(this.$attrs)
    const routerLinkAttrsKey = ['to', 'replace', 'append', 'tag', 'active-class', 'exact', 'event', 'exact-active-class']
    if (attrsKey.some((attrKey) => routerLinkAttrsKey.includes(attrKey))) {
      return 'router-link'
    } else if (attrsKey.includes('href')) {
      return 'a'
    }
    return 'button'
  }
}
</script>
