<template>
  <div class="newsinfo-container">
    <!--大标题-->
    <h3 class="title">{{ newsinfolist.title }}</h3>
    <!--子标题-->
    <p class="subtitle">
      <span>发表时间：{{ newsinfolist.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfolist.click }} 次</span>
    </p>
    <hr>
    <!--内容区域-->
    <div class="content" v-html="newsinfolist.content"></div>
    <!--评论子组件区域-->
    <!--这里需要给子组件传参，子组件才能获取父亲给的数据(为什么要this?) -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
  import { Toast } from "mint-ui"
  // 导入自定义的评论子组件
  import Comment from "../subcomponents/Comment.vue"
  export default {
    data() {
      return {
        id: this.$route.params.id,
        //手动增加的数据
        newsinfolist: {
          title:'我的天', content:'好漂亮一只小宠物,我也想养一只呀', add_time:'2017-9-10', click:20
        }
      }
    },
    created() {
      // this.getnewsinfoList();
    },
    methods: {
      getnewsinfoList() {
        this.$http.get('api/getnew/' + this.id).then(result => {
          if (result.body.status === 0) {
            // ajax请求应返回{title:*, content:*, add_time:*, click:*}
            this.newsinfolist = result.body.message[0]
          } else {
            Toast('数据请求失败')
          }
        })
      }
    },
    components: {
      "comment-box": Comment
    }
  }
</script>

<style lang="scss" scoped>
  .newsinfo-container {
    padding: 0 4px;
    .title {
      font-size: 16px;
      text-align: center;
      margin: 15px 0;
      color: red;
    }
    .subtitle {
      font-size: 13px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
    .content {
      padding-bottom: 5px;
      img {
        width: 100%;
      }
    }
  }
</style>