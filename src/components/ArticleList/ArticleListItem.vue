<template>
  <router-link
    class="article-list-item"
    :to="{ name: 'Article', params: { articleId: articleMeta.id } }"
  >
    <div class="thumb">
      <LazyImage v-if="articleMeta.thumb" :src="articleMeta.thumb" />
      <div v-else class="icon-container">
        <Icon name="book-open-variant"></Icon>
      </div>
    </div>
    <div class="info">
      <div class="info__title">{{ articleMeta.title }}</div>
      <div class="info__date">
        <span>{{ time.text }}</span>
        <span>{{ time.date.toLocaleString() }}</span>
      </div>
      <div class="info__description">{{ articleMeta.description }}</div>
      <div class="info-meta">
        <div class="info-meta__category">
          <span class="label">分類：</span>
          <router-link
            class="link"
            :to="{ name: 'ArticleList', query: { categories: articleMeta.category } }"
            >{{ articleMeta.category }}</router-link
          >
        </div>
        <div v-if="articleMeta.tags.length > 0" class="info-meta__tags">
          <span class="label">標籤：</span>
          <router-link
            v-for="tag in articleMeta.tags"
            :key="`article-${articleMeta.id}-tag-${tag}`"
            class="tag"
            :to="{ name: 'ArticleList', query: { tags: tag } }"
          >
            {{ tag }}
          </router-link>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import Icon from '@/components/basic/Icon.vue'
import LazyImage from '@/components/basic/LazyImage.vue'
import { ArticleMeta } from '@/interfaces/API'

@Component({
  components: {
    Icon,
    LazyImage
  }
})
export default class ArticleListItem extends Vue {
  @Prop() private articleMeta!: ArticleMeta

  private get time () {
    return {
      text: this.articleMeta.updatedTime ? '上次更新' : '發表時間',
      date: new Date(this.articleMeta.updatedTime || this.articleMeta.createdTime)
    }
  }
}
</script>
