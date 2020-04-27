<template>
  <header class="meta-header">
    <h1 class="meta-header__title">{{ meta.title }}</h1>
    <div class="meta-header__date">
      <span>{{ timeInfo.prefix }}</span>
      <span>{{ timeInfo.date.toLocaleString() }}</span>
    </div>
    <div class="category-tags-wrapper">
      <div class="category">
        <span class="label">分類：</span>
        <router-link
          class="category__link"
          :to="{ name: 'ArticleList', query: { categories: meta.category } }"
          >{{ meta.category }}</router-link
        >
      </div>
      <div v-if="meta.tags.length > 0" class="tags">
        <span class="label">標籤：</span>
        <router-link
          v-for="tag in meta.tags"
          :key="`article-${meta.id}-tag-${tag}`"
          class="tags__tag"
          :to="{ name: 'ArticleList', query: { tags: tag } }"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
    <div class="meta-header__description">{{ meta.description }}</div>
  </header>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ArticleMeta } from '@/interfaces/Article'

  @Component({})
export default class MetaHeader extends Vue {
  @Prop() private meta!: ArticleMeta

  private get timeInfo () {
    return {
      prefix: this.meta.updatedTime ? '上次更新' : '發表時間',
      date: new Date(this.meta.updatedTime || this.meta.createdTime)
    }
  }
}
</script>
