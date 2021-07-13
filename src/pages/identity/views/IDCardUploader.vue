<template>
  <view class="IDCardUploader">
    <van-uploader
      :file-list="fileList1"
      preview-size="100px"
      max-count="1"
      accept="image"
      @after-read="handleSelect('fileList1', $event)"
      @delete="handleRemove('fileList1', $event)"
    >
      <view class="IDCardUploader_icon">+</view>
    </van-uploader>
    <van-uploader
      :file-list="fileList2"
      preview-size="100px"
      max-count="1"
      accept="image"
      @after-read="handleSelect('fileList2', $event)"
      @delete="handleRemove('fileList2', $event)"
    >
      <view class="IDCardUploader_icon">+</view>
    </van-uploader>
  </view>
</template>

<script>
import { isValidArray } from '@puckjs/utils/lib/helper'
import Taro from '@tarojs/taro'
export default {
  data() {
    return {
      fileList1: null,
      fileList2: null
    }
  },

  methods: {
    handleSelect(name, event) {
      console.log(name,event)
      this[name] = [
        {
          url: event.detail.file.url,
          deletable: true
        }
      ]
      this.handleCallback()
    },

    handleRemove(name) {
      this[name] = []
      this.handleCallback()
    },

    handleCallback() {
      this.$emit('change', [
        isValidArray(this.fileList1) ? this.fileList1[0].url : undefined,
        isValidArray(this.fileList2) ? this.fileList2[0].url : undefined
      ])
    }
  }
}
</script>

<style lang="scss">
.IDCardUploader {
  display: flex;

  van-uploader {
    width: 50%;
    height: 100px;
    text-align: center;

    .van-uploader {
      display: block;
      background: #fff;
      border-radius: 10px;
    }

    .van-uploader__preview {
      margin: 0;
    }

    .van-uploader__preview,
    .van-uploader__preview-image {
      width: 100% !important;
    }

    .van-uploader__slot {
      width: 100%;
    }

    &:nth-of-type(1) {
      .van-uploader {
        margin-right: 5%;
      }
    }

    &:nth-last-of-type(1) {
      .van-uploader {
        margin-left: 5%;
      }
    }
  }

  .IDCardUploader_icon {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    font-size: 30px;
    color: #adadad;
  }
}
</style>
