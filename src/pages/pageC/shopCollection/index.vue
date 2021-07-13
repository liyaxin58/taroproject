<template>
  <view class="shop-collection-page">
    <PageTitle pageTitle="我的收藏" />

    <view class="shop-collection-items">
      <block v-if="shoplists">
        <view class="item" v-for="(row, index) in shoplists" :key="index">
          <view class="item-left">
            <image mode="scaleToFill" :src="row.tandian.firstImg" />

            <view class="shop-info">
              <view class="title">
                <text>{{ row.tandian.shopName }}</text>
                <van-icon size="18" color="#0A6FFB" name="star" />
              </view>
              <view class="slogan">SLOGAN</view>
              <view class="location">
                <van-icon size="12" name="location" />
                <text>{{ row.tandian.detailedAddress }}</text>
              </view>
            </view>
          </view>

          <view class="item-right" @tap="cancelCollect(row.id)">
            <image src="@/assets/shop/start.png" />
            <text>取消收藏</text>
          </view>
        </view>
      </block>

      <view v-else>
        <NullState text="快去添加自己的收藏吧~" />
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import Taro from '@tarojs/taro'
import { ShopService } from '@/service'
import NullState from '@/components/NullState'

export default {
  components: { NullState, PageTitle },

  data() {
    return {
      shoplists: null
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.findTandianCollect()
  },

  methods: {
    // 查询收藏过的探店列表
    async findTandianCollect() {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        const res = await ShopService.findTandianCollect(
          this.userInfo.id,
          1,
          1000
        )
        this.shoplists = res.rows
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    },

    // 取消收藏
    async cancelCollect(id) {
      Taro.showLoading({
        title: '加载中...'
      })

      try {
        await ShopService.delTandianCollect(id)

        Taro.showToast({
          title: '已取消~',
          icon: 'none'
        })

        this.findTandianCollect()
      } catch (err) {
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }

      Taro.hideLoading()
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.shop-collection-page {
  .shop-collection-items {
    margin: 15px 10px;

    .item {
      background: #f3f3f3;
      box-shadow: 1px 3px 5px 1px rgba(154, 154, 154, 0.5);
      border-radius: 15px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;

      .item-left {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-right: 10px;

        image {
          width: 110px;
          height: 60px;
          border-radius: 6px;
        }

        .shop-info {
          margin-left: 10px;

          .title {
            font-size: 17px;
            font-weight: 600;
            display: flex;
            align-items: center;

            text {
              padding-right: 5px;
            }
          }

          .slogan {
            color: #0a6ffb;
            font-size: 16px;
            font-weight: 900;
          }

          .location {
            font-size: 10px;
          }
        }
      }

      .item-right {
        width: 65px;
        padding: 5px 0px;
        color: #0a6ffb;
        text-align: center;
        background: rgba(244, 244, 244, 0);
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
        border-radius: 8px;

        image {
          width: 26px;
          height: 25px;
        }

        text {
          font-size: 10px;
          display: block;
        }
      }
    }
  }
}
</style>
