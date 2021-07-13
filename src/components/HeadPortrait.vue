<template>
  <view class="HeadPortraitPage" v-if="headimgUrl">
    <image @tap="toUserInfo" class="head-portrait-cover" :src="headimgUrl" />
    <image class="head-portrait-grade" src="~@/assets/index/grade.png" />
  </view>

  <view v-else>
    <view class="HeadPortraitPage" @tap="login">
      <image class="head-portrait-cover" src="~@/assets/tabBar/user.png" />
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'

export default {
  data() {
    return {}
  },

  computed: {
    ...mapState({
      headimgUrl: state => state.user.userInfo.headimgUrl
    })
  },

  methods: {
    toUserInfo() {
      this.$emit('toUserInfo')
    },

    async login(event) {
      Taro.navigateTo({
        url: '/pages/wxLogin/index'
      })
    }
  }
}
</script>

<style lang="scss">
.HeadPortraitPage {
  position: relative;
  margin-right: 5px;
  width: 70px;
  height: 60px;

  .head-portrait-cover {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
    background-color: #fff;
  }

  .head-portrait-grade {
    width: 27px;
    height: 13px;
    position: absolute;
    bottom: 0px;
    right: 3px;
  }
}
</style>
