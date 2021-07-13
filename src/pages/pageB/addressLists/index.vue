<template>
  <view class="address-lists-page">
    <PageTitle pageTitle="配送至" />
    <view class="address-items">
      <view class="explain">默认地址</view>
      <view class="current-address">
        <van-icon size="18" name="location-o" />
        <view class="address">杭州</view>
      </view>

      <view class="explain">从我的收货地址选择</view>
      <block v-if="addressList.length > 0">
        <view
          class="item"
          v-for="(row, index) in addressList"
          :key="index"
          @tap="selectAddress(row.id)"
        >
          <view class="item-left">
            <view class="item-name">{{ row.name }}</view>
            <view class="item-address">
              {{ row.province }} {{ row.city }} {{ row.counties }}
              {{ row.detailedAddress }}
            </view>
          </view>
          <view class="item-right">
            <view class="item-phone-number">{{ row.phone }}</view>
            <view class="edit-button" @tap.stop="toEditAddress(row.id)"
              >编辑</view
            >
          </view>
        </view>
        <view class="add" @tap="toAddAddress"> 添加收货地址 </view>
      </block>
      <block v-else>
        <NullState text="快去添加地址吧~" />
        <view class="add" @tap="toAddAddress"> 添加收货地址 </view>
      </block>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { AddressService } from '@/service'
import { mapState } from 'vuex'
import NullState from '@/components/NullState'
import { pageQuery } from '@/utils/page-query'

export default {
  components: { NullState, PageTitle },

  data() {
    return {
      defaultAddress: {}
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      addressList: state => state.address.addressList
    })
  },

  mounted() {
    this.getAddress()
  },

  methods: {
    async getAddress() {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const res = await AddressService.findByUserId(this.userInfo.id)
        this.$store.dispatch('setAddressList', res.rows)
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    selectAddress(addressId) {
      this.$store.dispatch('selectAddress', addressId)
      Taro.navigateBack()
    },

    toEditAddress(addressId) {
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/editAddress/index', {
          addressId
        })
      })
    },

    toAddAddress() {
      Taro.navigateTo({
        url: '/pages/pageB/addAddress/index'
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.address-lists-page {
  .address-items {
    padding: 15px;

    .current-address {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: #fff;
      border-radius: 6px;
      padding: 15px;

      .address {
        margin-left: 10px;
        font-size: 14px;
      }
    }

    .explain {
      color: #bfbfbf;
      font-size: 12px;
      margin: 10px 0;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      background-color: #fff;
      border-radius: 8px;
      padding: 10px 15px;

      .item-left {
        width: 80%;
        margin-right: 10px;

        .item-name {
          font-size: 14px;
          font-weight: 400;
        }

        .item-address {
          font-size: 10px;
          margin-top: 5px;
        }
      }

      .item-right {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .item-phone-number {
          font-size: 12px;
        }

        .edit-button {
          width: 90px;
          text-align: center;
          padding: 2px 0;
          border-radius: 5px;
          color: #0a6ffb;
          border: 1px solid #0a6ffb;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }

    .add {
      width: 50%;
      text-align: center;
      padding: 10px;
      border: 1px solid #0a6ffb;
      border-radius: 5px;
      color: #0a6ffb;
      background-color: #fff;
      margin: 30px auto 100px;
      font-size: 14px;
    }
  }
}
</style>
