<template>
  <view class="swiper-page">
    <swiper
      :autoplay="autoplay"
      :circular="circular"
      :vertical="vertical"
      :interval="interval"
      :duration="duration"
      previous-margin="0px"
      next-margin="0px"
      @change="swiperChange"
    >
      <block v-for="(row, index) in images" :key="index">
        <swiper-item>
          <image :src="row.imgUrl" alt="" />
        </swiper-item>
      </block>
    </swiper>

    <view class="title">美院君</view>
    <view class="dots">
      <block v-for="(row, idx) in images" :key="idx">
        <view class="dot" :class="idx === current ? 'active' : ''"></view>
      </block>
    </view>

    <view class="message">
      <van-icon name="envelop-o" :dot="true" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      images: [
        {
          id: 1,
          imgUrl: 'https://s3.ax1x.com/2021/01/26/svAyFS.png'
        },
        {
          id: 2,
          imgUrl: 'https://s3.ax1x.com/2021/01/28/ypZxt1.png'
        },
        {
          id: 3,
          imgUrl: 'https://s3.ax1x.com/2021/01/26/svAyFS.png'
        }
      ],

      // 是否自动切换
      autoplay: true,

      // 是否显示面板指示点
      // indicatorDots: true,

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

  methods: {
    swiperChange(e) {
      this.current = e.detail.current
    }
  }
}
</script>

<style lang="scss">
.swiper-page {
  width: 100%;
  z-index: -1;

  .title {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    text-align: center;
    color: #fff;
    font-size: 20px;
    z-index: 0;
    font-weight: 400;
  }

  swiper {
    height: 298px;
  }

  image {
    width: 100%;
    height: 100%;
  }

  .dots {
    position: absolute;
    left: 0;
    right: 0;
    top: 90px;
    display: flex;
    justify-content: center;
    z-index: 0;
  }

  .dot {
    margin: 0 5px;
    width: 38px;
    height: 3px;
    background: #fff;
    border-radius: 2px;
    transition: all 0.6s;
  }

  .active {
    background: #0a6ffb;
  }

  .message {
    position: absolute;
    top: 52px;
    left: 15px;
    width: 38px;
    height: 28.5px;
    background: #d3e0a0;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    .van-icon {
      font-size: 22px;
    }
    .van-info {
      right: 3px; 
      top: 5px;
    }
  }
} 
</style>
