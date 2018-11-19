import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//按需引入mint-ui
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)
//引入mui
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'
//引入reset文件
import './css/common.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
