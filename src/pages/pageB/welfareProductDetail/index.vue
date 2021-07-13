<template>
  <!--爱心义卖-->
  <view class="WelfareProductDetail">
    <PageTitle pageTitle="商品详情" />

    <Swiper />

    <view class="pro-trait-items">
      <view class="pro-trait-item">
        <view class="warp">
          <view class="price">
            <text>¥</text>
            <view> 190 </view>
          </view>
          <view class="coupon">资助流浪动物项目</view>
        </view>

        <view class="share">
          <van-icon name="share-o" size="18px" color="#FF3B3B" />
          <view>分享</view>
        </view>
      </view>

      <view class="pro-trait-item title">
        创意中国风复古书签套装礼盒古典文艺仙鹤笔记本
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
          <van-icon name="arrow" color="#fff" />
        </view>
      </view>

      <view class="item">
        <view class="item-left">
          <view class="left">发货</view>
          <view class="right">
            <view>杭州 | 快递:免运费</view>
          </view>
        </view>

        <view class="item-right">
          <van-icon name="arrow" color="#fff" />
        </view>
      </view>

      <view class="item">
        <view class="item-left">
          <view class="left">参数</view>
          <view class="right">品牌 型号...</view>
        </view>

        <view class="item-right">
          <van-icon name="arrow" color="#fff" />
        </view>
      </view>
    </view>

    <view class="pro-cover-lists">
      <view class="list">
        <image
          mode="widthFix"
          src="https://s3.ax1x.com/2021/03/09/632ORe.png"
        />
      </view>
    </view>

    <view class="shopping-button">
      <view class="shop-now">
        <image mode="widthFix" src="~@/assets/mall/welfare-shop.png" />
      </view>
      <view class="add-car">
        <image mode="widthFix" src="~@/assets/mall/welfare-like.png" />
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Swiper from '@/components/Swiper'

export default {
  components: { Swiper, PageTitle },

  data() {
    return {
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

      current: 0
    }
  },

  methods: {}
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}
.WelfareProductDetail {
  .pro-trait-items {
    min-height: 140px;
    background: url('https://s3.ax1x.com/2021/03/10/6JtSzV.png');
    background-size: 100% 100%;
    border-radius: 14px;
    margin: 10px;
    padding: 10px 15px;

    .pro-trait-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 6px;

      .warp {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }

      .price {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 21px;
        color: #ff3b3b;
        font-weight: 400;

        text {
          font-size: 13px;
        }
      }

      .share {
        text-align: center;
        color: #ff3b3b;
        font-size: 10px;
      }

      .coupon {
        height: 19px;
        line-height: 19px;
        padding: 2px 10px;
        text-align: center;
        background: #ff4b4b;
        border-radius: 4px;
        color: #ffd0d0;
        font-size: 12px;
        margin-left: 10px;
      }
    }

    .title {
      font-weight: 400;
      font-size: 20px;
      color: #fff;
      width: 75%;
    }
  }

  .pro-items {
    background: #f88888;
    box-shadow: 0px 2px 4px 0px rgba(199, 196, 196, 0.5);
    border-radius: 14px;
    margin: 0 15px 10px;

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
        color: #fff;

        .left {
          color: #fed3d3;
          margin-right: 20px;
        }

        .norms-list {
          width: 82px;
          height: 13px;
          font-size: 9px;
          font-weight: 400;
          color: #fed3d3;
          line-height: 13px;
        }
      }
    }
  }

  .pro-cover-lists {
    margin: 10px;
    text-align: center;
    margin-bottom: 30px;

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
}
</style>
