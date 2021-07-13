import isMobilePhone from 'validator/es/lib/isMobilePhone'
import Taro from '@tarojs/taro'
import { UserService } from '@/service'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    async handleSendCode() {
      if (!isMobilePhone(String(this.phone), 'zh-CN')) {
        return Taro.showToast({
          title: '请输入有效的手机号',
          icon: 'none'
        })
      }

      Taro.showLoading({
        title: '发送中'
      })

      try {
        const result = await UserService.wxRoleReviewCode(this.phone)
        Taro.showToast({
          title: result,
          icon: 'none'
        })
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }
    },

    handleUploadChange(fileList) {
      this.fileList = fileList
    },

    handleFieldChange(name, event) {
      this[name] = event.detail
    }
  }
}
