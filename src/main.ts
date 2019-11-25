import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios.tool' // 导入封装好的axios
import adapt from './assets/adapt'
// import './plugins/element.js'

Vue.config.productionTip = false // 设置为 false 以阻止 vue 在启动时生成生产提示

Vue.use(adapt)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
