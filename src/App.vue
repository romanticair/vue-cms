<template>
  <div class="app-container">
    <!-- 顶部 Header 通栏 -->
    <!--
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">我的 Vue 项目</h1>
      <a class="mui-icon-forward mui-icon mui-icon-right-nav mui-pull-right"></a>
    </header>
    -->
    <!-- mint 提供的组件更方便 -->
    <mt-header fixed title="我的 Vue 项目">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>

    <!-- 中间 Content 区域 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-redefine" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>
      <router-link class="mui-tab-item-redefine" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>
      <router-link class="mui-tab-item-redefine" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span id="badge" class="mui-badge">{{ $store.getters.getAllCount }}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>
      <router-link class="mui-tab-item-redefine" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        flag: false
      }
    },
    created() {
      this.flag = this.$route.path === '/home' ? false : true
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      }
    },
    watch: {
      '$route.path': function (newVal) {
        if (newVal === '/home') {
          this.flag = false
        } else {
          this.flag = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mint-header {
    z-index: 100;
  }
  .app-container {
    padding: 40px 0 50px 0;
    overflow-x: hidden;
  }

  .v-enter {
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  // 该类名，解决 tabbar 点击无法切换的问题
  .mui-bar-tab .mui-tab-item-redefine.mui-active {
    color: #007aff;
  }
  .mui-bar-tab .mui-tab-item-redefine {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
  }
  .mui-bar-tab .mui-tab-item-redefine .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .mui-bar-tab .mui-tab-item-redefine .mui-icon ~ .mui-tab-label {
    font-size: 11px;
  }
</style>