<template>
  <view class="cash-withdrawal-page">
    <PageTitle pageTitle="我要提现" />

    <view class="upload-form">
      <view class="withdrawal">
        可提现余额：10000000000
        <text @tap="toRecord">纪录</text>
      </view>

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="姓名："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="账户："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="提现金额："
        :border="false"
        title-width="70px"
        input-align="left"
        placeholder="请输入"
        @change="onInputChange"
      />
      <view class="cue">3个工作日内到账</view>
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
      categories: [],
      // x小类id
      typeId: null,
      // 文章内容
      content: null,
      // 上传的文件列表
      fileList: [],
      // 是否匿名
      checked: true
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {},

  methods: {
    toRecord() {
      Taro.navigateTo({
        url: '/pages/pageD/myWithdrawalRecord/index'
      })
    },

    // 提现
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
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.cash-withdrawal-page {
  .upload-form {
    color: #0a6ffb;
    margin: 20px 10px;
    padding: 30px 15px;
    border-radius: 13px;
    box-shadow: 2px 2px 4px 0px rgba(153, 153, 153, 0.5);

    .withdrawal {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      color: #000;
      margin-bottom: 10px;

      text {
        color: #2b82f9;
      }
    }

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

    .cue {
      text-align: center;
      font-size: 10px;
      color: #bfbfbf;
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
