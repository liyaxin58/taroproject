<template>
  <view class="order-lists-page">
    <PageTitle pageTitle="意见反馈" />
    <view class="box">
      <view
        class="box_item"
        :class="navIndex == index ? 'itemColor' : ''"
        v-for="(item, index) in boxList"
        :key="index"
        @tap="itemClick(index, item)"
      >
        <view class="box_title" :class="navIndex == index ? 'item' : ''">{{
          item.title
        }}</view>
        <van-icon
          name="arrow"
          :color="navIndex == index ? '#fff' : '#CDCDCD'"
          size="15"
        />
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { pageQuery } from '@/utils/page-query'
export default {
  components: { PageTitle },

  data() {
    return {
      boxList: [
        { id: 0, title: '无法打开小程序' },
        { id: 1, title: '小程序闪退' },
        { id: 2, title: '卡顿' },
        { id: 3, title: '黑屏白屏' },
        { id: 4, title: '死机' },
        { id: 5, title: '界面错位' },
        { id: 6, title: '界面加载慢' },
        { id: 7, title: '其他异常' }
      ],
      navIndex: -1,
      isType: ''
    }
  },
  onLoad(options) {
    this.isType = options.id
  },
  methods: {
    itemClick(index, item) {
      this.navIndex = index
      Taro.navigateTo({
        url: `/pages/pageD/feedback/submit?title=${item.title}&id=${item.id}&smallType=${this.isType}`
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}
.box {
  margin-top: 40rpx;
}
.box_item {
  width: 100%;
  height: 83rpx;
  background-color: #fff;
  border-bottom: 1rpx solid #eaeaea;
  padding: 0 40rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .box_title {
    font-size: 27rpx;
    color: #5c5c5c;
  }
}
.itemColor {
  background-color: #0a6ffb;
  .item {
    color: #ffffff;
  }
}
</style>
