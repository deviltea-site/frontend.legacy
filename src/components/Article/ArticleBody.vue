<template>
  <article class="article-body">
    <header class="info">
      <h1 class="info__title">{{ meta.title }}</h1>
      <div class="info__date">
        <span>{{ time.text }}</span>
        <span>{{ time.date.toLocaleString() }}</span>
      </div>
      <div class="info-meta">
        <div class="info-meta__category">
          <span class="label">分類：</span>
          <router-link
            class="link"
            :to="{ name: 'ArticleList', query: { categories: meta.category } }"
            >{{ meta.category }}</router-link
          >
        </div>
        <div v-if="meta.tags.length > 0" class="info-meta__tags">
          <span class="label">標籤：</span>
          <router-link
            v-for="tag in meta.tags"
            :key="`article-${meta.id}-tag-${tag}`"
            class="tag"
            :to="{ name: 'ArticleList', query: { tags: tag } }"
          >
            {{ tag }}
          </router-link>
        </div>
      </div>
      <div class="info__description">{{ meta.description }}</div>
    </header>
    <hr>
    <section v-html="renderedHtml" class="content"></section>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import renderMarkdown from '@/utils/renderMarkdown'
import { ArticleMeta } from '@/interfaces/API'

@Component({})
export default class ArticleBody extends Vue {
  @Prop() private meta!: ArticleMeta
  @Prop() private content!: string

  private get time () {
    return {
      text: this.meta.updatedTime ? '上次更新' : '發表時間',
      date: new Date(this.meta.updatedTime || this.meta.createdTime)
    }
  }

  private get renderedHtml () {
    return renderMarkdown(this.content)
  }
}
</script>
