<template>
  <!--回复列表-->
  <view class="answer-list">
    <view class="answer-list-left">
      <image class="answer-user-cover" :src="answerHeadimgUrl" />
      <image class="answer-user-grade" src="~@/assets/index/grade.png" />
    </view>

    <view class="answer-list-middle">
      <view class="answer-list-user-name">
        <text>{{ answerCreateName || '哈哈哈' }}</text>
        <image class="answer-list-user-grade" src="~@/assets/index/sex0.png" />
        <text class="answer-list-time">{{ answerCreateDate || '2020' }}</text>
      </view>

      <view class="answer-list-comment-content">
        {{ answerContent || '笑死我' }}
      </view>
    </view>

    <view class="answer-list-right">
      <image class="answer-card-like" src="~@/assets/index/like.png" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 评论人头像
    answerHeadimgUrl: [String, Number],
    // 创建人,就是评论的人
    answerCreateName: String,
    // 创建时间
    answerCreateDate: String,
    // 评论内容
    answerContent: [String, Number]
  },

  methods: {
    toAnswer() {
      this.$emit('toAnswer')
    }
  }
}
</script>

<style lang="scss">
// 回复
.answer-list {
  display: flex;
  align-items: flex-start;
  margin: 10px 0 15px;
  padding-left: 20px;

  .answer-list-left {
    width: 50px;
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    position: relative;
    margin-right: 5px;

    .answer-user-cover {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
    }

    .answer-user-grade {
      width: 14px;
      height: 7px;
      position: absolute;
      bottom: 3px;
      right: 3px;
    }
  }

  .answer-list-middle {
    flex: 1;

    .answer-list-user-name {
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .answer-list-user-grade {
        width: 15px;
        height: 15px;
        margin: 0 5px;
      }

      .answer-list-time {
        font-size: 10px;
      }
    }

    .answer-list-comment-content {
      word-break: break-all;
      font-size: 12px;
      padding: 5px 0 0;
      font-weight: 400;
    }
  }

  .answer-list-right {
    image {
      width: 17px;
      height: 14px;
    }
  }
}
</style>
