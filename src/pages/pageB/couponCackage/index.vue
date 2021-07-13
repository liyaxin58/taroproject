<template>
  <view class="coupon-cackage-page">
    <PageTitle pageTitle="我的优惠券" />

    <view class="coupon-cackage-body">
      <Tabs>
        <slot slot="nav">
          <TabNav>
            <view class="list-title">店铺优惠卷</view>
          </TabNav>
          <TabNav>
            <view class="list-title">商城优惠卷</view>
          </TabNav>
        </slot>

        <TabItem>
          <CouponLists />
        </TabItem>
        <TabItem>
          <CouponLists />
        </TabItem>
      </Tabs>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import Tabs from '@/components/tabs'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import CouponLists from '@/components/CouponLists'

export default {
  components: { Tabs, TabItem, TabNav, CouponLists, PageTitle },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.coupon-cackage-page {
  .coupon-cackage-body {
    margin: 0 15px;
  }

  .Tabs_navs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0 15px;

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

  .button {
    padding: 20px 10px;
  }

  .effective-num {
    font-size: 12px;
  }

  .effective-time {
    padding-top: 10px;
  }

  .receive {
    display: none;
  }
}
</style>
