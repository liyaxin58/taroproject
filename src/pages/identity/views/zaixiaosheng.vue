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
      <van-field value="" title-width="50px" required clearable label="性别:" />
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label=" 生日:"
      />
      <van-field value="" title-width="50px" required clearable label="学院:" />
      <van-field value="" title-width="50px" required clearable label="专业:" />
      <van-field
        value=""
        title-width="50px"
        center
        clearable
        label="手机:"
        use-button-slot
      >
        <van-button slot="button" size="small" type="primary">
          发送验证码
        </van-button>
      </van-field>
      <van-field
        value=""
        title-width="50px"
        required
        clearable
        label="验证码:"
      />

      <view class="upload">
        <view class="upload-title">上传学生证明</view>
        <view class="tip"
          >（请上传带有个人信息的校园卡、学生证或学习证明）</view
        >
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="2"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
        <view class="tip"
          >注意：身份验证需要后台审核，约在一个工作日内完成，请耐心等待。</view
        >
      </view>
    </view>

    <view class="submit"> 确认 </view>
  </view>
</template>

<script>
import { clone } from '@puckjs/utils/lib/clone'

export default {
  data() {
    return {
      fileList: []
    }
  },

  methods: {
    handleFieldChange(name, event) {
      console.log(name, event)
    },

    handleSelect(name, event) {
      this.fileList = [
        ...this.fileList,
        ...event.detail.file.map(r => ({
          url: r.url,
          deletable: true
        }))
      ]
    },

    handleRemove(name, event) {
      // 必须要 clone 才可以删除图片
      const fileList = clone(this.fileList)
      fileList.splice(event.detail.index, 1)

      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss" module></style>
