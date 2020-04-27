import MarkdownIt, { RuleBlock, Rule } from 'markdown-it'
import State from 'markdown-it/lib/rules_core/state_core'
import StateBlock from 'markdown-it/lib/rules_block/state_block'
import ParserBlock from 'markdown-it/lib/parser_block'
import Token from 'markdown-it/lib/token'
import ParserInline from 'markdown-it/lib/parser_inline'

// interface RuleJsonMeta extends RuleBlock {
//   (state: StateJsonMeta, startLine: number, endLine: number, silent?: boolean): boolean | void;
// }

// declare class StateJsonMeta extends State {
//   /** Used in lists to determine if they interrupt a paragraph */
//   parentType: 'json_meta';

//   eMarks: number[];
//   bMarks: number[];
//   bsCount: number[];
//   sCount: number[];
//   tShift: number[];

//   blkIndent: number;
//   ddIndent: number;

//   line: number;
//   lineMax: number;
//   tight: boolean;
// }

// declare class ParserJsonMeta extends ParserInline {
//   tokenize: (state, startLine, nextLine) => Token;
// }

// function plugin (md: MarkdownIt) {
//   function render (tokens, idx, _options, env, slf) {
//     if (tokens[idx].nesting === 1) {
//       tokens[idx].attrSet('type', 'application/json')
//     }
//     return slf.renderToken(tokens, idx, _options, env, slf)
//   }

//   const minMarkers = 3
//   const markerStr = '$'
//   const markerChar = markerStr.charCodeAt(0)
//   const markerLen = markerStr.length

//   function meta (state: StateJsonMeta, startLine: number, endLine: number, silent?: boolean) {
//     let pos
//     let token
//     let autoClosed = false
//     let start = state.bMarks[startLine] + state.tShift[startLine]
//     let max = state.eMarks[startLine]

//     if (markerChar !== state.src.charCodeAt(start)) { return false }
//     for (pos = start + 1; pos <= max; pos++) {
//       if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
//         break
//       }
//     }
//     const markerCount = Math.floor((pos - start) / markerLen)
//     if (markerCount < minMarkers) { return false }
//     const markup = state.src.slice(start, pos)
//     const params = state.src.slice(pos, max)
//     if (silent) { return true }
//     let nextLine = startLine
//     for (;;) {
//       nextLine++
//       if (nextLine >= endLine) {
//         // unclosed block should be autoclosed by end of document.
//         // also block seems to be autoclosed by end of parent
//         break
//       }

//       start = state.bMarks[nextLine] + state.tShift[nextLine]
//       max = state.eMarks[nextLine]

//       if (start < max && state.sCount[nextLine] < state.blkIndent) {
//         // non-empty line with negative indent should stop the list:
//         // - ```
//         //  test
//         break
//       }

//       if (markerChar !== state.src.charCodeAt(start)) { continue }

//       if (state.sCount[nextLine] - state.blkIndent >= 4) {
//         continue
//       }

//       for (pos = start + 1; pos <= max; pos++) {
//         if (markerStr[(pos - start) % markerLen] !== state.src[pos]) {
//           break
//         }
//       }

//       // closing code fence must be at least as long as the opening one
//       if (Math.floor((pos - start) / markerLen) < markerCount) { continue }

//       // make sure tail has spaces only
//       pos -= (pos - start) % markerLen
//       pos = state.skipSpaces(pos)

//       if (pos < max) { continue }

//       // found!
//       autoClosed = true
//       break
//     }
//     const oldParent = state.parentType
//     const oldLineMax = state.lineMax
//     state.parentType = 'json_meta'
//     state.lineMax = nextLine

//     token = state.push('json_meta_open', 'script', 1)
//     token.markup = markup
//     token.block = true
//     token.info = params
//     token.map = [startLine, nextLine]
//     console.log(JSON.parse(JSON.stringify(token)))

//     const _parser: ParserJsonMeta = state.md.inline
//     state.md.inline.tokenize(state, startLine + 1, nextLine)

//     console.log(state.tokens[state.tokens.length - 2])

//     token = state.push('json_meta_close', 'script', -1)
//     token.markup = state.src.slice(start, pos)
//     token.block = true

//     state.parentType = oldParent
//     state.lineMax = oldLineMax
//     state.line = nextLine + (autoClosed ? 1 : 0)

//     return true
//   }

//   md.block.ruler.before('fence', 'json_meta', meta as RuleJsonMeta, {
//     alt: ['paragraph', 'reference', 'blockquote', 'list']
//   })
//   md.renderer.rules['json_meta_' + 'open'] = render
//   md.renderer.rules['json_meta_' + 'close'] = render
// }

function plugin (md: MarkdownIt) {
  md.block.ruler.after('code', 'json_meta', function (state) {
    state.tokens.map((token) => {
      if (token.type === 'fence' && token.info === 'json-meta') {
        token.type = 'json_meta'
      }
    })
  })
  md.renderer.rules['' + 'json_meta'] = function (tokens, idx, options, env, slf) {
    const token = tokens[idx]
    return `<script id="json-meta" type="application/json"${slf.renderAttrs(token)}>${tokens[idx].content}</script>`
  }
}

export default plugin
