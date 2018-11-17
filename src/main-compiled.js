// 项目入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';

//导入自己的路由模块
import router from './router.js';

//导入 MUI 样式
import './lib/mui/css/mui.min.css';
// 导入扩展图标样式
import './lib/mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';

//导入 mint-ui 的 Swipe 组件
import { Header, Swipe, SwipeItem } from 'mint-ui';

//导入能够使 *.vue 组件文件和后台数据交互的库
import VueResource from 'vue-resource';

// 导入 App 根组件
import app from './App.vue';

//安装库
Vue.use(VueResource);

//配置组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 安装路由
Vue.use(VueRouter);

var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router
});

//# sourceMappingURL=main-compiled.js.map