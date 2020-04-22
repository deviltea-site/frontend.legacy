import Vue from 'vue'
import VueScrollto from 'vue-scrollto'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/scss/main.scss'

Vue.use(VueScrollto, {
  container: '#app',
  duration: 500,
  easing: 'ease',
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
