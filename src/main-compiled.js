// 项目入口文件
import Vue from 'vue';
import VueRouter from 'vue-router';
//导入自己的路由模块
import router from './router.js';

//导入 MUI 样式
import './lib/mui/css/mui.min.css';
//导入扩展图标样式
import './lib/mui/css/icons-extra.css';
import 'mint-ui/lib/style.css';
//导入 mint-ui 的 Swipe 组件
import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
//安装图片预览插件
import VuePreview from 'vue-preview';
//导入能够使 *.vue 组件文件和后台数据交互的库
import VueResource from 'vue-resource';
//导入 App 根组件
import app from './App.vue';
//导入格式化时间的插件
import moment from 'moment';
// 导入全局 vuex
import Vuex from 'vuex';

//创建一个全局过滤函数
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern);
});

// 每次刚进入网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中，把购物车的数据读出来，放到 store 中
let car = JSON.parse(localStorage.getItem('car') || '[]');
// 要在创建 Vuex.Sotre 对象之前
Vue.use(Vuex);
var store = new Vuex.Store({
  state: { // this.$store.state.*
    car: car // 将购物车中商品的数据，用一数组存储,在 car 数组中存储一些商品的对象，可暂时将这个商品对象设计成这个样子
    // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
  },
  mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车把商品信息保存到 store 中的 car 上
      // 1. 如果购物车中，之前就已经有这个对应的商品了，那么只需要更新数量
      // 2. 如果没有，则直接把商品数据，push 到 car 中即可
      // 假设在购物车中，没有找到对应的商品
      var flag = false;
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });
      // 如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
      if (!flag) {
        state.car.push(goodsinfo);
      }
      // 当更新 car 之后，把 car 数组，存储到本地的 localStorage 中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id == goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      });
      // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFormCar(state, id) {
      // 根据Id，从 store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id == id) {
          state.car.slice(i, 1);
          return true;
        }
      });
      // 将删除完毕后的，最新的购物车数据，同步到本地存储中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id == info.id) {
          item.selected = info.selected;
        }
      });
      // 把最新的所有购物车商品的状态保存到 store 中去
      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: { // this.$store.getters.*
    // 相当于计算属性，也相当于 filters
    getAllCount(state) {
      var c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state) {
      var o = {};
      state.car.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state) {
      var o = {
        count: 0, // 勾选的数量
        amount: 0 // 勾选的总价
      };
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      });
      return o;
    }
  }
});

//安装路由
Vue.use(VueRouter);
Vue.use(VuePreview);
//安装库
Vue.use(VueResource);
//设置请求的根路径
Vue.http.options.root = 'http://vue.studyit.io';
// 全局设置 post 表单数据格式组织形式 application/x-www-form-urlencoded
Vue.http.emulateJSON = true;
//配置组件
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);

let vm = new Vue({
  el: '#app',
  render: c => c(app),
  router,
  store // 挂载 store 状态管理对象
});

//# sourceMappingURL=main-compiled.js.map