import Vue from 'vue'
import Router from 'vue-router'
import homeComponent from '../pages/home'
import cartComponent from '../pages/cart'
import searchComponent from '../pages/search'
import memberComponent from '../pages/member'
import newsList from '../pages/newslist'
import newsInfo from '../pages/newsinfo'
import photoList from '../pages/photolist'
import photoInfo from '../pages/photoInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',redirect:'/home'},
    {path:'/home',component:homeComponent},
    {path:'/cart',component:cartComponent},
    {path:'/search',component:searchComponent},
    {path:'/member',component:memberComponent},
    {path:'/home/newslist',component:newsList},
    {path:'/home/newsInfo/:id',component:newsInfo},
    {path:'/home/photolist',component:photoList},
    {path:'/home/photoInfo/:id',component:photoInfo}



  ],
  linkActiveClass:'mui-active'
})
