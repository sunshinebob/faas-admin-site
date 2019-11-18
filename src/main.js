import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/style/index.scss' // 全局scss
import './plugins/element.js'
import animated from 'animate.css'
import '@/assets/iconfont/iconfont.css'
// 引入行政区划选择器
import 'vue-area-linkage/dist/index.css'
import VueAreaLinkage from 'vue-area-linkage'

Vue.use(animated)
Vue.use(VueAreaLinkage)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
