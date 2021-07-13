<template>
  <view class="my-withdrawal-record-page">
    <PageTitle pageTitle="提现记录" />

    <view class="withdrawal-record-box">
      <Tabs>
        <slot slot="nav">
          <TabNav>
            <view class="tab-name">待审核</view>
          </TabNav>
          <TabNav>
            <view class="tab-name">已审核</view>
          </TabNav>
          <TabNav>
            <view class="tab-name">驳回</view>
          </TabNav>
        </slot>

        <!--待审核-->
        <TabItem>
          <view class="withdrawal-record-items">
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
          </view>
        </TabItem>

        <!--已审核-->
        <TabItem>
          <view class="withdrawal-record-items">
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
          </view>
        </TabItem>

        <!--驳回-->
        <TabItem>
          <view class="withdrawal-record-items">
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
            <view class="item">
              <view class="left">
                <view class="item-time">2020-11-14 16:34:20</view>
                <view class="item-title">余额：20</view>
              </view>
              <view class="right">+100000</view>
            </view>
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
import { ShopService } from '../../../service'

export default {
  components: { PageTitle, TabNav, TabItem, Tabs },

  data() {
    return {}
  },

  mounted() {
    this.getIntegralConfigList()
  },

  methods: {
    async getIntegralConfigList() {
      const res = await ShopService.findIntegralConfigList(1, 100)
      console.log('res', res)
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.my-withdrawal-record-page {
  .withdrawal-record-box {
    margin: 30px 0;

    .Tabs_navs {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .TabNav {
        padding: 5px 20px;

        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f4f4f4;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);

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

      // 积分
      .withdrawal-record-items {
        .item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #eee;
          padding: 10px 0;
          margin-bottom: 5px;

          &:last-child {
            border: none;
          }

          .left {
            width: 70%;
            padding: 0 10px;

            .item-title {
              font-size: 12px;
              font-weight: 400;
              padding-top: 5px;
            }

            .item-time {
              font-size: 14px;
              padding-top: 8px;
            }
          }

          .right {
            flex: 1;
            color: #0a6ffb;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
