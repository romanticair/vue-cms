<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <textarea placeholder="请输入要BB的内容（最多吐槽120字）" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in commentlist" :key="i">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户贼懒': item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
  import { Toast } from "mint-ui"
  export default {
    data() {
      return {
        pageIndex: 1,  //默认展示第一页数据
        commentlist: [ //所有的评论数据 --手动增加的数据
          {content:'说啥好呢，今天天气不错？停水听了7个小时耶', add_time:'2018-11-16', user_name:'a man'},
          {content:'说啥好呢，今天天气不错？停水听了6个小时耶', add_time:'2018-11-16', user_name:'a man'},
          {content:'说啥好呢，今天天气不错？停水听了5个小时耶', add_time:'2018-11-16', user_name:'a man'},
          {content:'说啥好呢，今天天气不错？停水听了4个小时耶', add_time:'2018-11-16', user_name:'a man'},
          {content:'说啥好呢，今天天气不错？停水听了3个小时耶', add_time:'2018-11-16', user_name:'a man'},
          {content:'说啥好呢，今天天气不错？停水听了2个小时耶', add_time:'2018-11-16', user_name:'a man'}
        ],
        msg: '' //评论内容
      }
    },
    methods: {
      getCommentList() {
        this.$http.get('api/getcomments/' + this.id + '?pageindex=' + this.pageIndex).then(result => {
          if (result.body.status === 0) {
            // ajax请求应返回{content:*, add_time:*, user_name:*}
            this.commentlist = this.commentlist.concat(result.body.message)
          } else {
            Toast('获取评论失败')
          }
        })
      },
      getMore() {
        this.pageIndex++
        this.getCommentList()
      },
      postComment() {
        if (this.msg.trim().length === 0) {
          return Toast("评论内容不能为空！");
        }
        // 发表评论
        // 参数1：请求的URL地址
        // 参数2：提交给服务器的数据对象 { content: this.msg }
        // 参数3：定义提交时候，表单中数据的格式  { emulateJSON:true }
        this.$http.post('api/postcomment/' + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then(function (result) {
          if (result.body.status === 0) {
            // 拼接评论内容
            let comment = {
              user_name: '匿名用户',
              add_time: Date.now(),
              content: this.msg.trim()
            }
            this.commentlist.unshift(comment)
            this.msg = ''
          }
        })
      }
    },
    create() {
      // this.getCommentList()
    },
    props: ['id']
  }
</script>

<style lang="scss" scoped>
  .cmt-container {
    h3 {
      font-size: 18px;
    }
    textarea {
      font-size: 14px;
      height: 85px;
      margin: 0;
    }
    .cmt-list {
      margin: 5px 0;
      .cmt-item {
        font-size: 13px;
        .cmt-title {
          line-height: 30px;
          background-color: #ccc;
        }
        .cmt-body {
          line-height: 35px;
          text-indent: 2em;
        }
      }
    }
  }
</style>