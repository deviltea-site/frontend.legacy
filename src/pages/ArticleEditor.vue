<template>
  <main
    id="article-editor"
    class="view-container"
    :class="{
      loading: isLoading,
      read: currentMode === 'read',
      write: currentMode === 'write',
      both: currentMode === 'both'
    }"
  >
    <div class="mode-switch-container">
      <nav class="mode-switch">
        <DButton
          v-for="data in modesButtonData"
          :key="`mode-switch-btn-${data.name}`"
          class="mode-switch__btn"
          :class="{ active: data.name === currentMode }"
          circular
          @click="setMode(data.name)"
        >
          <DIcon :name="data.icon"></DIcon>
        </DButton>
      </nav>
    </div>
    <CircularProgress v-if="isLoading" color="#ccc"></CircularProgress>
    <template v-else>
      <section class="editor-container">
        <CodeMirror
          v-model="markdownContent"
          :options="codeMirrorOptions"
        ></CodeMirror>
      </section>
      <div class="splitter"></div>
      <section class="preview-container">
        <article class="article-body">
          <MetaHeader v-if="isMetaValid" :meta="renderedData.meta"></MetaHeader>
          <ul v-else class="error-list">
            <li
              v-for="(msg, index) in metaErrorsMessage"
              :key="`error-msg-${index}`"
            >
              {{ msg }}
            </li>
          </ul>
          <ContentSection :content="renderedData.content"></ContentSection>
        </article>
      </section>
      <DButton class="download-btn" circular @click="saveArticle">
        <DIcon name="download"></DIcon>
      </DButton>
    </template>
  </main>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { renderMarkdown } from '@/utils/markdown'
import { getArticleSource } from '@/controllers/articles'
import { Route } from 'vue-router'
import { ArticleMeta } from '../interfaces/Article'
import { delay, saveFile } from '../utils/util'
import head from '../utils/head'
import CircularProgress from '@/components/Basic/CircularProgress.vue'
import MetaHeader from '@/components/Article/MetaHeader.vue'
import ContentSection from '@/components/Article/ContentSection.vue'
import DIcon from '@/components/Basic/DIcon.vue'
import DButton from '@/components/Basic/DButton.vue'
import { codemirror as CodeMirror } from 'vue-codemirror'
import appModule from '@/store/modules/app'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material.css'
import '@/assets/scss/pages/article-editor.scss'

type Mode = 'read' | 'write' | 'both'

interface ModeButtonData {
  name: Mode;
  icon: string;
  click: () => void;
}

@Component({
  components: {
    MetaHeader,
    ContentSection,
    CircularProgress,
    CodeMirror,
    DIcon,
    DButton
  }
})
export default class ArticleEditor extends Vue {
  private markdownContent = ''
  private isLoading = true
  private currentMode: Mode = 'both'
  private codeMirrorOptions = {
    tabSize: 2,
    indentWithTabs: true,
    foldGutter: true,
    styleActiveLine: true,
    lineNumbers: true,
    lineWrapping: true,
    line: true,
    viewportMargin: Infinity,
    mode: 'text/x-markdown',
    theme: 'material'
  }

  private get modesButtonData (): ModeButtonData[] {
    const datas: ModeButtonData[] = [
      {
        name: 'read',
        icon: 'eye',
        click: () => {
          this.currentMode = 'read'
        }
      },
      {
        name: 'both',
        icon: 'book-open',
        click: () => {
          this.currentMode = 'both'
        }
      },
      {
        name: 'write',
        icon: 'pencil',
        click: () => {
          this.currentMode = 'write'
        }
      }
    ]

    return this.isMobile ? datas.filter((data, index) => index !== 1) : datas
  }

  private get isMobile () {
    return appModule.isMobile
  }

  private get renderedData () {
    const parentContainer = document.createElement('div')
    const contentContainer = document.createElement('div')
    parentContainer.innerHTML = renderMarkdown(this.markdownContent)
    const meta: ArticleMeta = JSON.parse(parentContainer.querySelector('#json-meta')?.innerHTML || 'null')
    contentContainer.append(...Array.from(parentContainer.children).filter((element) => element.id !== 'json-meta'))
    return {
      meta,
      content: contentContainer.innerHTML
    }
  }

  private get isMetaValid () {
    return this.metaErrorsMessage.length === 0
  }

  private get metaErrorsMessage () {
    const { meta } = this.renderedData
    const validators = [
      () => !!meta || 'Missing "meta" object.',
      () => !!meta?.id || 'Missing property: "id" of meta.',
      () => !!meta?.title || 'Missing property: "title" of meta.',
      () => !!meta?.description || 'Missing property: "description" of meta.',
      () => !!meta?.category || 'Missing property: "description" of meta.',
      () => meta?.tags instanceof Array || 'Property: "tags" of meta should be an array.',
      () => new Date(meta?.createdTime).toJSON() !== null || 'Property: "createdTime" of meta should be an Date string.'
    ]
    return validators
      .map((validator) => validator())
      .filter((result) => result !== true)
  }

  private async loadInitData (route: Route) {
    this.isLoading = true
    if (route.name === 'EditArticle') {
      try {
        this.markdownContent = await getArticleSource(route.params.articleId)
      } catch (error) {
        await this.$router.replace({
          name: 'NotFound'
        }).catch(() => null)
      }
    } else {
      this.markdownContent = '' +
        '```json-meta\n' +
        '{\n' +
        '  "id": "new-article",' +
        '  "title": "New Article",\n' +
        '  "description": "New article\'s description.",\n' +
        '  "category": "Default",\n' +
        '  "tags": [],\n' +
        `  "createdTime": "${new Date().toJSON()}",\n` +
        '  "updatedTime": null\n' +
        '}\n' +
        '```'
    }
    await delay(300)
    this.isLoading = false
  }

  private updateHead (route: Route) {
    const title: { [name: string]: string } = {
      NewArticle: 'New Article',
      EditArticle: `Edit Article: ${this.renderedData.meta.title}`
    }
    head.reset()
    head.title(title[route.name || ''])
    head.ogTitle(title[route.name || ''])
  }

  private getFinalMeta (route: Route) {
    const meta: ArticleMeta = JSON.parse(JSON.stringify(this.renderedData.meta))
    const replacers: {
      [name: string]: () => ArticleMeta;
    } = {
      NewArticle: () => {
        meta.createdTime = new Date().toJSON()
        return meta
      },
      EditArticle: () => {
        meta.updatedTime = new Date().toJSON()
        return meta
      }
    }
    return replacers[route.name || '']()
  }

  private getFinalMarkdownContent (route: Route) {
    return this.markdownContent
      .replace(
        RegExp('(:?``` ?json-meta\\n)((.*\\n)*?)(:?```\\n)'),
        `\`\`\`json-meta\n${JSON.stringify(this.getFinalMeta(route), null, 2)}\n\`\`\`\n`
      )
  }

  private saveArticle () {
    if (this.isMetaValid) {
      saveFile(`${this.renderedData.meta.id}.md`, this.getFinalMarkdownContent(this.$route))
    }
  }

  private async setMode (mode: Mode) {
    this.isLoading = true
    const tempContent = this.markdownContent
    this.markdownContent = ''
    this.currentMode = mode
    await delay(100)
    this.markdownContent = tempContent
    this.isLoading = false
  }

  @Watch('isMobile')
  private onDeviceChange (newValue: boolean) {
    if (newValue && this.currentMode === 'both') {
      this.currentMode = 'write'
    } else {
      this.currentMode = 'both'
    }
  }

  @Watch('$route')
  private async onRouteChange (route: Route, oldRoute: Route) {
    if (route.name === oldRoute.name && route.params.articleId === oldRoute.params.articleId) return
    await this.loadInitData(route)
    this.updateHead(route)
  }

  private async mounted () {
    await this.loadInitData(this.$route)
    this.updateHead(this.$route)
  }
}
</script>
