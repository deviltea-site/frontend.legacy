/* eslint-disable @typescript-eslint/no-var-requires */
const { icons } = require('../config.json')
const fs = require('fs')
const path = require('path')
const iconImportionPath = path.join(__dirname, '..', 'src', 'utils', 'icon.ts')
const iconsString = icons.join(',\n  ')
const importion =
`
import {
  ${iconsString}
} from '@mdi/js'

export default {
  ${iconsString}
}
`

fs.promises.writeFile(iconImportionPath, importion)
  .then(() => console.log('Icons importion generated!'))
