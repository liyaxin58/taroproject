<template>
  <view class="shoppingCar">
    <PageTitle pageTitle="购物车" />

    <view class="pro-items">
      <block v-if="goodsList">
        <view class="item" v-for="(row, index) in goodsList" :key="index">
          <view class="item-header item_header">
            <van-checkbox
              :value="selectedGoods.includes(row.id)"
              @change="onSelectChange(row.id)"
            />
            <view class="item-seller">
              <image class="store-logo" src="~@/assets/index/content1.png" />
              <van-icon name="shop-o" color="#B1B1B1" size="20px" />
              <view class="store-name">{{ row.commodity.brand }}</view>
              <van-icon name="arrow" color="#C2C2C2" size="18px" />
            </view>
            <view class="item_wztext">{{ row.createTime }}</view>
          </view>
          <!-- <view
            class="touch-item {{row.isTouchMove ? 'touch-move-active' : ''}}"
            data-index="{{index}}"
            bindtouchstart="touchstart"
            bindtouchmove="touchmove"
          > -->
            <view class="item-body">
              <van-checkbox
                :value="selectedGoods.includes(row.id)"
                @change="onSelectChange(row.id)"
              />
              <view class="pro-content">
                <view class="pro-left">
                  <image mode="aspectFill" :src="row.commodity.imgurl" />
                </view>
                <view class="pro-right">
                  <view class="pro-title">{{ row.commodity.title }}</view>
                  <view class="pro-specifications">净含量</view>
                  <view class="pro-price">
                    <view>
                      <text class="pro_fuhao">¥</text
                      ><text class="pro_money">{{ row.money }}</text>
                    </view>
                    <view>
                      <view class="pri_shuliang">x{{ row.num }}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
            <!-- <view class="content">{{item.content}}</view> -->
            <!-- <view class="del" catchtap="del" data-index="{{index}}">删除</view>
          </view> -->
        </view>
      </block>
      <block v-else>
        <NullState text="快去添加商品吧~" />
      </block>
    </view>

    <view class="settle-box">
      <van-submit-bar
        :price="total"
        button-text="提交订单"
        @submit="submitOrder"
      >
        <van-checkbox :value="isAllGoodsSelected" @change="checkAll">
          全选
        </van-checkbox>
      </van-submit-bar>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'
import { ShopService } from '@/service'
import NullState from '@/components/NullState'

export default {
  components: { NullState, PageTitle },

  data() {
    return {
      startX: 0, //开始坐标
      startY: 0
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      goodsList: state => state.shoppingCart.goodsList,
      selectedGoods: state => state.shoppingCart.selectedGoods
    }),

    isAllGoodsSelected() {
      return (
        this.goodsList.length === this.selectedGoods.length &&
        this.goodsList.length > 0
      )
    },

    total() {
      const total = this.goodsList
        .filter(row => this.selectedGoods.includes(row.id))
        .reduce((sum, next) => sum + next.num * next.money, 0)

      return Math.ceil(total * 100)
    }
  },

  onShow() {
    this.getShoppingCarList()
    let that = this;
    setTimeout(() => {
      let goodsList = that.goodsList
      // isTouchMove = false;
      goodsList.forEach((item,index)=>{
        item.isTouchMove = false;
      });
      console.log(goodsList);
      that.goodsList = goodsList;
      // that.setData({
      //   goodsList:goodsList
      // })
    },2000)
  },

  methods: {
    async getShoppingCarList() {
      Taro.showLoading({
        title: '加载中'
      })

      try {
        await this.$store.dispatch('getShoppingCart', this.userInfo.id)
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    submitOrder() {
      Taro.navigateTo({
        url: '/pages/pageB/checkOrders/index'
      })
    },

    // 商品被选中或者取消
    onSelectChange(id) {
      if (this.selectedGoods.includes(id)) {
        this.$store.dispatch('unselectGoods', [id])
      } else {
        this.$store.dispatch('selectGoods', [id])
      }
    },

    // 全选
    checkAll() {
      const allGoodsIds = this.goodsList.map(row => row.id)

      if (this.isAllGoodsSelected) {
        this.$store.dispatch('unselectGoods', allGoodsIds)
      } else {
        this.$store.dispatch('selectGoods', allGoodsIds)
      }
    },

    //手指触摸动作开始 记录起点X坐标
    touchstart: function (e) {
      //开始触摸时 重置所有删除
      this.data.goodsList.forEach(function (v, i) {
        if (v.isTouchMove)
          //只操作为true的
          v.isTouchMove = false
      })
      this.startX = e.changedTouches[0].clientX
      this.startY = e.changedTouches[0].clientY
      this.goodsList = this.goodsList
      // this.setData({
      //   startX: e.changedTouches[0].clientX,
      //   startY: e.changedTouches[0].clientY,
      //   items: this.data.items
      // })
    },

    //滑动事件处理
    touchmove: function (e) {
      var that = this
      ;(index = e.currentTarget.dataset.index), //当前索引
        (startX = that.data.startX), //开始X坐
        (startY = that.data.startY), //开始Y坐标
        (touchMoveX = e.changedTouches[0].clientX), //滑动变化坐标
        (touchMoveY = e.changedTouches[0].clientY), //滑动变化坐标
        //获取滑动角度
        (angle = that.angle(
          { X: startX, Y: startY },
          { X: touchMoveX, Y: touchMoveY }
        ))
      that.data.goodsList.forEach(function (v, i) {
        v.isTouchMove = false
        //滑动超过30度角 return
        if (Math.abs(angle) > 30) return
        if (i == index) {
          if (touchMoveX > startX)
            //右滑
            v.isTouchMove = false
          //左滑
          else v.isTouchMove = true
        }
      })

      //更新数据
      this.goodsList = this.goodsList
    },

    /**
     * 计算滑动角度
     * @param {Object} start 起点坐标
     * @param {Object} end 终点坐标
     */

    angle: function (start, end) {
      var _X = end.X - start.X,
        _Y = end.Y - start.Y

      //返回角度 /Math.atan()返回数字的反正切值
      return (360 * Math.atan(_Y / _X)) / (2 * Math.PI)
    },

    //删除事件
    del: function (e) {
      this.data.items.splice(e.currentTarget.dataset.index, 1)

      this.items = this.data.items
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.shoppingCar {
  .pro-items {
    padding: 15px 15px 100px 15px;

    .item {
      //width: 100%;
      height: auto;
      position: relative;
      background: #fff;
      border-radius: 14px;
      padding: 15px 10px;
      margin-bottom: 15px;

      .item-header {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 15px;

        .item-seller {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          margin-left: 10px;

          .store-logo {
            width: 24px;
            height: 24px;
            box-shadow: 0px 2px 4px 0px rgba(206, 206, 206, 0.5);
            border-radius: 50%;
            margin-right: 5px;
          }

          .store-name {
            font-size: 15px;
            padding: 0 3px;
          }
        }
      }
      .item_header {
      }
      .item_wztext {
        margin-left: 70px;
        font-size: 10px;
        color: #999999;
      }
      .item-body {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .pro-content {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          padding-left: 10px;
          flex: 1;
          .pro-left {
            width: 90px;
            height: 90px;
            padding-right: 10px;

            image {
              width: 100%;
              height: 100%;
              border-radius: 5px;
              background-color: #fff;
            }
          }

          .pro-right {
            flex: 1;
            .pro-title {
              font-weight: 400;
              font-size: 16px;
            }

            .pro-specifications {
              color: #bdbdbd;
              width: 67px;
              height: 24px;
              background: #f2f2f2;
              border-radius: 4px;
              text-align: center;
              line-height: 24px;
              font-size: 12px;
              margin-top: 10px;
              margin-bottom: 15px;
            }

            .pro-price {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .pro_fuhao {
                font-size: 12px;
                color: #0a6ffb;
              }
              .pro_money {
                color: #0a6ffb;
                font-weight: 400;
                font-size: 18px;
              }
              .pri_shuliang {
                width: 27px;
                height: 22px;
                line-height: 22px;
                text-align: center;
                border-radius: 6px;
                border: 1px solid #979797;
                font-weight: 400;
                color: #000000;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }

  .van-submit-bar__price,
  .van-submit-bar__currency {
    color: #0a6ffb;
  }
}

.touch-item {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
}

.content {
  width: 100%;
  padding: 10px;
  line-height: 22px;
  margin-right: 0;
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  margin-left: -90px;
}

.del {
  background-color: orangered;
  width: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  -webkit-transform: translateX(90px);
  transform: translateX(90px);
  -webkit-transition: all 0.4s;
  transition: all 0.4s;
}

.touch-move-active .content,
.touch-move-active .del {
  -webkit-transform: translateX(0);
  transform: translateX(0);
}
</style>
