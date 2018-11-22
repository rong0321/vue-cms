import Vue from 'vue'
import App from './App'
import router from './router'
//引入vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)
//配置请求根路径
Vue.http.options.root = 'http://www.lovegf.cn:8899/'
//配置post请求头
Vue.http.options.emulateJSON = true

//定义全局时间过滤器 
import moment from 'moment'
Vue.filter('dateFormat',function(dateStr,pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dateStr).format(pattern)
})


Vue.config.productionTip = false

//按需引入mint-ui
import { Header , Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
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
