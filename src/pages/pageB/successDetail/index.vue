<template>
  <view class="success-detail-page">
    <PageTitle pageTitle="订单详情" />

    <view class="success-cover">
      <image src="~@/assets/mall/success.png" />
      <view class="success-title">交易完成</view>
    </view>

    <view class="order-box">
      <view class="seller">
        <view class="seller-left">
          <image class="seller-cover" src="~@/assets/content1.png" />
          <view class="user">
            <view class="user-top">卖家信息</view>
            <view class="user-name">Break Free</view>
            <view class="user-bottom">美院校友</view>
          </view>
        </view>

        <view class="seller-right">
          <view class="seller-button">联系卖家</view>
          <van-icon name="arrow" size="15" color="#C2C2C2" />
        </view>
      </view>

      <view class="item">
        <van-icon name="location-o" />
        <view class="item-right">
          <view class="item-user">曾维嘉 <text>1234567890</text></view>
          <view class="item-address"
            >浙江省杭州市西湖区转塘街道中国美术学院山北生活区…</view
          >
        </view>
      </view>

      <view class="item">
        <van-icon name="bag-o" />
        <view class="item-right">
          <view class="pro">
            <view class="pro-title">莫兰蒂色香氛洗发水</view>
            <view class="pro-norms"
              >古龙香型 800g洗发水 （送洗面奶爽肤水洗浴球）</view
            >
            <view class="pro-num">*1</view>
          </view>
        </view>
      </view>

      <view class="order-lists">
        <view class="list">
          <view class="left">
            <van-icon name="todo-list-o" />
            <view class="title">订单时间</view>
          </view>
          <view class="right">{{ orderInfo.createTime }}</view>
        </view>
        <view class="list">
          <view class="left">
            <van-icon name="orders-o" />
            <view class="title">订单编号</view>
          </view>
          <view class="right">
            <view>{{ orderInfo.orderNo }}</view>
            <view class="copy">复制</view>
          </view>
        </view>
        <view class="list">
          <view class="left">
            <van-icon name="logistics" />
            <view class="title">待发货</view>
          </view>
        </view>
      </view>

      <view class="item">
        <van-icon name="gift-card-o" />
        <view class="pay-wrap">
          <view class="wrap-left">
            商品总额
            <view class="logistics">运费</view>
          </view>
          <view class="wrap-right">
            <view class="pro-price"><text>¥ </text>{{ orderInfo.money }}</view>
            <view class="pro-logistics">￥0</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { OrderService } from '../../../service'

export default {
  components: { PageTitle },

  data() {
    return {
      orderId: null,

      orderInfo: {}
    }
  },

  onLoad({ orderNo }) {
    console.log(orderNo)
    // this.orderId = orderNo
    this.getOrderLists(orderNo)
  },

  methods: {
    // 查询订单详情
    async getOrderLists(orderNo) {

      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const res = await OrderService.findOrderDetail(orderNo)
        this.orderInfo = res.rows

      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.success-detail-page {
  padding-bottom: 30px;
  .success-cover {
    text-align: center;
    font-size: 14px;
    margin-top: 30px;

    image {
      width: 96px;
      height: 96px;
    }
  }

  .success-title {
    margin-bottom: 10px;
    padding-right: 13px;
  }

  .order-box {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #dbdbdb;
    margin-top: 30px;
    padding: 10px;
  }

  .seller {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 15px 10px;
    border-radius: 5px;
    margin: 10px 0;

    .seller-left {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .seller-cover {
        width: 58px;
        height: 58px;
        margin-right: 10px;
        border-radius: 50%;
        box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
      }

      .user {
        .user-top {
          font-size: 16px;
          color: #0a6ffb;
        }

        .user-name {
          font-size: 14px;
        }

        .user-bottom {
          width: 60px;
          height: 20px;
          background: #bad6fd;
          border-radius: 3px;
          font-size: 10px;
          text-align: center;
          line-height: 20px;
          margin-top: 5px;
        }
      }
    }

    .seller-right {
      display: flex;

      .seller-button {
        width: 110px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #0a6ffb;
        color: #0a6ffb;
        text-align: center;
        line-height: 30px;
        margin-right: 10px;
      }
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    padding: 15px 10px;
    border-radius: 5px;
    margin: 10px 0;

    .van-icon {
      font-size: 28px;
      color: #b0b0b0;
      margin-right: 10px;
    }

    .logistics {
      color: #979797;
      font-size: 12px;
      margin-top: 8px;
    }

    .item-right {
      .pro {
        margin-bottom: 5px;
      }

      .item-user,
      .item-address {
        display: flex;
      }

      .item-user,
      .pro-title {
        font-size: 16px;
        margin-bottom: 5px;

        text {
          padding-left: 15px;
        }
      }

      .item-address,
      .pro-norms,
      .pro-num {
        color: #9f9f9f;
        font-size: 12px;
      }

      .pro-num {
        padding-top: 5px;
      }
    }

    .pay-wrap {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .wrap-right {
        text-align: center;
      }

      .pro-price {
        color: #0a6ffb;
        font-size: 18px;
      }

      .pro-logistics {
        font-size: 12px;
        padding-top: 5px;
        color: #9f9f9f;
      }
    }
  }

  .order-lists {
    padding: 10px;
    border-radius: 5px;
    background-color: #fff;

    .list {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;

      .left {
        display: flex;

        .van-icon {
          font-size: 28px;
          color: #b0b0b0;
        }

        .title {
          font-size: 16px;
          margin-left: 10px;
        }
      }

      .right {
        color: #9f9f9f;
        font-size: 12px;
        display: flex;
      }

      .copy {
        padding-left: 10px;
        font-size: 12px;
        color: #0a6ffb;
      }
    }
  }
}
</style>
