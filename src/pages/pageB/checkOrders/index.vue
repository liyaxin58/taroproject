<template>
  <view class="check-orders-page">
    <PageTitle pageTitle="确认订单" />

    <view class="order-form">
      <view class="item" @tap="toSeletedAddress">
        <van-icon name="location-o" />
        <view class="item-right">
          <block v-if="address">
            <view class="item-user"
              >{{ address.name }} <text>{{ address.phone }}</text></view
            >
            <view class="item-address">
              {{ address.province }} {{ address.city }} {{ address.counties }}
              {{ address.detailedAddress }}
            </view>
          </block>
          <block v-else>请选择地址</block>
        </view>
        <van-icon size="20" name="arrow" custom-style="margin-left: 15px;" />
      </view>

      <view class="item">
        <van-icon name="bag-o" />
        <view class="item-right">
          <view class="pro" v-for="(row, index) in goodsList" :key="index">
            <view class="pro-title">{{ row.commodity.title }}</view>
            <view class="pro-norms">{{ row.commodity.size }}</view>
            <view class="pro-num">*{{ row.num }}</view>
          </view>
        </view>
      </view>

      <view class="item">
        <van-icon name="gift-card-o" />
        <view class="item-right">
          <view>暂无可用优惠卷</view>
        </view>
      </view>

      <view class="item">
        <van-icon name="gift-card-o" />
        <view class="pay-wrap">
          <view class="wrap-left">实付款</view>
          <view class="wrap-right">
            <view class="pro-price"><text>¥ </text>{{ total }}</view>
            <view class="pro-logistics">免运费</view>
          </view>
        </view>
      </view>

      <view class="item">
        <van-icon name="edit" />
        <view class="remark">
          <input-cell
            name="remark"
            :value="remark"
            :border="false"
            placeholder="添加备注..."
            type="textarea"
            autosize="true"
            maxlength="100"
            @change="onInputChange"
            input-align="left"
          />
        </view>
      </view>

      <view class="pay-button" @tap="toSubmit">微信支付</view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { mapState } from 'vuex'
import { OrderService } from '@/service'
import InputCell from '@/components/input-cell'
import { isEmpty } from '@puckjs/utils/lib/helper'

export default {
  components: { InputCell, PageTitle },

  data() {
    return {}
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      address: state => {
        return state.address.addressList.find(
          row => row.id === state.address.selectedAddressId
        )
      },
      goodsList: state => {
        return state.shoppingCart.goodsList.filter(row =>
          state.shoppingCart.selectedGoods.includes(row.id)
        )
      }
    }),

    total() {
      return this.goodsList
        .reduce((sum, next) => sum + next.num * next.money, 0)
        .toFixed(2)
    }
  },

  methods: {
    async toSubmit() {
      if (isEmpty(this.address)) {
        Taro.showToast({
          title: '请选择地址',
          icon: none
        })
        return
      }

      Taro.showLoading({
        title: '添加中...'
      })

      try {
        const order = this.goodsList.map(row => ({
          buyUserId: this.userInfo.id,
          sellUserId: 7,
          addressId: this.address.id,
          commodityId: row.commodityId,
          buyNum: row.num,
          money: row.money,
          integral: row.integral || 0,
          expressType: 0,
          remarks: ''
        }))

        const res = await OrderService.addOrder(order)

        const { isPay } = await OrderService.isPayByPayNo(res.payNo)

        if (isPay === '未支付') {
          wx.requestPayment({
            timeStamp: res.msg.timeStamp,
            nonceStr: res.msg.nonceStr,
            package: res.msg.package,
            signType: 'MD5',
            paySign: res.msg.paySign,

            success: function (res) {
              console.log('success', res)
            },

            fail: function (res) {
              console.log('fail', res)
            },
            complete: function (res) {}
          })
        } else {
          Taro.showToast({
            title: '已经支付过啦~',
            icon: 'none'
          })
        }
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()

      // Taro.navigateTo({
      //   url: '/pages/pageB/successDetail/index'
      // })
    },

    toSeletedAddress() {
      Taro.navigateTo({
        url: '/pages/pageB/addressLists/index'
      })
    }
  }
}
</script>

<style lang="scss">
.check-orders-page {
  .order-form {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #dbdbdb;
    margin-top: 30px;
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 15px;
    border-bottom: 1px solid #dbdbdb;

    .remark {
      flex: 1;
    }

    .van-icon {
      font-size: 28px;
      color: #b0b0b0;
      margin-right: 10px;
    }

    .item-right {
      flex: 1;

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
        margin-bottom: 10px;

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

  .pay-button {
    font-size: 18px;
    padding: 10px 60px;
    border-radius: 15px;
    color: #fff;
    background-color: #0a6ffb;
    margin: 30px auto;
    font-weight: 400;
  }
}
</style>
