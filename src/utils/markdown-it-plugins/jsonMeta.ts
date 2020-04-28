import MarkdownIt from 'markdown-it'
import { ArticleMeta } from '@/interfaces/Article'

function plugin (md: MarkdownIt) {
  md.core.ruler.push('json_meta', function (state) {
    state.tokens.map((token) => {
      if (token.type === 'fence' && token.info.trim() === 'json-meta') {
        token.type = 'json_meta'
      }
    })
  })
  md.renderer.rules['' + 'json_meta'] = function (tokens, idx, options, env, slf) {
    const meta: ArticleMeta = JSON.parse(tokens[idx].content)
    const token = tokens[idx]
    return `<script id="json-meta" type="application/json"${slf.renderAttrs(token)}>${JSON.stringify(meta)}</script>`
  }
}

export default plugin
