<template>
  <view class="seller-lists">
    <view class="list" @tap="paintingDetail">
      <view class="list-header">
        <image class="pictuer" src="~@/assets/mall/pro.png" />
      </view>

      <view class="list-body">
        <view class="top">
          <view class="painting-title">《春》</view>
          <view class="integration">¥1900</view>
        </view>

        <view class="bottom">
          <view class="painting-describe">
            <view class="des">作者：阿屁屁</view>
            <view class="des">尺寸：200cm×400cm</view>
            <view class="des">时间：2020.11.20</view>
          </view>
          <view class="list-button">
            <view class="buy"> 上架 </view>
            <view class="add-cart"> 下架 </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="scss">
.seller-lists {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .list {
    width: 44%;
    margin: 5px;
    display: flex;
    padding: 5px;
    flex-direction: column;
    background-color: #f1f1f1;
    border-radius: 8px;
    box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
  }

  .list-header {
    image {
      width: 100%;
      height: 122px;
      border-radius: 11px;
      background: #fff;
    }

    .pictuer {
      width: 100%;
      height: 122px;
    }
  }

  .list-body {
    padding: 5px 0px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;

      .painting-title {
        color: #000;
        font-size: 13px;
      }

      .integration {
        color: #f92f2f;
        font-size: 12px;
        font-weight: 500;
      }
    }

    .bottom {
      display: flex;

      .painting-describe {
        width: 60%;
        font-size: 7px;
      }

      .list-button {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        font-size: 10px;
        color: #0a6ffb;

        .buy {
          margin-right: 10px;
          background-color: #0a6ffb;
          color: #fff;
        }

        .buy,
        .add-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 10px;
          border-radius: 4px;
          box-shadow: 1px 1px 2px 0px rgba(202, 202, 202, 1),
            -1px -1px 3px 0px rgba(255, 255, 255, 1);

          image {
            width: 18px;
            height: 16px;
          }
        }
      }
    }
  }
}
</style>
