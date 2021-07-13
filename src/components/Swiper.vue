<template>
  <view class="public-swiper">
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :vertical="vertical"
      :interval="interval"
      :duration="duration"
      indicator-color="#D8D8D8"
      indicator-active-color="#0A6FFB"
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
        'https://s3.ax1x.com/2021/03/09/615llD.png',
        'https://s3.ax1x.com/2021/03/09/615llD.png'
      ],

      // 是否自动切换
      autoplay: true,

      // 是否显示面板指示点
      indicatorDots: true,

      // 是否采用衔接滑动
      circular: false,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500,

      current: 0
    }
  },

  methods: {}
}
</script>

<style lang="scss">
.public-swiper {
  swiper {
    height: 195px;
    margin: 20px 10px 0;
    background: #d8d8d8;
    border-radius: 16px;

    image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
