<template>
  <view class="IdentityPage">
    <view class="header-identity">
      <view class="user-name" v-if="userInfo.nickname">
        {{ userInfo.nickname }}
      </view>
      <view class="user-name" v-else>未登录</view>
      <view v-if="ismy == 1" class="user_xbimg">
        <image
          v-if="sex === 1"
          class="usergrade1"
          src="https://www.caamyj.com/image/my_wcv.png"
        />
        <image v-else class="usergrade1" src="https://www.caamyj.com/image/my_xvn.png" />
      </view>
      <view v-else class="user_xbimg">
        <image
          v-if="sex === 1"
          class="user-grade"
          src="~@/assets/index/sex1.png"
        />
        <image v-else class="user-grade" src="~@/assets/index/sex0.png" />
      </view>
      <!--0-男 1-女-->
    </view>

    <view class="body-integration">
      <view class="left">
        <image class="left-icon" src="~@/assets/index/integration.png" />
        <view class="left-name">积分</view>
      </view>
      <view class="right">{{ userInfo.integral || '0' }}</view>
    </view>

    <view class="body-identity">
      <view class="user-identity">{{ statusText || '暂无标识' }}</view>
      <view class="time">30分钟前</view>
    </view>

    <view class="body-fans">
      <view class="fans" @tap="toFansLists"
        >粉丝 {{ userInfo.attentionNum || '0' }}</view
      >
      <view class="attract" @tap="toMyConcern"
        >关注 {{ userInfo.funsNum || '0' }}</view
      >
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex'

const statusMaps = {
  0: '在校生',
  1: '校友',
  2: '艺考生',
  // 3: '升级游客',
  4: '普通游客'
}

export default {
  props: ['ismy'],
  data() {
    return {
      statusMaps
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      sex: state => state.user.userInfo.sex
    }),

    statusText() {
      return this.statusMaps[this.userInfo.level]
    }
  },

  methods: {
    toFansLists() {
      this.$emit('toFansLink')
    },

    toMyConcern() {
      this.$emit('toConcernLink')
    }
  }
}
</script>

<style lang="scss">
.IdentityPage {
  padding-top: 5px;

  .header-identity {
    display: flex;
    align-items: center;

    .user_xbimg{
      font-size: 0;
    }
    .user-name {
      font-weight: 400;
      color: #000;
      padding-right: 5px;
    }

    .user-grade {
      width: 20px;
      height: 20px;
    }
    .usergrade1 {
      width: 16px;
      height: 16px;
    }
  }

  .body-integration {
    display: flex;
    align-items: center;
    color: #e4632b;

    .left {
      .left-icon {
        width: 13px;
        height: 12px;
        margin-bottom: -3px;
      }

      .left-name {
        display: block;
        font-weight: 400;
        color: #e4632b;
        font-size: 8px;
        margin-right: 10px;
      }
    }

    .right {
      font-size: 12px;
    }
  }

  .body-identity {
    color: #000;

    .user-identity {
      width: 45px;
      background: #bad6fd;
      border-radius: 5px;
      padding: 5px 20px;
      font-size: 11px;
      text-align: center;
      margin: 5px 0;
    }

    .time {
      font-size: 9px;
      font-weight: 300;
      text-align: center;
    }
  }

  .body-fans {
    color: #fff;
    font-size: 12px;
    display: flex;

    .fans {
      margin-right: 10px;
    }
  }
}
</style>
