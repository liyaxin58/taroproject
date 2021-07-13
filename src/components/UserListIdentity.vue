<template>
  <view class="UserListIdentityPage">
    <view class="item">
      <view class="item-left">
        <image class="user-cover" :src="headimgUrl" />
        <view class="user-card">
          <view class="card-top">
            <view class="name">{{ nickName }}</view>
            <image class="user-grade" src="~@/assets/index/sex0.png" />
          </view>
          <view class="card-middle">{{ level }}</view>
          <view class="card-bottom">
            <view class="fans">粉丝 {{ fansNum }}</view>
            <view>关注 {{ attentionNum }}</view>
          </view>
        </view>
      </view>
      <view class="item-right" @tap="toAttention">{{ buttonName }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 用户头像
    headimgUrl: String,
    // 用户昵称
    nickName: [String, Number],
    // 用户身份
    level: [String, Number],
    // 粉丝数量
    fansNum: [String, Number],
    // 关注数量
    attentionNum: [String, Number],
    // 按钮名称
    buttonName: String
  },

  data() {
    return {}
  },

  computed: {},

  methods: {
    // 取消关注
    toAttention() {
      this.$emit('toAttention')
    }
  }
}
</script>

<style lang="scss">
.UserListIdentityPage {
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;

    .item-left {
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .user-cover {
        width: 55px;
        height: 55px;
        border-radius: 50%;
        margin-right: 10px;
      }

      .user-card {
        .card-top {
          display: flex;
          align-items: flex-start;

          .name {
            font-weight: 500;
            color: #0a6ffb;
            font-size: 14px;
            padding-right: 5px;
          }

          .user-grade {
            width: 15px;
            height: 15px;
            background: #fff;
          }
        }

        .card-middle {
          width: 60px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          background: #aec7e9;
          border-radius: 4px;
          color: #000;
          font-size: 12px;
          font-weight: 300;
          margin: 5px 0;
        }

        .card-bottom {
          display: flex;
          align-items: center;
          font-size: 10px;
          color: #0a6ffb;

          .fans {
            padding-right: 5px;
          }
        }
      }
    }

    .item-right {
      width: 66px;
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      color: #0a6ffb;
      text-align: center;
      background: #f4f4f4;
      box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
        -1px -1px 1px 0px rgba(255, 255, 255, 1);
      border-radius: 8px;
    }
  }
}
</style>
