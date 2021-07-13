<template>
  <view class="xiaoyou">
    <view class="form">
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="姓名:"
        @change="handleFieldChange('name', $event)"
      />
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="性别:"
        @change="handleFieldChange('sex', $event)"
      />
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="生日:"
        @change="handleFieldChange('birthday', $event)"
      />
      <van-field
        value=""
        title-width="50px"
        center
        clearable
        label="手机:"
        use-button-slot
        @change="handleFieldChange('phone', $event)"
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @tap="handleSendCode"
        >
          发送验证码
        </van-button>
      </van-field>
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="验证码:"
        @change="handleFieldChange('code', $event)"
      />
    </view>

    <view class="submit" @tap="handleSubmit"> 确认</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { validate } from '@/utils/validate'
import { UserService } from '@/service'
import formMixin from './form-mixin'

const VALIDATOR_RULES = {
  name: {
    required: true,
    message: '请输入姓名'
  },
  sex: {
    required: true,
    message: '请选择性别'
  },
  birthday: {
    required: true,
    type: 'date',
    message: '请输入生日'
  },
  phone: {
    required: true,
    type: 'phone',
    message: '请输入有效的手机号'
  },
  code: {
    required: true,
    type: 'number',
    message: '请输入有效的验证码'
  }
}

export default {
  mixins: [formMixin],

  data() {
    return {
      name: null,
      sex: null,
      birthday: null,
      phone: null,
      code: null
    }
  },

  methods: {
    async handleSubmit() {
      Taro.showLoading({
        title: '提交中'
      })

      try {
        const data = validate(VALIDATOR_RULES, this)
        await UserService.insertWxRoleReview({
          ...data,
          studentOrAlumni: 4,
          userId: this.userInfo.id
        })
        Taro.showToast({
          title: '提交成功，请等待审核',
          icon: 'none'
        })
      } catch (err) {
        console.error(err)
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss" module></style>
