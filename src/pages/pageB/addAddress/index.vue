<template>
  <view class="add-address-page">
    <PageTitle pageTitle="新增收货地址" />

    <view class="add-form">
      <input-cell
        name="name"
        :value="name"
        title="收货人"
        :border="false"
        title-width="70px"
        placeholder="请输入收货人"
        @change="onInputChange"
      />

      <input-cell
        name="phone"
        :value="phone"
        title="手机号码"
        :border="false"
        title-width="70px"
        placeholder="请输入手机号码"
        @change="onInputChange"
      />

      <input-cell
        name="province"
        :value="province"
        title="所在地区"
        :border="false"
        title-width="70px"
        placeholder="请输入所在地区"
        @change="onInputChange"
      />

      <input-cell
        name="detailedAddress"
        :value="detailedAddress"
        title="详细地址"
        :border="false"
        title-width="70px"
        placeholder="请输入详细地址"
        @change="onInputChange"
      />

      <view class="check-cell">
        <view class="check-title">设为默认地址</view>
        <van-switch :checked="defaults" size="24px" @change="onChecked" />
      </view>

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

export default {
  components: { PageTitle, InputCell },

  data() {
    return {
      defaults: false
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    // 是否匿名
    onChecked() {
      this.defaults = !this.defaults
    },

    async submitForm() {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const address = {
          name: this.name,
          phone: this.phone,
          province: this.province,
          detailedAddress: this.detailedAddress,
          defaults: Number(this.defaults)
        }
        const res = await AddressService.addAddress(this.userInfo.id, address)

        Taro.showToast({
          title: '添加成功',
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
    },

    onInputChange(name, value) {
      this[name] = value
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.add-address-page {
  .add-form {
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
