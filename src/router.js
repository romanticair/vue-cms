import VueRouter from 'vue-router'

//导入 TabBar 组件
import Home from './components/tabbar/HomeContainer.vue'
import Member from './components/tabbar/MemberContainer.vue'
import Search from './components/tabbar/SearchContainer.vue'
import Shopcar from './components/tabbar/ShopcarContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'

//创建路由对象
var router = new VueRouter({
	routes: [
    {path: '/', redirect: '/home'},
		{path: '/home', component: Home},
		{path: '/member', component: Member},
		{path: '/search', component: Search},
		{path: '/shopcar', component: Shopcar},
    {path: '/home/newslist', component: NewsList},
    {path: '/home/newsinfo/:id', component: NewsInfo},
    {path: '/home/photolist', component: PhotoList},
    {path: '/home/photoinfo/:id', component: PhotoInfo},
    {path: '/home/goodslist', component: GoodsList}
	],
  linkActiveClass: 'mui-active'
})

//把路由对象暴露出去
export default router