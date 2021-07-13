<template>
  <view class="seller-page">
    <PageTitle pageTitle="卖家信息" />

    <view class="seller-header">
      <UserListIdentity
        headimgUrl="https://s3.ax1x.com/2021/03/17/66nnld.jpg"
        nickName="卖家"
        level="1"
        fansNum="11"
        attentionNum="22"
      />

      <view class="user-works">
        <view class="left-item">
          <view class="item">
            <view>在售作品</view>
            <view>12</view>
          </view>

          <view class="item">
            <view>总售数量</view>
            <view>32</view>
          </view>
        </view>

        <view class="right">
          <view class="add">+</view>
          <view class="chat">+</view>
        </view>
      </view>
    </view>

    <view class="seller-body">
      <view class="title">在售作品</view>
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
      </view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import UserListIdentity from '@/components/UserListIdentity'

export default {
  components: { UserListIdentity, PageTitle },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
.seller-page {
  .seller-header {
    height: auto;
    background: url('https://s3.ax1x.com/2021/03/17/66mkGQ.png');
    background-size: 100% 100%;
    padding: 10px 15px;
    margin: 20px 10px 15px;

    .user-works {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;

      .left-item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 12px;

        .item {
          text-align: center;
          margin-right: 20px;
        }
      }

      .right {
        display: flex;

        .add,
        .chat {
          width: 37px;
          height: 18px;
          line-height: 18px;
          background: #2a82fb;
          box-shadow: -1px -1px 2px 0px #8db9f6, 1px 1px 2px 0px #011a7c;
          border-radius: 4px;
          text-align: center;
          margin-left: 15px;
        }
      }
    }

    .UserListIdentityPage .item {
      border: none;
      padding-bottom: 10px;
      padding-top: 0;
    }

    .UserListIdentityPage .item .item-left .user-cover {
      width: 45px;
      height: 45px;
    }

    .UserListIdentityPage .item .item-left .user-card .card-middle {
      width: 48px;
      height: 15px;
      line-height: 15px;
      font-size: 10px;
      margin: 2px 0;
    }

    .UserListIdentityPage .item .item-left .user-card .card-top .name {
      color: #fff;
    }

    .UserListIdentityPage .item .item-left .user-card .card-bottom {
      color: #fff;
    }

    .UserListIdentityPage .item .item-left .user-card .card-top .user-grade,
    .UserListIdentityPage .item .item-right {
      display: none;
    }
  }

  .seller-body {
    margin: 0 5px;

    .title {
      font-size: 14px;
      font-weight: 400;
      margin-bottom: 5px;
      margin-left: 5px;
    }

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
          }
        }
      }
    }
  }
}
</style>
