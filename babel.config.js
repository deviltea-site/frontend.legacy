/* eslint-disable @typescript-eslint/no-var-requires */
const { highlightLanguages: languages } = require('./config.json')

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['prismjs', {
      languages: languages.map((lang) => lang.name),
      theme: 'tomorrow',
      css: true
    }]
  ]
}
