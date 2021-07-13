<template>
  <view class="auth-container custom-class">
    <view v-if="isSignIn" class="auth-inner" @tap.stop="onTap">
      <slot></slot>
    </view>
    <view v-else class="auth-inner">
      <slot></slot>
    </view>
    <block v-if="!isSignIn">
      <button
        class="auth-button"
        open-type="getUserInfo"
        @getuserinfo="getUserInfo"
      ></button>
    </block>
  </view>
</template>

<script>
import { mapState } from 'vuex'
import Taro from '@Tarojs/Taro'
import { isValid } from '@puckjs/utils/lib/helper'
import { PostService, UserService } from '../service'
import { JMessage } from '../utils/jmessage'

export default {
  computed: {
    ...mapState({
      isSignIn: state => isValid(state.user.userInfo.token)
    })
  },

  methods: {
    onTap() {
      this.$emit('tap')
    },

    async getUserInfo(event) {
      Taro.showLoading({
        title: '登录中'
      })

      // JMessage 实例
      let jm = null

      try {
        const { code } = await Taro.login()
        const { encryptedData, iv } = event.detail

        // 登录并缓存到本地
        const userInfo = await UserService.login(code, encryptedData, iv)
        this.$store.dispatch('updateUserInfo', userInfo)

        // 检查用户是否在极光登记信息
        const im = await PostService.findSignupJiGuangIM({
          token: userInfo.token
        })

        // 如果未注册，将用户信息推送给极光
        if (im.msg === 0) {
          // await Taro.jim.init()
          await Taro.jim.register(userInfo.id, userInfo.nickname)

          // 断开 socket
          // jm.disconnect()
        }

        // 缓存用户到 vuex
        this.$store.dispatch('updateUserInfo', userInfo)

        Taro.hideLoading()
      } catch (err) {
        // 断开 socket
        if (jm) {
          jm.disconnect()
        }

        Taro.hideLoading()
        Taro.showToast({
          title: '登录失败，请稍后重试',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.auth-container {
  position: relative;
  width: 100%;
  height: 100%;

  .auth-inner {
    z-index: 9;
  }

  .auth-button {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
