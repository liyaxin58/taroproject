<template>
  <TabBarLayout select-tab="user">
    <view class="user-page">
      <view class="user">
        <!--页面标题-->
        <view class="page-title">个人中心</view>
        <Authorize>
          <view class="user-info">
            <view class="info-left">
              <HeadPortrait @toUserInfo="toUserInfo" />
              <IdentityPage @toFansLink="toFans" :ismy="1" @toConcernLink="toConcern" />
            </view>
            <image
              @tap="toCheck"
              class="info-right"
              src="~@/assets/user/check.png"
            />
          </view>

          <view class="statistics-lists">
            <view class="list" @tap="toIntegration">
              <view>积分</view>
              <view>{{ userInfo.integral || '0' }}</view>
            </view>
            <view class="list" @tap="toPost">
              <view>帖子</view>
              <view>{{ userInfo.postNum || '0' }}</view>
            </view>
            <view class="list" @tap="toLike">
              <view>点赞</view>
              <view>{{ userInfo.commendNum || '0' }}</view>
            </view>
            <view class="list" @tap="toComment">
              <view>评论</view>
              <view>{{ userInfo.reviewNum || '0' }}</view>
            </view>
          </view>
        </Authorize>
      </view>

      <Authorize>
        <view class="tab-list">
          <view class="item welfare" @tap="toWelfare">
            <image class="tab-cover" src="~@/assets/user/tab1.png" />
            <text class="tab-name">美院福利</text>
          </view>
          <view class="item integration" @tap="toIntegrationMall">
            <image class="tab-cover" src="~@/assets/user/tab2.png" />
            <text class="tab-name">积分兑换</text>
          </view>
          <view class="item order" @tap="toOrders">
            <image class="tab-cover" src="~@/assets/user/tab3.png" />
            <text class="tab-name">我的订单</text>
          </view>
          <view class="item sell" @tap="toSell">
            <image class="tab-cover" src="~@/assets/user/tab4.png" />
            <text class="tab-name">我要售卖</text>
          </view>
        </view>
      </Authorize>

      <Swiper />

      <Authorize>
        <view class="cell-items">
          <UserCell
            cellName="黑名单"
            iconUrl="https://s3.ax1x.com/2021/02/01/yZp3GR.png"
            @onTap="blacklist"
          />
          <UserCell
            cellName="我的消息"
            iconUrl="https://s3.ax1x.com/2021/02/01/yZpQIJ.png"
            @onTap="message"
          />
          <UserCell
            cellName="我的物品"
            iconUrl="https://s3.ax1x.com/2021/02/01/yZpMa4.png"
            @onTap="belongings"
          />
        </view>
      </Authorize>

      <Authorize>
        <view class="cell-items">
          <UserCell
            cellName="身份认证"
            iconUrl="https://s3.ax1x.com/2021/02/01/yZp1i9.png"
            @onTap="identity"
          />
          <!--          <UserCell-->
          <!--            cellName="联系我们"-->
          <!--            iconUrl="https://s3.ax1x.com/2021/02/01/yZpKZF.png"-->
          <!--            @onTap="contact"-->
          <!--          />-->
          <UserCell
            cellName="意见和建议"
            iconUrl="https://s3.ax1x.com/2021/02/01/yZp8R1.png"
            @onTap="opinion"
          />
        </view>
      </Authorize>
      <view style="height:80px;"></view>
      <CheckPopup
        :userCheck="userCheck"
        @toCheckPage="toCheckPage"
        @onUserCheck="onUserCheck"
        @toIntegration="toIntegration"
        @toUserPost="toPost"
      />
    </view>
  </TabBarLayout>
</template>

<script>
import TabBarLayout from '@/components/TabBarLayout'
import HeadPortrait from '@/components/HeadPortrait'
import IdentityPage from '@/components/Identity'
import Swiper from './views/Swiper'
import UserCell from './views/UserCell'
import { customTabBar } from '@/mixins'
import Taro from '@tarojs/taro'
import { mapState } from 'vuex'
import CheckPopup from '@/components/CheckPopup'
import { UserService } from '../../service'
import Authorize from '../../components/Authorize'

export default {
  components: {
    Authorize,
    CheckPopup,
    TabBarLayout,
    HeadPortrait,
    IdentityPage,
    Swiper,
    UserCell
  },

  mixins: [customTabBar],

  data() {
    return {
      userCheck: false
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  methods: {
    // 个人信息
    toUserInfo() {
      Taro.navigateTo({
        url: '/pages/pageD/userInfo/index'
      })
    },

    // 我的粉丝
    toFans() {
      Taro.navigateTo({
        url: '/pages/pageD/fans/index'
      })
    },

    // 我的关注
    toConcern() {
      Taro.navigateTo({
        url: '/pages/pageD/myConcern/index'
      })
    },

    // 签到日历
    toCheckPage() {
      Taro.navigateTo({
        url: '/pages/pageD/checkCalendar/index'
      })
    },

    // 去签到
    async toCheck() {
      try {
        const res = await UserService.getToDay(this.userInfo.id)

        if (res.status === 0) {
          Taro.showToast({
            title: '今天签过啦~',
            icon: 'none'
          })
        } else {
          await UserService.addSignIn(this.userInfo.id)
          this.userCheck = true
        }
      } catch (e) {
        Taro.showToast({
          title: '签到失败',
          icon: 'none'
        })
      }

      const res1 = await UserService.getToDay(this.userInfo.id)
      console.log('getToDay', res1)

      const res2 = await UserService.findSignInList(this.userInfo.id)
      console.log('findSignInList', res2)
    },

    onUserCheck() {
      this.userCheck = false
    },

    // 积分
    toIntegration() {
      Taro.navigateTo({
        url: '/pages/pageD/myIntegration/index'
      })
    },

    // 我的帖子
    toPost() {
      Taro.navigateTo({
        url: '/pages/pageD/myPost/index'
      })
    },

    // 我的点赞
    toLike() {
      Taro.navigateTo({
        url: '/pages/pageD/like/index'
      })
    },

    // 我的评论
    toComment() {
      Taro.navigateTo({
        url: '/pages/pageD/comment/index'
      })
    },

    // 美院福利
    toWelfare() {
      Taro.navigateTo({
        url: '/pages/pageD/welfare/index'
      })
    },

    // 积分兑换
    toIntegrationMall() {
      Taro.switchTab({
        url: '/pages/mall/index'
      })
    },

    // 我的订单
    toOrders() {
      Taro.navigateTo({
        url: '/pages/pageD/orderLists/index'
      })
    },

    // 我要售卖
    toSell() {
      Taro.navigateTo({
        url: '/pages/pageD/sell/index'
      })
    },

    // 黑名单
    blacklist() {
      Taro.navigateTo({
        url: '/pages/pageD/blacklist/index'
      })
    },

    // 我的消息
    message() {
      Taro.navigateTo({
        url: '/pages/pageD/message/index'
      })
    },

    // 我的物品
    belongings() {
      Taro.navigateTo({
        url: '/pages/pageD/newIndex/index'
      })
    },

    // 身份认证
    identity() {
      Taro.navigateTo({
        url: '/pages/identity/index'
      })
    },

    // 联系我们
    contact() {
      Taro.navigateTo({
        url: '/pages/pageD/contact/index'
      })
    },

    // 帮助中心
    opinion() {
      Taro.navigateTo({
        url: '/pages/pageD/opinion/index'
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.user-page {
  .user {
    width: 100%;
    height: 230px;
    background: url('../../assets/user/user-bg.png');
    background-size: 100% 100%;

    .page-title {
      font-size: 20px;
      font-weight: 400;
      color: #fff;
      text-align: center;
      padding-top: 50px;
    }
  }

  .user-info {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 10px 15px 0px;

    .info-left {
      width: 90%;
      display: flex;
      align-items: center;
    }

    .info-right {
      flex: 1;
      width: 27px;
      height: 30px;
      padding-top: 20px;
    }

    .IdentityPage {
      .user-name {
        color: #fff;
      }

      .time {
        display: none;
      }

      .body-integration {
        display: none;
      }
    }
  }

  .statistics-lists {
    padding: 5px 15px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .list {
      text-align: center;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
    }
  }

  .tab-list {
    width: 100%;
    margin: -10px 0px 10px 0px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .item {
      background-color: #ffab2f;
      width: 170px;
      height: 83px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;

      // 左侧商品
      &:nth-of-type(odd) {
        margin-right: 5px;
      }

      //// 右侧
      //&:nth-of-type(even) {
      //  padding-left: 3px;
      //}
      //

      .tab-cover {
        width: 54px;
        height: 56px;
        padding-right: 10px;
      }

      .tab-name {
        font-weight: 600;
        font-size: 12px;
        color: #fff;
      }
    }

    // 积分
    .integration {
      background-color: #e4632b;

      .tab-cover {
        width: 63px;
        height: 54px;
      }
    }

    // 订单
    .order {
      background-color: #36cd77;

      .tab-cover {
        width: 55px;
        height: 67px;
      }
    }

    // 我要售卖
    .sell {
      background-color: #a86aed;

      .tab-cover {
        width: 67px;
        height: 67px;
      }
    }
  }

  .cell-items {
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(219, 219, 219, 0.5);
    border-radius: 16px;
    margin: 15px;
    padding: 10px 0;

    .item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f7f7f7;
      margin: 0 20px;

      .cell-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .cell-cover {
          width: 18px;
          height: 18px;
          margin-right: 12px;
        }

        .cell-name {
          font-size: 13px;
          font-weight: 400;
          color: #383838;
        }
      }

      .cell-right {
        width: 11px;
        height: 19px;
      }
    }
  }
}
</style>
