import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../pages/home'
import cartComponent from '../pages/cart'
import searchComponent from '../pages/search'
import memberComponent from '../pages/member'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeComponent},
    {path:'/cart',component:cartComponent},
    {path:'/search',component:searchComponent},
    {path:'/member',component:memberComponent}
  ],
  linkActiveClass:'mui-active'
})
