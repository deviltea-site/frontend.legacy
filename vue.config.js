/* eslint-disable @typescript-eslint/no-var-requires */
const isProduction = process.env.NODE_ENV === 'production'
const isAnalyze = process.argv.includes('--analyze')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { articles: articlesId } = require('./public/api/articles.json')

const routes = [
  '',
  '/about',
  '/articles',
  ...articlesId.map((id) => `/articles/${id}`),
  '/404'
]

module.exports = {
  publicPath: isProduction ? '/' : '/',
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        ...routes,
        ...routes.map((route) => `${route}/`)
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        return route
      }
    }
  },
  chainWebpack: config => {
    if (isProduction && isAnalyze) {
      config.plugin('analyzer').use(new BundleAnalyzerPlugin())
    }
  }
}
