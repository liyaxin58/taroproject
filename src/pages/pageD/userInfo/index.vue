<template>
  <view class="userInfo-page">
    <PageTitle pageTitle="个人信息" />

    <view class="from">
      <view class="item">
        <view class="item-name">头像</view>
        <view class="upload">
          <van-uploader
            preview-size="100px"
            max-count="1"
            accept="image"
            @after-read="handleSelect"
          >
            <view class="user-photo">
              <image :src="userInfo.headimgUrl" />
            </view>
          </van-uploader>
        </view>
      </view>

      <input-cell
        name="nickname"
        :value="userInfo.nickname"
        title="昵称"
        :border="false"
        placeholder="请输入昵称"
        @change="onInputChange"
      />

      <input-cell
        name="sex"
        :value="userInfo.sex"
        title="性别"
        :border="false"
        placeholder="请输入性别"
        @change="onInputChange"
      />

      <view class="submit" @tap="submitForm">保存</view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { UserService } from '@/service'
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'
import { uploadFile } from '@/utils/request'
import InputCell from '@/components/input-cell'

export default {
  components: { PageTitle, InputCell },

  data() {
    return {
      user: {}
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    async handleSelect(event) {
      const res = await uploadFile({
        name: 'file',
        filePath: event.detail.file.url
      })

      if (res) {
        this.$store.dispatch('updateUserInfo', {
          headimgUrl: res.url
        })
      }
    },

    async submitForm() {
      try {
        await UserService.wxUpUser({
          id: this.userInfo.id,
          headimgUrl: this.userInfo.headimgUrl,
          nickname: this.nickname,
          sex: this.sex
        })

        this.$store.dispatch('updateUserInfo', {
          nickname: this.nickname,
          sex: this.sex
        })

        Taro.showToast({
          title: '修改成功',
          icon: 'none'
        })

        Taro.switchTab({
          url: '/pages/user/index'
        })
      } catch (e) {
        console.log(e)
        Taro.showToast({
          title: '修改失败',
          icon: 'none'
        })
      }
    },

    onInputChange(name, value) {
      this[name] = value
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.userInfo-page {
  .from {
    color: #0a6ffb;
    margin: 15px;

    .van-field__label {
      color: #0a6ffb;
    }

    .van-cell {
      border-bottom: 1px solid #e0e0e0;
      padding: 15px 0;
      font-size: 14px;
      background-color: #f3f3f3;
    }

    .item {
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e0e0e0;
      padding: 12px 0;

      .item-name {
        flex: 1;
        font-size: 14px;
      }

      .onPreviewImage {
        width: 60px;
        height: 60px;
        background: #d8d8d8;
        border-radius: 6px;
      }

      .input {
        width: 100px;
        color: #7baff7;
      }
    }

    .user-photo image {
      width: 55px;
      height: 55px;
    }

    .submit {
      width: 270px;
      height: 38px;
      background: #0a6ffb;
      border-radius: 10px;
      font-size: 18px;
      color: #fff;
      font-weight: 400;
      text-align: center;
      line-height: 38px;
      position: absolute;
      left: calc(50% - 135px);
      bottom: 50px;
    }
  }
}
</style>
