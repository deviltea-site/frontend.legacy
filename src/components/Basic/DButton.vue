<template>
  <div class="d-button-container" :class="cssClass">
    <a
      class="d-button"
      v-if="domType === 'a'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div class="slot-container"><slot></slot></div>
    </a>
    <button
      class="d-button"
      v-else-if="domType === 'button'"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <div class="slot-container"><slot></slot></div>
    </button>
    <router-link class="d-button" v-else v-bind="$attrs" v-on="$listeners">
      <div class="slot-container"><slot></slot></div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

type domType = 'a' | 'button' | 'router-link'

@Component({})
export default class DButton extends Vue {
  private get cssClass () {
    return {
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
