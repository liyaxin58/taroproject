<template>
  <!--用户弹窗-->
  <van-popup
    :show="userCheck"
    @close="onUserCheck"
    position="center"
    :round="true"
    :z-index="101"
    custom-style="width: 80%"
    overlay-style="background-color: #ECECEC; opacity: 0.7;"
  >
    <view id="check-box">
      <view class="check-tip">--- 签到成功 ---</view>

      <view class="points">获得20积分</view>
      <view class="calendar" @tap="toCheckPage">签到日历 >></view>

      <view class="check-wrap">
        <view class="left-wrap" @tap="toIntegration">
          <image src="https://www.caamyj.com/image/check-01.png" />
          <view>去积分商城逛逛～</view>
          <view> >> </view>
        </view>
        <view class="right-wrap" @tap="toUserPost">
          <image src="https://www.caamyj.com/image/check-02.png" />
          <view>继续发帖获取更多积分～</view>
          <view> >> </view>
        </view>
      </view>
    </view>
  </van-popup>
</template>

<script>
export default {
  props: {
    userCheck: Boolean
  },

  data() {
    return {}
  },

  methods: {
    onUserCheck() {
      this.$emit('onUserCheck')
    },

    toCheckPage() {
      this.$emit('toCheckPage')
    },

    toIntegration() {
      this.$emit('toIntegration')
    },

    toUserPost() {
      this.$emit('toUserPost')
    }
  }
}
</script>

<style lang="scss">
#check-box {
  background-color: #fff;
  height: auto;
  padding: 15px 20px;
  border-radius: 30px;
  color: #0a6ffb;
  text-align: center;

  .check-tip {
    font-size: 12px;
    margin-bottom: 10px;
  }

  .points {
    font-size: 24px;
    letter-spacing: 3px;
    font-weight: 500;
  }

  .calendar {
    font-weight: 400;
    font-size: 12px;
    margin: 10px auto;
  }

  .check-wrap {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 2px solid #f3f3f3;
  }

  .left-wrap,
  .right-wrap {
    text-align: center;
    font-size: 10px;
    border-right: 1px solid #f3f3f3;
    padding: 10px 5px 5px;

    image {
      width: 115px;
      height: 54px;
    }
  }

  .right-wrap {
    border: none;
  }
}
</style>
