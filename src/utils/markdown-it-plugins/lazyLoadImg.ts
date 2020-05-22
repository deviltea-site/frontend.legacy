import MarkdownIt from 'markdown-it'
import Token from 'markdown-it/lib/token'

function plugin (md: MarkdownIt) {
  function applyRecursive (tokens: Token[]) {
    if (!tokens) return
    tokens.forEach((token) => {
      if (token.type === 'image') {
        const src = token.attrGet('src') || ''
        token.attrSet('src', '/images/loading.gif')
        token.attrSet('data-src', src)
        token.attrJoin('class', 'loading')
      }
      applyRecursive(token.children)
    })
  }
  md.inline.ruler.before('emphasis', 'lazy_load_image', function (state) {
    applyRecursive(state.tokens)
  })
}

export default plugin
