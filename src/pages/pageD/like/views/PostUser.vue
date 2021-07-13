<template>
  <view class="card-header">
    <view class="card-left">
      <!--头像-->
      <view class="user-left">
        <image class="user-cover" :src="postHeader" @tap="userDetail" />
        <image class="user-grade" src="~@/assets/index/grade.png" />
      </view>

      <!--身份-->
      <view class="user-right">
        <view class="user">
          <view class="user-name">{{ createName || '小美' }}</view>
          <image class="user-grade" src="~@/assets/index/sex0.png" />
        </view>
        <view class="user-identity">{{ identity || '暂无' }}</view>
        <view class="time">{{ createTime || '-' }}</view>
      </view>
    </view>

    <view class="card-right">
      <!--点赞转发举报-->
      <!-- <view class="card-action">
        <view @tap="addLike">
          <image v-if="like" class="card-like" src="~@/assets/index/like.png" />
          <image
            v-else
            class="card-like"
            src="~@/assets/index/like-selected.png"
          />
        </view>

        <view class="card-tag">
          <van-icon name="delete" color="#0A6FFB" />
        </view>
      </view> -->
      <view class="card-action">
        <view @tap="addLike">
          <image v-if="like" class="card_icon" src="~@/assets/index/like.png" />
          <image
            v-else
            class="card_icon"
            src="https://www.caamyj.com/image/xin.png"
          />
          <!-- <view>{{}}</view> -->
        </view>

        <image class="card_icon" src="https://www.caamyj.com/image/xiaoxi.png" />
        <image class="card_icon" src="https://www.caamyj.com/image/fenxiang.png" />
      </view>
      <view class="card-tag" @tap="deletePost">
        <image class="card_icon" src="https://www.caamyj.com/image/shanchu.png" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // 是否匿名 0是｜ 1否,必填 ,
    anonymous: [String, Number],
    // 所属大类/小类
    // typeName: [String, Number],
    // 创建人,就是发帖的人，如果是匿名则不用填写
    createName: String,
    // 随机头像,不用填
    headImgUrl: String,
    // 创建时间
    createTime: String,
    // 身份
    identity: String,
    // 发帖人头像
    postHeader: String,
    like: [String, Number, Boolean]
  },

  methods: {
    userDetail() {
      this.$emit('userDetail')
    },

    addLike() {
      this.$emit('addLike')
    }
  }
}
</script>

<style lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
}

.card-left {
  display: flex;
  justify-content: flex-start;

  .user-left {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    margin-right: 10px;

    .user-cover {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
    }

    .user-grade {
      width: 27px;
      height: 13px;
      position: absolute;
      bottom: 5px;
      right: -1px;
    }
  }

  .user-right {
    .user {
      display: flex;
      align-items: center;

      .user-name {
        font-weight: 400;
        color: #000;
        padding-right: 5px;
      }

      .user-grade {
        width: 15px;
        height: 15px;
      }
    }

    .user-identity {
      background: #bad6fd;
      border-radius: 5px;
      padding: 5px 10px;
      display: inline-block;
      color: #000000;
      font-size: 11px;
      text-align: center;
      margin: 5px 0;
    }

    .time {
      font-size: 9px;
      color: #000000;
      font-weight: 300;
      text-align: center;
    }
  }
}

.card-right {
  .card-tag {
    position: absolute;
    right: 20px;
    bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33px;
    height: 25px;
    background: #f4f4f4;
    box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
      -1px -1px 1px 0px rgba(255, 255, 255, 1);
    border-radius: 8px;

    van-icon {
      font-size: 18px;
    }
    .card_icon{
      width: 18px;
      height: 18px;
      padding: 9px 20px;
    }
  }

  .card-action {
    display: flex;
    justify-content: space-around;
    align-items: center;

    image {
      width: 23px;
      height: 23px;
      margin: 0 5px;
    }
    .card_icon{
      width: 23px;
      height: 23px;
      margin: 0 5px;
    }
  }
}
</style>
