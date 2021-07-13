<template>
  <view class="IntegrationProductDetail">
    <PageTitle pageTitle="商品详情" />

    <Swiper />

    <view class="pro-trait-items">
      <view class="pro-trait-item">
        <view class="price">
          <text>¥</text>
          <view>{{ proInfo.price }}</view>
        </view>
        <view class="share">
          <van-icon name="share-o" size="18px" />
          <view>分享</view>
        </view>
      </view>

      <view class="pro-trait-item">
        <view class="coupon">优惠券可抵8.6元</view>
        <view class="coupon-button">查看 ></view>
      </view>

      <view class="pro-trait-item title"> {{ proInfo.title }} </view>

      <view class="pro-trait-item pro-trait-message">
        爆款好物，买到既赚到
      </view>
    </view>

    <view class="pro-items">
      <view class="item">
        <view class="item-left">
          <view class="left">选择</view>
          <view class="right">
            <view class="norms">净含量</view>
            <view class="norms-list">十二种净含量可选择</view>
          </view>
        </view>

        <view class="item-right">
          <van-icon name="arrow" />
        </view>
      </view>

      <view class="item">
        <view class="item-left">
          <view class="left">发货</view>
          <view class="right">
            <view>
              {{ proInfo.address }} | 快递:
              <text>¥ {{ proInfo.freight }}</text>
            </view>
          </view>
        </view>

        <view class="item-right">
          <van-icon name="arrow" />
        </view>
      </view>

      <view class="item">
        <view class="item-left">
          <view class="left">参数</view>
          <view class="right">品牌 型号...</view>
        </view>

        <view class="item-right">
          <van-icon name="arrow" />
        </view>
      </view>
    </view>

    <view class="pro-cover-lists">
      <view class="list">
        <image mode="widthFix" :src="proInfo.description" />
      </view>
    </view>

    <view class="shopping-button">
      <view class="shop-now" @tap="addCar">
        <image mode="widthFix" src="~@/assets/mall/shop-car.png" />
      </view>

      <view class="add-car" @tap="toBuy">
        <image mode="widthFix" src="~@/assets/mall/add-car.png" />
      </view>
    </view>

    <van-popup
      class="popup"
      :show="show"
      position="center"
      :round="true"
      overlay-style="
        background: #D8D8D8;
        opacity: 0.53;"
      custom-style="min-height: 360px"
    >
      <view class="popup-pro">
        <view class="pro-header">
          <view class="cancel" @tap="onClose">取消</view>
          <view>编辑订单</view>
        </view>

        <view class="pro-body">
          <view class="pro-wrap">
            <view class="wrap-left">
              <view class="title">
                {{ proInfo.title }}
              </view>
              <view class="price">
                <view>¥{{ proInfo.price }}</view>
              </view>
              <view class="explain"
                >运费：¥ {{ proInfo.freight }} | 库存充足</view
              >
            </view>
            <view class="wrap-right">
              <image src="~@/assets/index/content1.png" />
            </view>
          </view>

          <view class="norms-wrap">
            <view class="title">选择规格</view>
            <view class="norms-lists">
              <block v-for="(row, index) in size" :key="index">
                <view class="list" @tap="chooseSize(row)">
                  {{ row }}
                </view>
              </block>
            </view>
          </view>

          <view class="settle-box">
            <view class="pro-num"> </view>
            <view class="check-money" @tap="toCheck">
              ¥{{ proInfo.price }} 确认
            </view>
          </view>
        </view>
      </view>
    </van-popup>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Swiper from '@/components/Swiper'
import Taro from '@tarojs/taro'
import { ShopService } from '@/service'
import { mapState } from 'vuex'
import { isValid } from '@puckjs/utils/lib/helper'

export default {
  components: { Swiper, PageTitle },

  data() {
    return {
      show: false,
      images: [
        'https://s3.ax1x.com/2021/03/09/61WPrn.png',
        'https://s3.ax1x.com/2021/03/09/61WPrn.png'
      ],

      // 是否自动切换
      autoplay: true,

      // 是否显示面板指示点
      indicatorDots: true,

      // 是否采用衔接滑动
      circular: false,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500,

      current: 0,

      proInfo: {},

      proId: null,

      goodId: null
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),

    // 规格
    size: function () {
      const size = this.proInfo.size
      return isValid(size) ? size.split(/[,，]/g) : []
    }
  },

  onLoad({ goodId }) {
    this.goodId = goodId
    this.findCommodityById(goodId)
  },

  methods: {
    // 查询商品详情
    async findCommodityById(goodId) {
      const res = await ShopService.findCommodityById(goodId)
      this.proInfo = res
    },

    // 添加购物车
    async addCar() {
      Taro.showLoading({
        title: '添加中...'
      })

      try {
        await ShopService.addShoppingCart(
          Number(this.goodId),
          1,
          this.userInfo.id
        )

        Taro.showToast({
          title: '添加成功~',
          icon: 'success',
          duration: 2000
        })
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    // 确认订单
    toCheck() {
      const tmpId = 'PURCHASE_GOODS'

      this.$store.dispatch('selectGoods', [tmpId])
      this.$store.dispatch('addPurchaseGoods', [
        {
          commodity: this.proInfo,
          money: this.proInfo.price,
          id: tmpId,
          num: 1
        }
      ])

      Taro.navigateTo({
        url: '/pages/pageB/checkOrders/index'
      })
    },

    chooseSize(row) {
      console.log(row)
    },

    toBuy() {
      this.show = true
    },

    onClose() {
      this.show = false
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.IntegrationProductDetail {
  position: relative;

  .pro-trait-items {
    height: 127px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(199, 196, 196, 0.5);
    border-radius: 14px;
    margin: 10px;
    padding: 10px;

    .pro-trait-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 6px;

      .price {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 21px;
        color: #0a6ffb;
        font-weight: 400;

        text {
          font-size: 13px;
        }
      }

      .share {
        text-align: center;
        color: #b7b7b7;
        font-size: 10px;
      }

      .coupon {
        height: 19px;
        line-height: 19px;
        padding: 2px 10px;
        text-align: center;
        background: #d6e7fe;
        border-radius: 4px;
        color: #0a6ffb;
        font-size: 12px;
      }

      .coupon-button {
        font-size: 12px;
        color: #0a6ffb;
      }
    }

    .title {
      font-weight: 400;
      font-size: 22px;
    }

    .pro-trait-message {
      font-size: 10px;
      color: #ff6c6c;
    }
  }

  .pro-items {
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(199, 196, 196, 0.5);
    border-radius: 14px;
    margin: 0 10px 10px;

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 10px;

      .item-left {
        display: flex;
        align-items: center;
        justify-content: flex-start;

        .left {
          color: #c2c2c2;
          margin-right: 20px;
        }

        .right text {
          padding-left: 5px;
        }

        .norms-list {
          width: 82px;
          height: 13px;
          font-size: 9px;
          font-weight: 400;
          color: #c2c2c2;
          line-height: 13px;
        }
      }
    }
  }

  .pro-cover-lists {
    margin: 10px;
    text-align: center;
    margin-bottom: 60px;

    .list {
      width: 100%;
      height: 100%;
    }

    image {
      width: 100%;
      border-radius: 20px;
    }
  }

  .shopping-button {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 54px;
    background: #f3f3f3;
    box-shadow: 0 -8rpx 14rpx 0 rgba(174, 174, 174, 0.5);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .shop-now,
  .add-car {
    width: 120px;
    height: 33px;
    background: rgba(255, 255, 255, 0);
    box-shadow: 1px 1px 2px 0px rgba(202, 202, 202, 1),
      -1px -1px 3px 0px rgba(255, 255, 255, 1);
    border-radius: 4px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 28px;
      height: 100%;
    }
  }

  .popup-pro {
    width: 300px;
    padding: 10px;

    .pro-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      border-bottom: 1px solid #dbdbdb;
      padding-bottom: 10px;

      .cancel {
        width: 32px;
        margin-right: 86px;
        color: #0a6ffb;
      }
    }

    .pro-body {
      margin-top: 10px;

      .pro-wrap {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-bottom: 10px;
        border-bottom: 1px solid #dbdbdb;

        .wrap-left {
          flex: 1;
          padding-right: 15px;

          .price {
            color: #0a6ffb;
            margin: 6px 0;
          }

          .explain {
            font-size: 10px;
            color: #a1a1a1;
            padding-bottom: 10px;
          }
        }

        .wrap-right {
          width: 56px;
          height: 60px;

          image {
            width: 100%;
            height: 100%;
          }
        }
      }

      .norms-wrap {
        border-bottom: 1px solid #dbdbdb;

        .title {
          font-size: 12px;
        }

        .norms-lists {
          height: 110px;
          overflow: scroll;
          font-size: 12px;
          margin-bottom: 10px;

          .list {
            min-width: 272px;
            padding: 5px 10px;
            background: #f1f1f1;
            border-radius: 4px;
            margin: 10px 0;
          }
        }
      }

      // 结算
      .settle-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .pro-num {
          width: 150px;
        }

        .check-money {
          padding: 5px 15px;
          background: #0a6ffb;
          border-radius: 5px;
          color: #fff;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
</style>
