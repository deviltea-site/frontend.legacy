import MarkdownIt from 'markdown-it'

function plugin (md: MarkdownIt) {
  md.core.ruler.push('mark_md', function (state) {
    const lines = state.src.split('\n')
    state.tokens.map((token) => {
      if (token.level === 0 && token.map && token.map.length > 0) {
        const [start, end] = token.map
        const content = lines.filter((line, index) => index >= start && index < end).join('\n')
        token.attrSet('data-md-content', content)
      }
    })
  })
}

export default plugin
