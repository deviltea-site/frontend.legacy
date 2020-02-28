const isProduction = process.env.NODE_ENV === 'production'
const isAnalyze = process.argv.includes('--analyze')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  publicPath: isProduction ? '/' : '/',
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/about',
        '/about/',
        '/404',
        '/404/'
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
