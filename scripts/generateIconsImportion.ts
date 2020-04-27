import { icons } from '../config.json'
import fs from 'fs'
import path from 'path'
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
// console.log(icons)
