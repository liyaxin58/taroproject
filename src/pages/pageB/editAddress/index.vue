<template>
  <view class="edit-address-page">
    <PageTitle pageTitle="编辑收货地址" />

    <view class="edit-form">
      <input-cell
        name="name"
        :value="address.name"
        title="收货人"
        :border="false"
        title-width="70px"
        placeholder="请输入收货人"
        @change="onInputChange"
      />

      <input-cell
        name="phone"
        :value="address.phone"
        title="手机号码"
        :border="false"
        title-width="70px"
        placeholder="请输入手机号码"
        @change="onInputChange"
      />

      <input-cell
        name="province"
        :value="address.province"
        title="所在地区"
        :border="false"
        title-width="70px"
        placeholder="请输入所在地区"
        @change="onInputChange"
      />

      <input-cell
        name="detailedAddress"
        :value="address.detailedAddress"
        title="详细地址"
        :border="false"
        title-width="70px"
        placeholder="请输入详细地址"
        @change="onInputChange"
      />

      <view class="check-cell">
        <view class="check-title">设为默认地址</view>
        <switch-cell
          name="defaultsAddress"
          :value="address.defaultsAddress"
          switch-active-color="0a6ffb"
          switch-size="24px"
          @change="onChecked"
        />
        <!--        <van-switch :checked="Boolean(address.defaults)" size="24px" @change="onChecked" />-->
      </view>

      <view class="delete">删除地址</view>

      <view class="submit" @tap="submitForm">保存</view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import InputCell from '@/components/input-cell'
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'
import { AddressService } from '@/service'
import SwitchCell from '@/components/switch-cell'

export default {
  components: { SwitchCell, PageTitle, InputCell },

  data() {
    return {
      defaults: false,
      address: {}
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      addressList: state => state.address.addressList
    })
  },

  onLoad({ addressId }) {
    this.address = this.addressList.find(row => String(row.id) === addressId)
  },

  methods: {
    // 是否设为默认
    onChecked(name, value) {
      this.address[name] = value
    },

    async submitForm() {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        await AddressService.upAddress(this.userInfo.id, this.address)

        Taro.showToast({
          title: '修改成功',
          icon: 'success',
          duration: 2000
        })

        Taro.navigateBack()
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
  background-color: #f3f3f3;
}

.edit-address-page {
  .edit-form {
    margin: 15px;
    background-color: #fff;
    padding: 15px 25px;
    border-radius: 13px;

    .van-cell {
      border-bottom: 1px solid #dcdcdc;
      padding: 15px 0;
    }

    .van-field__label {
      color: #000;
      font-size: 13px;
      font-weight: 400;
    }

    .van-field__control--right {
      text-align: left;
    }

    .check-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 0 10px;

      .check-title {
        padding-bottom: 5px;
        color: #000;
        font-size: 13px;
        font-weight: 400;
      }

      .van-cell {
        border-bottom: none;
      }
    }

    .delete {
      color: #0a6ffb;
      font-size: 13px;
      margin-bottom: 30px;
    }

    .submit {
      width: 270px;
      height: 38px;
      border-radius: 10px;
      border: 1px solid #0a6ffb;
      background-color: #fff;
      font-size: 18px;
      color: #0a6ffb;
      font-weight: 400;
      text-align: center;
      line-height: 38px;
      margin: 20px auto;
    }
  }
}
</style>
