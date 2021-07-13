<template>
  <view class="upload-merchandise-page">
    <PageTitle pageTitle="上传商品" />

    <view class="upload-form">
      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作品名称："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作者："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作品种类："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作品尺寸："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作品材质："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="作品定价："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="联系方式："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="所属模块："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <view class="article-upload">
        <view class="title">上传照片:</view>
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="6"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
        <view class="cue"
          >约在一个工作日内处理完成，不合规的作品将不予上架</view
        >
      </view>
      <view class="submit" @tap="submitForm">确定</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { clone } from '@puckjs/utils/lib/clone'
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import { PostService } from '@/service'
import InputCell from '@/components/input-cell'
import { uploadFile } from '@/utils/request'
import { isEmpty } from '@puckjs/utils/lib/helper'

export default {
  components: {
    PageTitle,
    InputCell
  },

  data() {
    return {
      activeNames: null,
      // 上传的文件列表
      fileList: []
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.getCategories()
  },

  methods: {
    async getCategories() {
      const { rows } = await PostService.findBigPostType(this.userInfo.token)
      this.categories = rows
      this.onNavChange(0)
    },

    onNavChange(rowIdx) {
      this.typeId = this.categories[rowIdx].children[0].id
    },

    // 发帖
    async submitForm() {
      const uploadPromises = this.fileList.map(file => {
        return uploadFile({
          filePath: file.url,
          name: 'file'
        })
      })

      if (isEmpty(this.typeId)) {
        return Taro.showToast({
          title: '请选择发帖主题',
          icon: 'none'
        })
      }

      try {
        // 上传所有图片
        const result = await Promise.all(uploadPromises)
        const imgUrl = result.map(r => r.url).join(', ')

        // 发帖
        const res = await PostService.addPost({
          anonymous: Number(!this.checked),
          userId: this.userInfo.id,
          createName: this.checked ? '' : this.userInfo.nickname,
          typeId: this.typeId,
          content: this.content,
          imgUrl
        })
        console.log('PostService', res)

        Taro.switchTab({
          url: '/pages/index/index'
        })
      } catch (err) {
        console.error(err)
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }
    },

    handleCollapseChange(event) {
      this.activeNames = event.detail
    },

    handleContentChange(event) {
      this.content = event.detail
    },

    handleSelect(event) {
      this.fileList = [
        ...this.fileList,
        ...event.detail.file.map(r => ({
          url: r.url,
          deletable: true
        }))
      ]
    },

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
  background: #f3f3f3;
}

.upload-merchandise-page {
  .upload-form {
    color: #0a6ffb;
    margin: 20px 10px;
    padding: 15px;
    border-radius: 13px;
    box-shadow: 2px 2px 4px 0px rgba(153, 153, 153, 0.5);

    .van-cell {
      padding: 15px 0;
      font-size: 14px;
      background-color: #f3f3f3;
    }

    .van-field__label {
      color: #000;
      font-weight: 400;
    }

    .van-field__control {
      background-color: #fff;
      height: 30px;
      border-radius: 5px;
      padding-left: 10px;
    }

    .article-upload {
      margin-top: 8px;

      .title {
        text-align: center;
        font-size: 13px;
        color: #000;
        margin-bottom: 20px;
      }

      .cue {
        text-align: center;
        font-size: 10px;
        color: #bfbfbf;
      }
    }

    .submit {
      width: 270px;
      height: 38px;
      background: #f4f4f4;
      border-radius: 10px;
      font-size: 18px;
      color: #0a6ffb;
      font-weight: 400;
      text-align: center;
      line-height: 38px;
      margin: 20px auto;
      box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
        -1px -1px 1px 0px rgba(255, 255, 255, 1);
    }
  }
}
</style>
