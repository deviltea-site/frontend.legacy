import MarkdownIt from 'markdown-it'

function plugin (md: MarkdownIt) {
  md.core.ruler.push('mark_md', function (state) {
    const lines = state.src.split('\n')
    state.tokens.forEach((token) => {
      if (token.level === 0 && token.map && token.map.length > 0) {
        const [start, end] = token.map
        const content = lines.slice(start, end).join('\n').replace(/"/g, '&quot')
        token.attrSet('data-md-content', content)
      }
    })
  })

  const oldTocOpen = md.renderer.rules.tocOpen
  md.renderer.rules.tocOpen = function (tokens, idx, options, env, slf) {
    const tempResult = oldTocOpen(tokens, idx, options, env, slf)
    return `${tempResult.substr(0, tempResult.length - 1)}${slf.renderAttrs(tokens[idx])}>`
  }
}

export default plugin
