<template>
  <view class="order-lists-page">
    <PageTitle pageTitle="我的订单" />

    <view class="order-lists">
      <view class="list" v-for="(row, index) in orderLists" :key="index">
        <view class="list-body" @tap="toOrderDetail(row.orderNo)">
          <view class="left">
            <view class="pro-cover">
              <image :src="row.commodity.imgurl" />
            </view>
            <view class="pro-info">
              <view class="title">{{ row.commodity.title }} * {{ row.buyNum }}</view>
              <view class="logistics">卖家已发货</view>
              <view class="total">总价 ¥{{ row.totalMoney }}</view>
              <view class="discount">优惠 ¥{{ row.discountMoney }}</view>
              <view class="pay">实付款 ¥{{ row.money }}</view>
            </view>
          </view>
          <view class="right"> ¥90.00 </view>
        </view>
        <view class="list-footer">
          <view class="button" @tap="toLogistics(row.waybillNo)">查看物流</view>
          <view class="button" @tap="toCheckOrder(row.id)">确认收货</view>
          <view class="button" @tap="toDeleteOrder(row.id)">删除订单</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { OrderService } from '@/service'
import { mapState } from 'vuex'
import { pageQuery } from '@/utils/page-query'

export default {
  components: { PageTitle },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  data() {
    return {
      orderLists: []
    }
  },

  mounted() {
    this.getOrderLists()
  },

  methods: {
    // 获取探店菜单详情
    async getOrderLists(shopId) {
      this.shopId = shopId

      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const res = await OrderService.findOrders(this.userInfo.id)
        this.orderLists = res.rows

      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    // 查看订单详情
    toOrderDetail(orderNo){
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/successDetail/index', {
          orderNo
        })
      })
    },

    // 查看物流
    toLogistics(waybillNo, defaultExpress){
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/logistics/index', {
          waybillNo,
          defaultExpress
        })
      })
    },

    // 确认收货
    async toCheckOrder(orderId){
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        await OrderService.upOrder(orderId, 4)
        this.getOrderLists()

        Taro.showToast({
          title: '已确认收货',
          icon: 'success'
        })


      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    // 删除订单
    async toDeleteOrder(orderId){
      Taro.showLoading({
        title: '正在删除...'
      })

      try {
        await OrderService.delOrder(orderId)
        this.getOrderLists()

        Taro.showToast({
          title: '删除成功',
          icon: 'success'
        })

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

.order-lists-page {
  .order-lists {
    margin: 15px;

    .list {
      background: #f3f3f3;
      box-shadow: 0px 1px 3px 0px rgba(166, 166, 166, 0.5);
      border-radius: 15px;
      padding: 13px;
      margin-bottom: 15px;
    }

    .list-body {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .left {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        .pro-cover {
          width: 89px;
          height: 89px;

          image {
            width: 100%;
            height: 100%;
            border-radius: 6px;
          }
        }

        .pro-info {
          margin-left: 10px;

          .title {
            font-weight: 400;
            font-size: 14px;
          }

          .logistics {
            width: 80px;
            padding: 5px 8px;
            background: #f3f3f3;
            box-shadow: 0px 1px 3px 0px rgba(166, 166, 166, 0.5);
            border-radius: 5px;
            color: #0a6ffb;
            font-size: 12px;
            text-align: center;
            margin: 5px 0;
          }

          .total,
          .discount {
            font-size: 10px;
            color: #373737;
            margin-top: 5px;
          }

          .pay {
            font-size: 14px;
            color: #0a6ffb;
            margin: 5px 0;
          }
        }
      }

      .right {
        color: #373737;
      }
    }

    .list-footer {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 15px;

      .button {
        padding: 5px;
        color: #0a6ffb;
        background: #f4f4f4;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
        border-radius: 8px;
        font-size: 12px;
      }
    }
  }
}
</style>
