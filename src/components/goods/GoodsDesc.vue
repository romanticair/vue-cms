<template>
  <div class="goodsdesc-container">
    <h3>{{ info.title }}</h3>
    <hr>
    <div class="content" v-html="info.content"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return { // 图文数据
        info: {title: '猜猜我想告诉你什么?', content:'这个信息很重要，以致于我不能告诉你.'}
      }
    },
    created() {
      // this.getGoodsDesc()
    },
    methods: {
      getGoodsDesc() {
        this.$http.get("api/goods/getdesc/" + this.$route.params.id).then(result => {
          if (result.body.status === 0) {
            // return {title:*,content:*}
            this.info = result.body.message[0]
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .goodsdesc-container {
    padding: 4px;
    h3 {
      font-size: 16px;
      color: #226aff;
      text-align: center;
      margin: 15px 0;
    }
    .content{
      img{
        width: 100%;
      }
    }
  }
</style>