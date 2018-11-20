<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表项区域 -->
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])">
            </mt-switch>
            <img :src="item.thumb_path" alt="">
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]"
                        :goodsid="item.id">
                </numbox>
                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                <!-- 1. 我们可以先创建一个空对象，然后循环购物车中所有商品的数据，
                把当前循环这条商品的Id，作为对象的属性名，count值作为对象的属性值，这样当把所
                有的商品循环一遍，就会得到一个对象：{ 88: 2, 89: 1, 90: 4 } -->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner jiesuan">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品
                <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span>
                件, 总价
                <span class="red">￥{{ $store.getters.getGoodsCountAndAmount.amount }}</span>
              </p>
            </div>
            <mt-button type="danger">去结算</mt-button>
          </div>
        </div>
      </div>
    </div>
    <p>{{ $store.getters.getGoodsSelected }}</p>
  </div>
</template>

<script>
  import numbox from "../subcomponents/Shopcar_numbox.vue"
  export default {
    data() {
      return {// 购物车中所有商品的数据
        goodslist: [
          {id:1, thumb_path:'../../images/menu1.png',title:'杰石丹森',sell_price:399},
          {id:2, thumb_path:'../../images/menu3.png',title:'石丹森',sell_price:979},
          {id:3, thumb_path:'../../images/menu2.png',title:'杰森雷和',sell_price:599},
          {id:4, thumb_path:'../../images/menu3.png',title:'巴尔福森',sell_price:999},
          {id:5, thumb_path:'../../images/menu4.png',title:'黎伟丹森',sell_price:555}
        ]
      }
    },
    created() {
      // this.getGoodsList()
    },
    methods: {
      getGoodsList() {
        // 获取到 store 中所有的商品的Id，然后拼接出一个用逗号分隔的字符串
        var idArr = []
        this.$store.state.car.forEach(item => idArr.push(item.id))
        // 如果购物车中没有商品则直接返回，不需要请求数据接口，否则会报错
        if (idArr.length <= 0) {
          return
        }
        // 获取购物车商品列表
        this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
          if (result.body.status === 0) {
            // return {id:*,thumb_path:*,title:*,sell_price:*}
            this.goodslist = result.body.message
          }
        })
      },
      remove(id, index) {
        // 点击删除，把商品从 store 中根据传递的 Id 删除，同时把当前组件中的 goodslist 中对应要删除的那个商品，使用 index 来删除
        this.goodslist.splice(index, 1)
        this.$store.commit("removeFormCar", id)
      },
      selectedChanged(id, val) {
        // 每当点击开关，把最新的开关状态，同步到 store 中
        // console.log(id + " --- " + val)
        this.$store.commit("updateGoodsSelected", {id: id, selected: val})
      }
    },
    components: {
      numbox
    }
  }
</script>

<style lang="scss" scoped>
  .shopcar-container {
    background-color: #eee;
    overflow: hidden;
    .goods-list {
      .mui-card-content-inner {
        display: flex;
        align-items: center;
      }
      img {
        width: 60px;
      }
      h1 {
        font-size: 13px;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
    .jiesuan {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .red {
        color: red;
        font-weight: bold;
        font-size: 16px;
      }
    }
  }
</style>