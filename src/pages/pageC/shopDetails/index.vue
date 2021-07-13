<template>
  <view class="shop-details-page">
    <view class="shop-cover">
      <image :src="shopDetail.firstImg" />
    </view>
    <PageTitle pageTitle="转塘咖啡店" />

    <!--<view class="menu-button"> 菜单 </view>-->

    <view class="bottom">
      <view class="store-info">
        <view class="store">
          <view class="store-left" @tap="toDetail">
            <text class="title">{{ shopDetail.shopName }}</text>
            <block v-for="(row, index) in shopDetail.star" :key="index">
              <image class="start-cover" src="~@/assets/shop/start.png" />
            </block>
          </view>

          <view class="store-right">
            <image src="~@/assets/shop/share.png" />
            <view>分享</view>
          </view>
        </view>

        <view class="tag">
          <text>SLOGAN</text>
        </view>

        <view class="address">
          <image class="address-imge" src="~@/assets/shop/address.png" alt="" />
          <text>{{ shopDetail.detailedAddress }}</text>
        </view>
      </view>

      <view class="cover-show">
        <block v-for="(row, index) in dishesImg" :key="index">
          <image class="cover-img" :src="row" />
        </block>
      </view>
    </view>

    <view class="scroll-box">
      <view class="scroll-body">
        <view class="transparent-box"></view>

        <view class="company-introduction">
          <view class="collect">
            <image class="" src="~@/assets/shop/left.png" />
            <text class="line"></text>
            <image class="" src="~@/assets/shop/right.png" />
          </view>

          <view class="introduction">
            <view class="title">简介</view>
            <view>
              {{ shopDetail.introduction }}
            </view>
          </view>

          <view class="introduction-swiper">
            <swiper
              class="swiper"
              :indicator-dots="indicatorDots"
              :autoplay="autoplay"
              :circular="circular"
              :vertical="vertical"
              :interval="interval"
              :duration="duration"
              previous-margin="35px"
              next-margin="35px"
            >
              <swiper-item v-for="(row, index) in introductionImg" :key="index">
                <view class="item-body">
                  <image class="top-imge" mode="scaleToFill" :src="row" />
                </view>
              </swiper-item>
            </swiper>
          </view>

          <view class="introduction">
            <view class="title">菜品</view>
            <view>{{ shopDetail.dishes }}</view>
          </view>

          <view class="cover-show">
            <block v-for="(row, index) in dishesImg" :key="index">
              <image class="cover-img" :src="row" />
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'
import { ShopService } from '../../../service'
import { isValid } from '@puckjs/utils/lib/helper'

export default {
  components: { PageTitle },

  data() {
    return {
      images: [
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png'
      ],
      // 是否自动切换
      autoplay: false,

      // 是否显示面板指示点
      indicatorDots: false,

      // 是否采用衔接滑动
      circular: true,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500,

      current: 0,

      storeId: null,

      shopDetail: null
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),

    // 店铺图片
    introductionImg: function () {
      const detailsImg = this.shopDetail.introductionImg
      return isValid(detailsImg) ? detailsImg.split(/[,，]/g) : []
    },

    dishesImg: function () {
      const detailsImg = this.shopDetail.dishesImg
      return isValid(detailsImg) ? detailsImg.split(/[,，]/g) : []
    }
  },

  onLoad({ shopId }) {
    this.storeId = shopId
    this.getShopDetail(this.storeId)
  },

  methods: {
    async getShopDetail(shopId) {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const res = await ShopService.findDetailsByTandianId(shopId)
        this.shopDetail = res
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #000;
}

.shop-details-page {
  overflow: hidden;

  .PageTitlePage {
    margin-bottom: 300px;

    .arrow {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .title {
      color: #fff;
    }
  }

  .shop-cover {
    position: absolute;
    z-index: -1;
    width: 375px;
    height: 375px;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .menu-button {
    position: absolute;
    top: 40%;
    right: 0;
    left: 15px;
    z-index: 1;
    width: 60px;
    height: 20px;
    background: #ffffff;
    border-radius: 4px;
    color: #0a6ffb;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
  }

  .bottom {
    padding: 10px 0 63px;
    background-color: #000000;
    color: #fff;

    .store-info {
      padding: 0 15px;

      .store {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;

        .start-cover {
          width: 15px;
          height: 15px;
          margin-right: 3px;
        }

        .store-right {
          text-align: center;
          color: #c2c2c2;
          font-size: 12px;
          font-weight: 500;

          image {
            width: 15px;
            height: 15px;
          }
        }
      }

      .tag {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 18px;
        font-weight: 900;
        color: #0a6ffb;
      }

      .address {
        width: 180px;
        font-size: 10px;
        padding-top: 5px;
      }

      .address-imge {
        width: 8px;
        height: 10px;
        font-weight: 300;
      }
    }

    // 图片展示
    .cover-show {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 10px -40px;

        &:nth-child(2n) {
          transform: scale(1.5);
        }
      }
    }
  }

  .scroll-box {
    position: absolute;
    top: 100px;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 2;

    .scroll-body {
      width: 100%;
      height: 88vh;
      overflow-y: scroll;
      overflow-x: hidden;

      .transparent-box {
        height: 580px;
        background: rgba(255, 255, 255, 0);
      }

      .company-introduction {
        min-height: 400px;
        background: #2e2f2f;
        box-shadow: 0px -3px 4px 0px rgba(0, 0, 0, 0.5);
        border-top-left-radius: 40px;
        border-top-right-radius: 40px;
        padding-bottom: 40px;

        .collect {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 0 15px;

          .line {
            width: 60px;
            height: 2px;
            margin-top: 10px;
            background-color: #d4d2d2;
          }

          image {
            padding: 15px 0;
            width: 27px;
            height: 24px;
          }
        }

        .introduction {
          margin: 5px 0;
          color: #fff;
          font-size: 12px;
          padding: 0 15px;

          .title {
            font-size: 14px;
            margin-bottom: 10px;
          }
        }

        // 轮播
        .introduction-swiper {
          width: 100%;
          height: 250px;
          margin: 20px 0 25px;

          .swiper {
            width: 100%;
            height: 250px;

            .swiper-item {
              height: 240px;
              display: flex;
              justify-content: center;
              align-items: center;
            }

            .item-body {
              width: 285px;
              height: 240px;
              background: #000;
              border-radius: 20px;
              color: #fff;

              .top-imge {
                width: 285px;
                height: 100%;
                border-radius: 20px;
              }
            }
          }
        }

        // 图片展示
        .cover-show {
          width: 100%;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 30px 0 40px;

          image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            margin: 10px -40px;

            &:nth-child(2n) {
              transform: scale(1.5);
            }
          }
        }
      }
    }
  }
}
</style>
