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
        label=" 生日:"
        @change="handleFieldChange('birthday', $event)"
      />
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="画室:"
        @change="handleFieldChange('profession', $event)"
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

      <view class="upload">
        <view class="upload-title">上传学生证明</view>
        <view class="tip"
          >（请上传带有个人信息的校园卡、学生证或学习证明）
        </view>
        <IDCardUploader @change="handleUploadChange" />
        <view class="tip"
          >注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。
        </view>
      </view>
    </view>

    <view class="submit" @tap="handleSubmit"> 确认</view>
  </view>
</template>

<script>
import { validate } from '@/utils/validate'
import IDCardUploader from './IDCardUploader'
import formMixin from './form-mixin'
import Taro from '@tarojs/taro'
import { uploadFile } from '@/utils/request'
import { UserService } from '../../../service'

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
  profession: {
    required: true,
    message: '请输入画室'
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
  },
  fileList: {
    required: true,
    type: 'array',
    min: 2,
    max: 2,
    message: '请上传有效证件'
  }
}

export default {
  components: {
    IDCardUploader
  },

  mixins: [formMixin],

  data() {
    return {
      name: null,
      sex: null,
      birthday: null,
      profession: null,
      phone: null,
      code: null,
      fileList: []
    }
  },

  methods: {
    async handleSubmit() {
      Taro.showLoading({
        title: '提交中'
      })

      try {
        const data = validate(VALIDATOR_RULES, this)
        const uploadPromises = this.fileList.map(filePath => {
          return uploadFile({
            filePath,
            name: 'file'
          })
        })

        // 上传所有图片
        const result = await Promise.all(uploadPromises)

        await UserService.insertWxRoleReview({
          ...data,
          studentImg: result[0].url,
          studentBackImg: result[1].url,
          studentOrAlumni: 2,
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
