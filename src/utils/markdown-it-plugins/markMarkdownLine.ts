import MarkdownIt from 'markdown-it'

function plugin (md: MarkdownIt) {
  md.core.ruler.push('mark_md_line', function (state) {
    state.tokens.forEach((token) => {
      if (token.level === 0 && token.map && token.map.length > 0) {
        const [start, end] = token.map
        token.attrSet('data-md-line-start', start.toString())
        token.attrSet('data-md-line-end', end.toString())
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
