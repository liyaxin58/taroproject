<template>
  <view class="product-items">
    <block v-for="(item, index) in productRes" :key="index">
      <view class="item" @tap="toProDetail(item.id)">
        <view class="item-header">
          <image mode="aspectFill" :src="item.imgurl" />
        </view>

        <view class="item-body">
          <view class="top">
            <view class="tag">{{ item.typeOfWork }}</view>
            <view class="integration price">
              <view class="original-price">
                <text class="title">原价</text>
                <text class="old-price">¥{{ item.originalPrice }}</text>
              </view>
              <view class="group-purchase-price">
                <text class="title">团购价</text>
                <text>¥{{ item.price }}</text>
              </view>
            </view>
          </view>

          <view class="bottom">
            <view class="item-title">{{ item.title }}</view>
            <view class="item-button">
              <view class="buy">
                <image src="~@/assets/mall/shop.png" />
              </view>
              <view class="add-cart">
                <image src="~@/assets/mall/add-car.png" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    productRes: []
  },

  methods: {
    toProDetail(goodId) {
      this.$emit('toProDetail', goodId)
    }
  }
}
</script>

<style lang="scss">
.product-items {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  .item {
    width: 160px;
    margin: 5px 0;
    display: flex;
    padding: 5px;
    flex-direction: column;
    background-color: #f1f1f1;
    border-radius: 8px;
    box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
  }

  .item-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;

    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .writer-cover {
        width: 42px;
        height: 42px;
        background-color: #fff;
        border-radius: 50%;
      }

      .writer-info {
        margin-left: 5px;

        .name {
          font-weight: 500;
          font-size: 13px;
        }

        .identity {
          width: 51px;
          height: 15px;
          line-height: 15px;
          background: #9bc2f8;
          border-radius: 1px;
          opacity: 0.64;
          font-size: 10px;
          color: #000;
          text-align: center;
          margin: 1px 0;
        }

        .time {
          font-size: 8px;
        }
      }
    }

    .right {
      color: #fff;
      border-radius: 3px;
      background: #0a6ffb;
      font-size: 10px;
      padding: 2px 4px;
    }
  }

  .welfare {
    background: #ffa5a5;
    color: #fff;

    .item-body .top .tag {
      background: #ff4b4b;
    }
  }

  .item-header {
    image {
      width: 100%;
      height: 142px;
      border-radius: 11px;
      background: #fff;
    }

    .pictuer {
      width: 100%;
      height: 106px;
    }
  }

  .item-body {
    padding: 5px 0px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;

      .tag {
        color: #fff;
        border-radius: 3px;
        background: #0a6ffb;
        font-size: 10px;
        padding: 2px 4px;
      }

      .painting-title {
        color: #000;
        font-size: 13px;
      }

      .integration {
        color: #f92f2f;
        font-size: 12px;
        font-weight: 500;
      }

      .price {
        color: #ff6c6c;
      }

      .original-price {
        .title {
          font-size: 10px;
          color: #0a6ffb;
        }

        .old-price {
          text-decoration: line-through;
        }
      }

      .group-purchase-price {
        .title {
          font-size: 12px;
          color: #0a6ffb;
          font-weight: 500;
        }
      }
    }

    .bottom {
      display: flex;

      .item-title {
        width: 50%;
        font-size: 12px;
      }

      .painting-describe {
        width: 60%;
        font-size: 7px;
      }

      .item-button {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;

        .buy {
          margin-right: 5px;
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

        .welfare-btn {
          box-shadow: 1px 1px 2px 0px rgba(255, 146, 146, 1),
            -1px -1px 3px 0px rgba(255, 127, 127, 1);
        }
      }
    }
  }
}
</style>
