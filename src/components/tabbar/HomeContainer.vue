<template>
  <div>
    <!-- 轮播图 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(url, i) in lunbotuList" :key="i">
        <img :src="url" alt="">
      </mt-swipe-item>
      <div class="mint-swipe-indicators">
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator"></div>
        <div class="mint-swipe-indicator"></div>
      </div>
    </mt-swipe>

    <!-- 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import { Toast } from "mint-ui"
  export default {
    data() {
      return {
        lunbotuList: [] // 保存轮播图的数组
      }
    },
    methods: {
      getLunBoTu(){
        // 获取轮播图数据的方法
        /* 已跨域且不可访问
        this.$http.get("api/getlunbo").then(result => {
          if (result.body.status === 0) {
            this.lunbotuList = result.body.message
          } else {
            Toast("加载轮播图失败,使用手动增加的 o(╥﹏╥)o")
          }
         }) */
        let path = '../../images/lunbo'
        this.lunbotuList = [path + '1.jpg',path + '2.jpg',path + '3.jpg',path + '4.jpg']
      }
    },
    created() {
      this.getLunBoTu()
    }
  }
</script>

<style lang="scss" scoped>
  .mint-swipe {
    height: 200px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }

    .mui-table-view-cell {
      border: 0;
    }
  }
</style>