module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/about',
        '/about/'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      postProcess: route => {
        return route
      }
    }
  }
}
