<template>
  <view class="checkCalendar-page">
    <PageTitle pageTitle="签到日历" />

    <!--统计数值-->
    <view class="check-statistics-box">
      <view class="left">
        <view class="name">我的积分</view>
        <view class="value">{{ userInfo.integral }}</view>
      </view>

      <view class="right">
        <view class="right-text">
          <view
            >本月签到 <text>{{ userCheckInfo.thisMonthNum }}</text> 次
          </view>
          <view
            >获得积分 <text>{{ userCheckInfo.thisMonthIntegral }}</text></view
          >
        </view>

        <view class="right-text">
          <view
            >上月签到 <text>{{ userCheckInfo.lastMonthNum }}</text> 次</view
          >
          <view
            >获得积分 <text>{{ userCheckInfo.lastMonthIntegral }}</text></view
          >
        </view>
      </view>
    </view>

    <view class="checkCalendar-body">
      <view>
        <van-calendar
          title="日历"
          :poppable="false"
          :show-confirm="false"
          :show-title="false"
          row-height="50"
          color="#0A6FFB"
        />
      </view>

      <!--<view class="day">连续签到0天</view>-->
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { UserService } from '@/service'
import { mapState } from 'vuex'

export default {
  components: { PageTitle },

  data() {
    return {
      userCheckInfo: {}
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.getCheck()
  },

  methods: {
    async getCheck() {
      const res = await UserService.findSignInList(this.userInfo.id)
      this.userCheckInfo = res
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.checkCalendar-page {
  .check-statistics-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 50px 20px 0px;

    .left {
      .name {
        font-size: 16px;
        font-weight: 400;
        color: #545454;
      }

      .value {
        font-size: 28px;
        font-weight: 500;
        color: #0a6ffb;
      }
    }

    .right {
      font-size: 12px;
      font-weight: 400;

      .right-text {
        display: flex;
        align-items: center;
        margin-top: 5px;
      }

      text {
        color: #0a6ffb;
      }
    }
  }

  .checkCalendar-body {
    background: #fff;
    border-radius: 23px;
    margin: 10px 15px 20px;
    padding: 10px 15px;

    .day {
      text-align: center;
      font-weight: 500;
      color: #0a6ffb;
      margin: 10px;
    }
  }

  .van-calendar__header {
    box-shadow: none;
  }

  .van-calendar {
    height: 340px;
  }
}
</style>
