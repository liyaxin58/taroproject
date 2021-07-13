<template>
  <view class="order-lists-page">
    <PageTitle :pageTitle="title" />
    <view class="content">
      <view class="box">
        <view class="box_title">内容描述</view>
        <view class="box_text">
          <textarea
            class="text_arer"
            name=""
            id=""
            maxlength="200"
            placeholder="请填写10个字以上的问题描述以便我们提供更好的帮助"
            v-model="content"
            placeholder-style="color:#E4E4E4;"
          ></textarea>
          <view class="text_num">0/200</view>
        </view>
        <view class="box_img">
          <view class="img_title">相关截图（选填）（0/4）</view>
          <van-uploader
            :file-list="fileList"
            preview-size="70px"
            :multiple="true"
            max-count="4"
            accept="image"
            @after-read="handleSelect"
            @delete="handleRemove"
          />
        </view>
        <view class="box_ipt">
          <view>联系方式</view>
          <input
            type="text"
            placeholder="邮箱/手机号"
            placeholder-style="color:#E4E4E4;"
            v-model="contact"
          />
        </view>
        <view class="box_btn"><view @tap="btnClick">提交</view></view>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Taro from '@tarojs/taro'
import { uploadFile } from '@/utils/request'
import { UserService } from '@/service'
export default {
  components: { PageTitle },

  data() {
    return {
      title: '意见反馈',
      content: '',
      contact: '',
      fileList: [],
      isType: '',
      smallType: ''
    }
  },
  onLoad(options) {
    this.title = options.title
    this.isType = options.id
    this.smallType = options.smallType
  },
  methods: {
    async btnClick() {
      if (this.content == '') {
        return Taro.showToast({
          title: '描述信息不能为空',
          icon: 'none'
        })
      }

      if (this.contact == '') {
        return Taro.showToast({
          title: '联系方式不能为空',
          icon: 'none'
        })
      }

      const uploadPromises = this.fileList.map(file => {
        return uploadFile({
          filePath: file.url,
          name: 'file'
        })
      })

      const result = await Promise.all(uploadPromises)
      const imgUrl = result.map(r => r.url).join(', ')
      const params = {
        contact: this.contact,
        content: this.content,
        imgUrl: imgUrl,
        type: this.isType,
        smallType: this.smallType
      }

      const res = await UserService.addOpinionSuggest(params)
      Taro.showToast({
        title: '提交成功',
        icon: 'none'
      })

      Taro.navigateBack({
        delta: 1
      })
    },

    // 上传
    handleSelect(event) {
      console.log(event)
      this.fileList = [
        ...this.fileList,
        ...event.detail.file.map(r => ({
          url: r.url,
          deletable: true
        }))
      ]
      console.log(this.fileList)
    },

    // 上传
    handleRemove(event) {
      // 必须要 clone 才可以删除图片
      const fileList = clone(this.fileList)
      fileList.splice(event.detail.index, 1)
      this.fileList = fileList
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}
.content {
  padding: 25rpx;
  box-sizing: border-box;
}
.box {
  width: 100%;
  padding: 20rpx 33rpx 45rpx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 34rpx;
}
.box_title {
  width: 100%;
  padding-bottom: 10rpx;
  border-bottom: 1rpx solid #e2e2e2;
  font-size: 22rpx;
  color: #000;
}
.box_text {
  width: 100%;
  height: 223rpx;
  padding: 10rpx 0;
  box-sizing: border-box;
  border-bottom: 1rpx solid #e2e2e2;
  position: relative;
}
.text_arer {
  width: 100%;
  font-size: 22rpx;
}
.text_num {
  font-size: 22rpx;
  color: #e4e4e4;
  position: absolute;
  right: 33rpx;
  bottom: 10rpx;
}
.box_img {
  width: 100%;
  border-bottom: 1rpx solid #e2e2e2;
  padding: 10rpx 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .img_title {
    font-size: 22rpx;
    color: #000;
    margin-bottom: 20rpx;
  }
}
.box_ipt {
  width: 100%;
  height: 62rpx;
  border-bottom: 1rpx solid #e2e2e2;
  display: flex;
  align-items: center;
  view {
    font-size: 22rpx;
    color: #000;
  }
  input {
    margin-left: 15rpx;
    font-size: 18rpx;
  }
}
.box_btn {
  width: 100%;
  height: 196rpx;
  display: flex;
  justify-content: center;
  view {
    width: 350rpx;
    height: 60rpx;
    background-color: #0a6ffb;
    line-height: 60rpx;
    text-align: center;
    font-size: 24rpx;
    color: #ffffff;
    margin-top: 90rpx;
  }
}
</style>
