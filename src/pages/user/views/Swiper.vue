<template>
  <view class="swiper-page">
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :vertical="vertical"
      :interval="interval"
      :duration="duration"
      previous-margin="0px"
      next-margin="0px"
    >
      <block v-for="(row, index) in images" :key="index">
        <swiper-item>
          <image :src="row" alt="" />
        </swiper-item>
      </block>
    </swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      images: [
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png'
      ],

      // 是否自动切换
      autoplay: true,

      // 是否显示面板指示点
      indicatorDots: false,

      // 是否采用衔接滑动
      circular: false,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.swiper-page {
  width: 100%;

  swiper {
    height: 125px;
    margin: -10px 15px 10px;
  }

  image {
    width: 100%;
    height: 100%;
  }
}
</style>
