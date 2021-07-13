<template>
  <view class="my-belongings-page">
    <PageTitle pageTitle="我的物品" />

    <view class="my-belongings-box">
      <Tabs>
        <slot slot="nav">
          <TabNav>
            <view class="tab-name">校园卡</view>
          </TabNav>
          <TabNav>
            <view class="tab-name">车辆信息</view>
          </TabNav>
          <TabNav>
            <view class="tab-name">其他物品</view>
          </TabNav>
        </slot>

        <!--校园卡-->
        <TabItem>
          <view class="belongings-form">
            <view class="label">上传校园卡照片</view>
            <van-uploader
              :file-list="fileList"
              preview-size="100px"
              :multiple="true"
              max-count="6"
              accept="image"
              @after-read="handleSelect"
              @delete="handleRemove"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="姓名："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="学院："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="学号："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="ID号："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="序列号："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <view class="submit" @tap="submitForm">确定</view>
          </view>
        </TabItem>

        <!--车辆信息-->
        <TabItem>
          <view class="belongings-form">
            <view class="label">上传车辆照片</view>
            <van-uploader
              :file-list="fileList"
              preview-size="100px"
              :multiple="true"
              max-count="6"
              accept="image"
              @after-read="handleSelect"
              @delete="handleRemove"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="车牌："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="颜色："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="车辆信息描述："
              :border="false"
              title-width="100px"
              input-align="left"
              placeholder="请输入"
              type="textarea"
              autosize="true"
              @change="onInputChange"
              custom-style="flex-direction: column;"
            />

            <view class="submit" @tap="submitForm">确定</view>
          </view>
        </TabItem>

        <!--其他物品-->
        <TabItem>
          <view class="belongings-form">
            <view class="label">上传物品照片</view>
            <van-uploader
              :file-list="fileList"
              preview-size="100px"
              :multiple="true"
              max-count="6"
              accept="image"
              @after-read="handleSelect"
              @delete="handleRemove"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="种类："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="颜色："
              :border="false"
              title-width="60px"
              input-align="left"
              placeholder="请输入"
              @change="onInputChange"
            />

            <input-cell
              name="nickname"
              :value="userInfo.nickname"
              title="物品信息描述："
              :border="false"
              title-width="100px"
              input-align="left"
              placeholder="请输入物品信息描述"
              type="textarea"
              autosize="true"
              @change="onInputChange"
              custom-style="flex-direction: column;"
            />

            <view class="submit" @tap="submitForm">确定</view>
          </view>
        </TabItem>
      </Tabs>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import Tabs from '@/components/tabs'
import Taro from '@tarojs/taro'
import { clone } from '@puckjs/utils/lib/clone'
import { mapState } from 'vuex'
import { PostService } from '@/service'
import InputCell from '@/components/input-cell'
import { uploadFile } from '@/utils/request'
import { isEmpty } from '@puckjs/utils/lib/helper'

export default {
  components: { PageTitle, InputCell, TabNav, TabItem, Tabs },

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
  background-color: #f3f3f3;
}

.my-belongings-page {
  .my-belongings-box {
    margin: 30px 0;

    .Tabs_navs {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .TabNav {
        padding: 8px 25px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f4f4f4;
        box-shadow: 0px 2px 4px 0px rgba(168, 168, 168, 0.5);

        .tab-name {
          font-size: 12px;
          padding-top: 2px;
        }
      }

      .TabNav_active {
        background: #0a6ffb;

        .tab-name {
          color: #fff;
        }
      }
    }

    .Tabs_content {
      background: #ffff;
      border-radius: 14px;
      margin: 20px 10px 30px;
      padding: 5px 15px;
    }

    .van-field__control {
      background-color: #f3f3f3;
      height: 25px;
      padding-left: 10px;
    }

    .van-field__control--textarea {
      min-height: 50px !important;
      padding: 10px;
    }

    .belongings-form {
      .label {
        text-align: center;
        color: #656565;
        margin: 5px 0;
        font-size: 13px;
      }

      .submit {
        width: 90px;
        height: 30px;
        border-radius: 5px;
        border: 1px solid #0a6ffb;
        font-size: 14px;
        color: #0a6ffb;
        font-weight: 400;
        text-align: center;
        line-height: 30px;
        margin: 20px;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
