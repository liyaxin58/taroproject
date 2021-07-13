<template>
  <view class="opinion-page">
    <PageTitle pageTitle="意见和建议" />
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
export default {
  components: { PageTitle },

  data() {
    return {
      boxList: [
        { id: 0, title: '意见反馈' },
        { id: 1, title: '优化建议' },
        { id: 2, title: '投诉举报' }
      ],
      navIndex: -1
    }
  },
  methods: {
    itemClick(index, item) {
      this.navIndex = index

      if (index === 0) {
        Taro.navigateTo({
          url: `/pages/pageD/feedback/index?id=${item.id}`
        })
      } else {
        Taro.navigateTo({
          url: `/pages/pageD/feedback/submit?title=${item.title}&id=${item.id}`
        })
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.opinion-page {
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
}
</style>
