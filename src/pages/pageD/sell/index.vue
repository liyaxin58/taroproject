<template>
  <view class="seller-page">
    <PageTitle pageTitle="我的售卖" />

    <view class="seller-header">
      <UserListIdentity
        headimgUrl="https://s3.ax1x.com/2021/03/17/66nnld.jpg"
        nickName="CAA DAY"
        level="1"
      />

      <view class="user-works">
        <view class="left-item">
          <view class="item">
            <view>在售作品</view>
            <view>12</view>
          </view>

          <view class="item">
            <view>总售数量</view>
            <view>32</view>
          </view>

          <view class="item">
            <view>售出金额</view>
            <view>6000¥</view>
          </view>
        </view>

        <view class="right">
          <view class="add" @tap="toCashWithdrawal">我要提现</view>
          <view class="chat" @tap="toUploadMerchandise">我要售卖</view>
        </view>
      </view>
    </view>

    <view class="seller-body">
      <Tabs>
        <slot slot="nav">
          <TabNav>
            <view class="list-title">我的作品</view>
          </TabNav>
          <TabNav>
            <view class="list-title">我的义卖</view>
          </TabNav>
        </slot>

        <TabItem>
          <Product />
        </TabItem>
        <TabItem>
          <Product />
        </TabItem>
      </Tabs>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import UserListIdentity from '@/components/UserListIdentity'
import Tabs from '@/components/tabs'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import Product from './views/Product'
import Taro from '@tarojs/taro'

export default {
  components: {
    Tabs,
    TabItem,
    TabNav,
    Product,
    UserListIdentity,
    PageTitle
  },

  data() {
    return {}
  },

  methods: {
    toUploadMerchandise() {
      Taro.navigateTo({
        url: '/pages/pageB/uploadMerchandise/index'
      })
    },

    toCashWithdrawal() {
      Taro.navigateTo({
        url: '/pages/pageB/cashWithdrawal/index'
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.seller-page {
  .seller-header {
    height: auto;
    background: url('https://s3.ax1x.com/2021/03/17/66mkGQ.png');
    background-size: 100% 100%;
    padding: 10px 15px;
    margin: 20px 10px 15px;

    .user-works {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;

      .left-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;

        .item {
          text-align: center;
          margin-right: 15px;
        }
      }

      .right {
        display: flex;

        .add,
        .chat {
          padding: 5px 5px;
          height: 18px;
          line-height: 18px;
          background: #2a82fb;
          box-shadow: -1px -1px 2px 0px #8db9f6, 1px 1px 2px 0px #011a7c;
          border-radius: 4px;
          text-align: center;
          margin-left: 10px;
          font-size: 10px;
        }
      }
    }

    .UserListIdentityPage .item {
      border: none;
      padding-bottom: 10px;
      padding-top: 0;
    }

    .UserListIdentityPage .item .item-left .user-cover {
      width: 45px;
      height: 45px;
    }

    .UserListIdentityPage .item .item-left .user-card .card-middle {
      width: 48px;
      height: 15px;
      line-height: 15px;
      font-size: 10px;
      margin-top: 5px;
    }

    .UserListIdentityPage .item .item-left .user-card .card-top .name {
      color: #fff;
    }

    .UserListIdentityPage .item .item-left .user-card .card-bottom {
      display: none;
    }

    .UserListIdentityPage .item .item-left .user-card .card-top .user-grade,
    .UserListIdentityPage .item .item-right {
      display: none;
    }
  }

  .seller-body {
    margin: 0 10px;

    .Tabs_navs {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 10px;

      .list-title {
        padding: 8px 35px;
        background: #f3f3f3;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
        border-radius: 8px;
        font-size: 14px;
        text-align: center;
      }

      .TabNav_active {
        .list-title {
          color: #fff;
          background: #0a6ffb;
        }
      }
    }
  }
}
</style>
