// 项目入口文件
import Vue from 'vue'
import VueRouter from 'vue-router'
//导入自己的路由模块
import router from './router.js'

//导入 MUI 样式
import './lib/mui/css/mui.min.css'
//导入扩展图标样式
import './lib/mui/css/icons-extra.css'
import 'mint-ui/lib/style.css'
//导入 mint-ui 的 Swipe 组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
//安装图片预览插件
import VuePreview from 'vue-preview'
//导入能够使 *.vue 组件文件和后台数据交互的库
import VueResource from 'vue-resource'
//导入 App 根组件
import app from './App.vue'
//导入格式化时间的插件
import moment from 'moment'

//创建一个全局过滤函数
Vue.filter('dateFormat', function(dataStr, pattern='YYYY-MM-DD HH:mm:ss'){
  return moment(dataStr).format(pattern)
})

//安装路由
Vue.use(VueRouter)
Vue.use(VuePreview)
//安装库
Vue.use(VueResource)
//设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io'
// 全局设置 post 表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.emulateJSON = true
//配置组件
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router
})
