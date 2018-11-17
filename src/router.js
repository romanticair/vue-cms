import VueRouter from 'vue-router'

//导入 TabBar 组件
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
import Shopcar from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

//创建路由对象
var router = new VueRouter({
	routes: [
    {path: '/', redirect: '/home'},
		{path: '/home', component: Home},
		{path: '/member', component: Member},
		{path: '/search', component: Search},
		{path: '/shopcar', component: Shopcar},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo}
	],
  linkActiveClass: 'mui-active'
})

//把路由对象暴露出去
export default router