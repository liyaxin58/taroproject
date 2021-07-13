<template>
  <view class="welfare-page">
    <PageTitle pageTitle="美院福利" />

    <view class="welfare-header">
      <view class="welfare-user-items">
        <UserListIdentity
          headimgUrl="https://s3.ax1x.com/2021/03/17/66nnld.jpg"
          nickName="CAA DAY"
          level="1"
          class="welfare-card-left"
        />

        <view class="welfare-card-right">
          <view class="welfare-card-no">NO.1234567</view>
          <view class="welfare-card-name">吃货卡</view>
        </view>
      </view>

      <view class="coupon-items">
        <view class="item" @tap="toCouponCackage"> 我的优惠券 </view>

        <view class="item"> 优惠规则 </view>
      </view>
    </view>

    <Swiper />

    <view class="welfare-body">
      <view class="title">优惠券</view>
      <view class="welfare-lists">
        <Tabs>
          <slot slot="nav">
            <TabNav>
              <view class="list-title">美食</view>
            </TabNav>
            <TabNav>
              <view class="list-title">饮品</view>
            </TabNav>
            <TabNav>
              <view class="list-title">好物</view>
            </TabNav>
          </slot>

          <TabItem>
            <CouponLists />
          </TabItem>
          <TabItem>
            <CouponLists />
          </TabItem>
          <TabItem>
            <CouponLists />
          </TabItem>
        </Tabs>
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import UserListIdentity from '@/components/UserListIdentity'
import Swiper from '@/components/Swiper'
import Tabs from '@/components/tabs'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import CouponLists from '@/components/CouponLists'
import Taro from '@tarojs/taro'

export default {
  components: {
    Tabs,
    TabItem,
    TabNav,
    CouponLists,
    Swiper,
    UserListIdentity,
    PageTitle
  },

  data() {
    return {}
  },

  methods: {
    toCouponCackage() {
      Taro.navigateTo({
        url: '/pages/pageB/couponCackage/index'
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.welfare-page {
  .welfare-header {
    height: auto;
    background: url('https://s3.ax1x.com/2021/03/17/66TRxI.png');
    background-size: 100% 100%;
    padding: 15px 15px 10px;
    margin: 20px 10px 15px;

    .welfare-user-items {
      display: flex;
      justify-content: space-between;

      .welfare-card-left {
        width: 90%;
      }

      .welfare-card-right {
        color: #fff;

        .welfare-card-no {
          font-size: 10px;
        }

        .welfare-card-name {
          padding-top: 10px;
          font-size: 14px;
          text-align: center;
        }
      }
    }

    .coupon-items {
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: #fff;

      .item {
        font-size: 12px;
        padding-top: 15px;
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
      margin: 10px 0 0;
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

  .public-swiper {
    swiper {
      height: 138px;
    }
  }

  .welfare-body {
    margin: 0 10px;

    .title {
      font-size: 16px;
      font-weight: 500;
      margin: 10px 0 5px;
      color: #0a6ffb;
    }

    .welfare-lists {
      margin: 10px 0;

      .Tabs_navs {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .list-title {
          width: 90px;
          padding: 8px 0;
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
}
</style>
