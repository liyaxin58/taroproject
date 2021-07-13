<template>
  <view class="post-page">
    <PageTitle pageTitle="发帖" />

    <view class="post-body">
      <view class="post-type">
        <van-collapse
          :value="activeNames"
          @change="handleCollapseChange"
          :border="false"
        >
          <van-collapse-item title="选择主题" name="1">
            <Tabs @onChange="onNavChange">
              <slot slot="nav">
                <TabNav v-for="(row, index) in categories" :key="index"
                  >{{ row.name }}
                </TabNav>
              </slot>
              <TabItem v-for="(row, idx) in categories" :key="idx">
                <view class="type-items">
                  <view
                    v-for="(item, index) in row.children"
                    :key="index"
                    class="item"
                    :class="{
                      type__item__active: item.id === typeId
                    }"
                    @tap="setTypeId(item.id)"
                  >
                    {{ item.name }}
                  </view>
                </view>
              </TabItem>
            </Tabs>
          </van-collapse-item>
        </van-collapse>
      </view>

      <view class="article">
        <van-field
          name="content"
          :value="content"
          placeholder="在此处输入正文"
          :border="false"
          type="textarea"
          :autosize="true"
          @change="handleContentChange"
        />
      </view>

      <view class="article-upload">
        <van-uploader
          :file-list="fileList"
          preview-size="100px"
          :multiple="true"
          max-count="6"
          accept="image"
          @after-read="handleSelect"
          @delete="handleRemove"
        />
      </view>

      <view class="check-cell">
        <view class="check-title">私密</view>
        <van-switch :checked="checked" size="24px" @change="onChecked" />
      </view>

      <view class="submit" @tap="submitForm"> 发布</view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import { clone } from '@puckjs/utils/lib/clone'
import PageTitle from '@/components/PageTitle'
import Tabs from '@/components/tabs'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import { mapState } from 'vuex'
import { PostService } from '@/service'
import { uploadFile } from '@/utils/request'
import { isEmpty } from '@puckjs/utils/lib/helper'

export default {
  components: {
    PageTitle,
    Tabs,
    TabNav,
    TabItem
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

        Taro.switchTab({
          url: '/pages/index/index'
        })
      } catch (err) {
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
    },

    // 是否匿名
    onChecked() {
      this.checked = !this.checked
    },

    setTypeId(typeId) {
      this.typeId = typeId
    }
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.post-page {
  .post-body {
    width: 100%;
    min-height: calc(100vh - 100px);
    border-radius: 32px;
    margin-top: 20px;
    background: #fff;
    padding-bottom: 30px;
    //position: relative;

    .post-type {
      padding: 10px 0;

      .van-cell {
        border-radius: 32px;
        border: none;

        &::after {
          border: none;
        }
      }

      .Tabs_navs {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        .TabNav {
          width: 57px;
          height: 24px;
          line-height: 24px;
          color: #0a6ffb;
          background: #f4f4f4;
          box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
            -1px -1px 1px 0px rgba(255, 255, 255, 1);
          border-radius: 6px;
          font-size: 12px;
          font-weight: 400;
          text-align: center;
          margin: 10px 18px;
        }

        .TabNav_active {
          background: #0a6ffb;

          color: #fff;
        }
      }

      .Tabs_content {
        .type-items {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 164px;
          margin: 10px 0;
          padding: 20px;
          border-radius: 10px;
          background: #0a6ffb;
          box-shadow: 0px 2px 4px 0px rgba(108, 108, 108, 0.5);
        }

        .item {
          padding: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          font-size: 12px;
          font-weight: 400;
          color: #000;
          background: #ffffff;
          border-radius: 3px;

          &.type__item__active {
            background-color: #000;
            color: #fff;
          }
        }
      }
    }

    .article {
      min-height: 100px;
    }

    .article-upload {
      padding: 0 15px;
    }

    .check-cell {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #d5d5d5;
      border-bottom: 1px solid #d5d5d5;
      padding: 10px 10px 5px;
      margin: 10px;

      .check-title {
        padding-bottom: 5px;
      }
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
      margin: 50px auto 0;
    }
  }
}
</style>
