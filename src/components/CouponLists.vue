<template>
  <view class="store-items">
    <view class="item">
      <view class="item-left">
        <view class="item-cover">
          <image src="~@/assets/index/content1.png" />
        </view>

        <view class="item-info">
          <view class="store-name">叫了只炸鸡（转塘店）</view>
          <view class="store-evaluate">
            <van-icon size="18" color="#0A6FFB" name="star" />
            <text class="mark">5.0</text>
            <!--<text>超棒 |</text>-->
            <text> “老味道还是挺好吃”</text>
          </view>
          <view class="ranking">转塘炸鸡炸串人气第一名</view>
        </view>
      </view>
      <view class="item-right">
        <view class="button fake-button">
          <view class="effective-num">7折优惠卷</view>
          <view class="effective-time">2020.11.10~2020.11.18</view>
        </view>
        <view class="button receive">领劵</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
.store-items {
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(162, 161, 161, 0.5);
  border-radius: 10px;
  padding: 10px;
  margin-top: 10px;

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f3f3f3;
    box-shadow: 0px 2px 4px 0px rgba(188, 187, 187, 0.5);
    border-radius: 14px;
    padding: 10px;
    margin-bottom: 10px;

    .item-left {
      width: 85%;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      font-size: 14px;

      .item-cover {
        width: 60px;
        height: 60px;

        image {
          width: 100%;
          height: 100%;
          border-radius: 5px;
        }
      }

      .item-info {
        flex: 1;
        margin-left: 10px;

        .store-name {
          font-size: 14px;
        }

        .store-evaluate {
          display: flex;
          align-items: center;
          font-size: 10px;
          margin: 8px 0 0;

          .mark {
            color: #0a6ffb;
            margin: 0 4px;
            font-size: 12px;
          }
        }

        .ranking {
          padding-top: 5px;
          font-size: 13px;
        }
      }
    }

    .item-right {
      flex: 1;

      .button {
        padding: 5px 10px;
        background: #f3f3f3;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
        border-radius: 8px;
        text-align: center;
        font-size: 12px;
      }

      .fake-button {
        border-radius: 5px;
        background: #e4632b;
        color: #fff;
        font-size: 6px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
