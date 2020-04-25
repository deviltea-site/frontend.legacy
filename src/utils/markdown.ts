import MarkdownIt from 'markdown-it'
import pluginSub from 'markdown-it-sub'
import pluginSup from 'markdown-it-sup'
import pluginFootnote from 'markdown-it-footnote'
import pluginDeflist from 'markdown-it-deflist'
import pluginAbbr from 'markdown-it-abbr'
import pluginEmoji from 'markdown-it-emoji'
import pluginContainer from 'markdown-it-container'
import pluginIns from 'markdown-it-ins'
import pluginMark from 'markdown-it-mark'
import pluginExternalLinks from 'markdown-it-external-links'
import pluginMarkAllMarkdownContents from './markdown-it-plugins/markAllMarkdownContents'
import pluginAnchor from 'markdown-it-anchor'
import pluginTOC from 'markdown-it-toc-done-right'
import Prism from 'prismjs'
import { highlightLanguages } from '@/../config.json'
import { getFullUrl } from '@/utils/util'

function createMarkdownIt () {
  return new MarkdownIt({
    html: true,
    xhtmlOut: false,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '“”‘’',
    highlight (text, lang) {
      if (lang && highlightLanguages.find((hlang) => hlang.name === lang || hlang.alias === lang)) {
        try {
          return `<pre class="code-block" data-lang="${lang}"><code>${Prism.highlight(text, Prism.languages[lang], lang)}</code></pre>`
        } catch (__) {}
      }
      return `<pre class="code-block"><code>${MarkdownIt().utils.escapeHtml(text)}</code></pre>`
    }
  })
    .use(pluginSub)
    .use(pluginSup)
    .use(pluginFootnote)
    .use(pluginDeflist)
    .use(pluginAbbr)
    .use(pluginEmoji)
    .use(pluginContainer, 'info')
    .use(pluginContainer, 'warning')
    .use(pluginContainer, 'error')
    .use(pluginContainer, 'success')
    .use(pluginIns)
    .use(pluginMark)
    .use(pluginExternalLinks, {
      internalDomains: [getFullUrl().split('/')[2]],
      externalTarget: '_blank',
      externalRel: 'noopener noreferrer'
    })
    .use(pluginAnchor, {
      level: [1, 2, 3],
      permalink: true,
      permalinkBefore: true
    })
    .use(pluginTOC, {
      containerClass: 'toc',
      level: [1, 2, 3],
      listType: 'ul'
    })
}

function createRenderMarkdownFunction () {
  const md = createMarkdownIt()
  return (markdownContent: string) => {
    return md.render(markdownContent)
  }
}

function createRenderMarkedMarkdownFunction () {
  const md = createMarkdownIt()
    .use(pluginMarkAllMarkdownContents)
  return (markdownContent: string) => {
    return md.render(markdownContent)
  }
}

export const renderMarkdown = createRenderMarkdownFunction()
export const renderMarkedMarkdown = createRenderMarkedMarkdownFunction()
