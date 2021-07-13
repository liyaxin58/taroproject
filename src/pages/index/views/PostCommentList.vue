<template>
  <!--评论列表-->
  <view class="list" @tap="toAnswer">
    <view class="list-left">
      <image class="user-cover" :src="headimgUrl" />
      <image class="user-grade" src="~@/assets/index/grade.png" />
    </view>

    <view class="list-middle">
      <view class="list-user-name">
        <text>{{ createName }}</text>
        <image class="list-user-grade" src="~@/assets/index/sex0.png" />
        <text class="list-time">{{ createDate }}</text>
      </view>

      <view class="list-comment-content">
        {{ content }}
      </view>
    </view>

    <view class="list-right">
      <image class="card-like" src="~@/assets/index/like.png" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 评论人头像
    headimgUrl: [String, Number],
    // 创建人,就是评论的人
    createName: String,
    // 创建时间
    createDate: String,
    // 评论内容
    content: [String, Number]
  },

  methods: {
    toAnswer() {
      this.$emit('toAnswer')
    }
  }
}
</script>

<style lang="scss">
// 评论
.list {
  display: flex;
  align-items: flex-start;
  margin: 20px 0;

  .list-left {
    width: 50px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    margin-right: 8px;

    .user-cover {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
    }

    .user-grade {
      width: 20px;
      height: 10px;
      position: absolute;
      bottom: 0px;
      right: -1px;
    }
  }

  .list-middle {
    flex: 1;

    .list-user-name {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .list-user-grade {
        width: 15px;
        height: 15px;
        margin: 0 5px;
      }

      .list-time {
        font-size: 10px;
      }
    }

    .list-comment-content {
      word-break: break-all;
      font-size: 14px;
      padding: 5px 0 0;
      font-weight: 400;
    }
  }

  .list-right {
    image {
      width: 17px;
      height: 14px;
    }
  }
}
</style>
