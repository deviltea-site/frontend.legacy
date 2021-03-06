<template>
  <li>
    <router-link
      class="article-list-item"
      :to="{ name: 'Article', params: { articleId: articleMeta.id } }"
    >
      <div class="thumb">
        <DButton
          v-if="isDevelopment"
          class="edit-article-btn"
          :to="{ name: 'EditArticle', params: { articleId: articleMeta.id } }"
          @click.stop
        >
          <DIcon name="pencil"></DIcon>
          <span>編輯文章</span>
        </DButton>
        <LazyImage v-if="articleMeta.thumb" :src="articleMeta.thumb" />
        <div v-else class="icon-container">
          <DIcon name="book-open-variant"></DIcon>
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
              :to="{
                name: 'ArticleList',
                query: { categories: articleMeta.category }
              }"
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
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import DButton from '@/components/Basic/DButton.vue'
import DIcon from '@/components/Basic/DIcon.vue'
import LazyImage from '@/components/Basic/LazyImage.vue'
import { ArticleMeta } from '@/interfaces/Article'
import appModule from '@/store/modules/app'

@Component({
  components: {
    DButton,
    DIcon,
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

  private get isDevelopment () {
    return appModule.isDevelopment
  }
}
</script>
