<template>
  <view class="PageTitlePage">
    <view class="arrow" @tap="goBack">
      <van-icon size="18" name="arrow-left" />
    </view>

    <view class="title">{{ pageTitle }}</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'

export default {
  props: {
    pageTitle: String
  },

  usingComponents: {
    'van-icon': '@/components/vant/icon/index'
  },

  methods: {
    goBack() {
      Taro.navigateBack()
    }
  }
}
</script>

<style lang="scss">
.PageTitlePage {
  display: flex;
  align-items: center;
  padding: 53px 15px 0;

  .arrow {
    width: 66px;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f4f4f4;
    color: #0a6ffb;
    box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
      -1px -1px 1px 0px rgba(255, 255, 255, 1);
    border-radius: 8px;

    image {
      width: 10px;
      height: 15px;
    }
  }

  .title {
    flex: 1;
    text-align: center;
    padding-right: 66px;
    font-size: 20px;
    color: #0a6ffb;
  }
}
</style>
