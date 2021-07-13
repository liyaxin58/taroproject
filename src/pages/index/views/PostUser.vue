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
          <view class="user-name">{{ createName }}</view>
          <image class="user-grade" src="~@/assets/index/sex0.png" />
        </view>
        <view class="user-identity">{{ identity }}</view>
        <view class="time">{{ createTime }}</view>
      </view>
    </view>
    <view class="card-right">
      <!--标签-->
      <view class="card-tag">{{ typeName || '暂无分类' }}</view>

      <!--点赞转发举报-->
      <view class="card-action">
        <view @tap="toggleLike">
          <image
            v-if="!like"
             style="margin-top:3px"
            class="card_icon"
            src="https://www.caamyj.com/image/ax_kong.png"
          />
          <image v-else class="card_icon" style="margin-top:3px" src="https://www.caamyj.com/image/like-selected.png" />
        </view>

        <image @tap="fenxiangClick" class="card_icon" src="https://www.caamyj.com/image/fx_kong.png" />
        <image @tap="jubaoClick" class="card_icon" src="https://www.caamyj.com/image/jb_kset.png" />
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
    typeName: [String, Number],
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

    toggleLike() {
      this.like ? this.$emit('unlike') : this.$emit('like')
    },
    fenxiangClick(){
      this.$emit('fenxiangFun')
    },
    jubaoClick(){
      this.$emit('jubaoFun')
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
      width: 50px;
      height: 50px;
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
       font-size: 0;
      .user-name {
        font-weight: 400;
        color: #000;
        font-size: 14px;
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
      padding: 3px 20px;
      color: #000000;
      font-size: 10px;
      text-align: center;
      margin: 5px 0;
    }

    .time {
      font-size: 9px;
      color: #666666;
      font-weight: 300;
      text-align: center;
    }
  }
}

.card-right {
  .card-tag {
    text-align: center;
    font-size: 10px;
    color: #fff;
    background: #0a6ffb;
    border-radius: 6px;
    padding: 5px 10px;
    margin-bottom: 5px;
  }

  .card-action {
    display: flex;
    justify-content: space-around;
    align-items: center;

    image {
      margin: 0 5px;
    }
    .card_icon{
      width: 18px;
      height: 18px;
      margin: 0 5px;
    }
    .card-like {
      width:18px;
      height:16px;
    }
    .card-share {
      width:18px;
      height:16px
    }
    .card-report {
      width:16px;
      height:16px
    }
  }
}
</style>
