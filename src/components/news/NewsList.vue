<template>
  <div>
    <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat}}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
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
        //新闻列表 -- 手动伪造吧
        newslist: [
          {id:1, img_url:'../../images/menu1.png', title:"高兴", add_time:"2018-1-7", click:7},
          {id:2, img_url:'../../images/menu2.png', title:"幸福", add_time:"2018-7-7", click:47},
          {id:3, img_url:'../../images/menu3.png', title:"兴奋", add_time:"2018-8-7", click:37},
          {id:4, img_url:'../../images/menu4.png', title:"刺激", add_time:"2017-1-7", click:27},
          {id:5, img_url:'../../images/menu2.png', title:"愉悦", add_time:"2018-7-7", click:107},
          {id:6, img_url:'../../images/menu3.png', title:"受不了", add_time:"2015-8-7", click:227},
          {id:7, img_url:'../../images/menu4.png', title:"瘦不了", add_time:"2016-7-7", click:17},
          {id:8, img_url:'../../images/menu1.png', title:"胖不了", add_time:"2015-8-7", click:3}
        ]
      }
    },
    methods: {
      getNewsList() {
        this.$http.get('api/getnewslist').then(result => {
          if (result.body.status === 0) {
            // ajax请求应返回{id:*, img_url:*, title:*, add_time:*, click:*}
            this.newslist = result.body.message
          } else {
            Toast('数据请求失败')
          }
        })
      }
    },
    created() {
      // this.getNewsList()
    }
  }
</script>

<style lang="scss" scoped>
  .mui-table-view {
    li {
      h1 {
        font-size: 14px;
      }
      .mui-ellipsis {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
      }
    }
  }
</style>