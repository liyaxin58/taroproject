<template>
  <view class="wxLogin-page">
    <image src="~@/assets/logo.png" />
    <button
      class="loginButton"
      @getuserinfo="login"
      open-type="getUserInfo"
      type="primary"
    >
      微信登录
    </button>
  </view>
</template>

<script>
import { PostService, UserService } from '../../service'
import taro from '@tarojs/taro'
import { JMessage } from '../../utils/jmessage'

export default {
  methods: {
    async login(event) {
      taro.showLoading({
        title: '登录中'
      })

      // JMessage 实例
      let jm = null

      try {
        const { code } = await taro.login()
        const { encryptedData, iv } = event.detail

        // 登录并缓存到本地
        const userInfo = await UserService.login(code, encryptedData, iv)
        this.$store.dispatch('updateUserInfo', userInfo)

        /**
         * 检查用户是否在极光登记信息
         * 如果未注册，将用户信息推送给极光
         */
        const jiGuangUser = await PostService.findSignupJiGuangIM()
        if (jiGuangUser.msg === 0) {
          jm = new JMessage(true)
          await jm.init()
          await jm.register(userInfo.id, userInfo.nickname)

          // 断开 socket
          jm.disconnect()
        }

        taro.hideLoading()

        taro.switchTab({
          url: '/pages/index/index'
        })
      } catch (err) {
        console.error(err)

        // 清空缓存信息
        taro.clearStorageSync()

        // 如果 jm 不为空，也就是 register 报错的时候， 断开 socket
        if (jm) {
          jm.disconnect()
        }

        taro.hideLoading()
        taro.showToast({
          title: '登录失败，请稍后重试',
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss">
.wxLogin-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-bottom: 40px;
    border: 1px solid #000;
    padding: 5px;
  }

  button {
    width: 50%;
    border-radius: 5px;
    margin-bottom: 60px;
  }
}
</style>
