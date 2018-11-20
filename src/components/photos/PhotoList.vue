<template>
  <div>
    <!--顶部滑动条区域-->
    <div class="mui-slider">
      <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
            {{ item.title }}
          </a>
        </div>
      </div>
    </div>

    <!--懒加载图片列表区域-->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import mui from "../../lib/mui/js/mui.min.js"
  export default {
    data() {
      return {
        cates: [//所有分类的列表数组
          {title: '醉美人', id: 1},{title: '奇想', id: 2},
          {title: '哗啦啦', id: 3},{title: '大半个', id: 4},
          {title: '睡美人', id: 5},{title: '小丑鱼', id: 6},
          {title: '大堡垒', id: 7},{title: '小秋季', id: 8}
        ],
        list: [//图片列表的数组
          {id:1, img_url:'../../images/lunbo1.jpg', title:'哗啦啦刷吧帅吧', zhaiyao:'what  is this?what  is this?what  is this?what  is this? it kki aadadada'},
          {id:2, img_url:'../../images/lunbo2.jpg', title:'哗啦啦漂亮哗啦啦', zhaiyao:'what  is this?what  is this?what  is this?what  is this?'},
          {id:3, img_url:'../../images/lunbo3.jpg', title:'哗啦啦', zhaiyao:'what  is this?'},
          {id:4, img_url:'../../images/lunbo4.jpg', title:'哗啦啦', zhaiyao:'what  is this?'},
          {id:5, img_url:'../../images/lunbo1.jpg', title:'哗啦啦', zhaiyao:'what  is this?'},
          {id:6, img_url:'../../images/lunbo2.jpg', title:'哗啦啦', zhaiyao:'what  is this?'},
          {id:7, img_url:'../../images/lunbo3.jpg', title:'哗啦啦', zhaiyao:'what  is this?'},
          {id:8, img_url:'../../images/lunbo4.jpg', title:'哗啦啦', zhaiyao:'what  is this?'}
        ]
      }
    },
    methods: {
      getAllCategory() {
        this.$http.get('api/getimgcategory').then(result => {
          if (result.body.status === 0) {
            // 手动拼接出一个最完整的分类列表
            // return {title:*, id:*}
            result.body.message.unshift({ title: '全部', id: 0 })
            this.cates = result.body.message
          }
        })
      },
      getPhotoListByCateId(cateId) {
        // 根据分类Id，获取图片列表
        this.$http.get('api/getimages/' + cateId).then(result => {
          if (result.body.status === 0) {
            // return {id:*, img_url:*, title:*, zhaiyao:*}
            this.list = result.body.message
          }
        })
      }
    },
    created() {
      // this.getAllCategory()
      // this.getPhotoListByCateId(0) // 默认进入页面，就主动请求所有图片列表的数据
    },
    mounted() {
      mui(".mui-scroll-wrapper").scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
    }
  }
</script>

<style lang="scss" scoped>
  * {
    touch-action: pan-y;
  }
  .photo-list {
    list-style: none;
    margin: 0;
    padding: 10px 10px 0 10px;
    li {
      background-color: #ccc;
      text-align: center;
      margin-bottom: 10px;
      box-shadow: 0 0 9px #999;
      position: relative;
      img {
        width: 100%;
        vertical-align: middle;
      }
      img[lazy="loading"] {
        width: 40px;
        height: 300px;
        margin: auto;
      }
      .info {
        color: white;
        text-align: left;
        position: absolute;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.4);
        max-height: 84px;
        .info-title {
          font-size: 14px;
        }
        .info-body {
          font-size: 13px;
        }
      }
    }
  }
</style>