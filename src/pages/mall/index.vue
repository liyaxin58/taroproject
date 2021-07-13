<template>
  <TabBarLayout select-tab="mall">
    <view class="mall-page">
      <view class="mall-header">
        <view class="message">
          <!-- <van-icon name="orders-o" :dot="true" /> -->
          <image class="mall_siebst" src="https://www.caamyj.com/image/order_wu.png" />
          <!-- <image class="mall_siebst" src="https://www.caamyj.com/image/order_you.png" /> -->
        </view>
        <view class="title">商城</view>
      </view>

      <view class="swiper">
        <swiper
          :indicator-dots="indicatorDots"
          :autoplay="autoplay"
          :circular="circular"
          :vertical="vertical"
          :interval="interval"
          :duration="duration"
          previous-margin="0px"
          next-margin="0px"
          indicator-color="#D8D8D8"
          indicator-active-color="#0A6FFB"
        >
          <block v-for="(row, index) in images" :key="index">
            <swiper-item>
              <image :src="row" alt="" />
            </swiper-item>
          </block>
        </swiper>
      </view>

      <view class="mall-body">
        <Tabs @onChange="onNavChange">
          <slot slot="nav" v-if="commodityType">
            <TabNav v-for="(rows, index) in commodityType" :key="index">
              <view @tap="getTypeId(rows.id)">
                <view class="tab-icon">
                  <image
                    :src="
                      activeNavIdx === index ? rows.clickImgUrl : rows.imgUrl
                    "
                  />
                </view>
                <view class="tab-name">{{ rows.name }}</view>
              </view>
            </TabNav>
          </slot>
          <slot v-else>
            <NullState text="暂无商品~" />
          </slot>

          <!--积分商城-->
          <TabItem>
            <Authorize>
              <IntegrationProduct
                :productRes="productRes"
                @toProDetail="toProDetail($event)"
              />
            </Authorize>
          </TabItem>

          <!--文创周边-->
          <TabItem>
            <Authorize>
              <IntegrationProduct
                :productRes="productRes"
                @toProDetail="toProDetail($event)"
              />
            </Authorize>
          </TabItem>

          <!--作品展卖-->
          <TabItem>
            <Authorize>
              <PaintingProduct
                :productRes="productRes"
                @paintingDetail="paintingDetail($event)"
              />
            </Authorize>
          </TabItem>

          <!--团购优惠-->
          <TabItem>
            <Authorize>
              <GroupsProduct
                :productRes="productRes"
                @toProDetail="toProDetail($event)"
              />
            </Authorize>
          </TabItem>

          <!--爱心义卖-->
          <TabItem>
            <Authorize>
              <WelfareProduct
                :productRes="productRes"
                @welfareDetail="welfareDetail($event)"
              />
            </Authorize>
          </TabItem>
        </Tabs>
      </view>

      <view v-show="userInfo.id" class="shopping-car" @tap="toShopCar">
        <image src="~@/assets/mall/shop-car.png" />
      </view>
    </view>
  </TabBarLayout>
</template>

<script>
import TabBarLayout from '@/components/TabBarLayout'
import { customTabBar } from '@/mixins'
import TabNav from '@/components/TabNav'
import TabItem from '@/components/TabItem'
import Tabs from '@/components/tabs'
import Taro from '@tarojs/taro'
import { ShopService } from '@/service'
import IntegrationProduct from './views/IntegrationProduct'
import PaintingProduct from './views/PaintingProduct'
import GroupsProduct from './views/GroupsProduct'
import WelfareProduct from './views/WelfareProduct'
import { pageQuery } from '@/utils/page-query'
import { mapState } from 'vuex'
import NullState from '@/components/NullState'
import Authorize from '@/components/Authorize'

export default {
  components: {
    Authorize,
    NullState,
    WelfareProduct,
    GroupsProduct,
    PaintingProduct,
    IntegrationProduct,
    TabBarLayout,
    TabNav,
    TabItem,
    Tabs
  },

  mixins: [customTabBar],

  data() {
    return {
      images: [
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
        'https://s3.ax1x.com/2021/01/28/ypSRcn.png'
      ],

      // 是否自动切换
      autoplay: true,

      // 是否显示面板指示点
      indicatorDots: true,

      // 是否采用衔接滑动
      circular: false,

      // 滑动方向是否为纵向
      vertical: false,

      // 自动切换时间间隔
      interval: 5000,

      // 滑动动画时长
      duration: 500,

      current: 0,

      // 积分商城
      productRes: [],

      // 选中类目
      activeNavIdx: 0,

      // 类别id
      typeId: 2
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  onShow() {
    this.getCommodityType()
    this.findCommodityList()
  },

  mounted() {
    this.getCommodityType()
    this.findCommodityList()
  },

  methods: {
    swiperChange(e) {
      this.current = e.detail.current
    },

    onNavChange(activeNavIdx) {
      this.activeNavIdx = activeNavIdx
    },

    async getTypeId(id) {
      this.typeId = id

      this.findCommodityList()
    },

    async findCommodityList() {
      const res = await ShopService.commodityList(this.typeId)
      this.productRes = res.rows
    },

    async getCommodityType() {
      const typeRes = await ShopService.findCommodityType()
      this.commodityType = typeRes.rows

      console.log('commodityType', this.commodityType)
    },

    // 积分商城-商品详情
    toProDetail(goodId) {
      console.log('积分商城-商品详情', goodId)
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/integrationProductDetail/index', {
          goodId
        })
      })
    },

    // 作品展卖-商品详情
    paintingDetail(goodId) {
      console.log('作品展卖-商品详情', goodId)
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/paintingProductDetail/index', {
          goodId
        })
      })
    },

    // 爱心义卖-商品详情
    welfareDetail(goodId) {
      console.log('爱心义卖-商品详情', goodId)
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/welfareProductDetail/index', {
          goodId
        })
      })
    },

    // 积分商城-商品详情
    toShopCar(goodId) {
      console.log('积分商城-商品详情', goodId)
      Taro.navigateTo({
        url: pageQuery('/pages/pageB/shoppingCart/index', {
          goodId
        })
      })
    },

    // 跳转到登录页
    toLogin() {
      Taro.navigateTo({
        url: '/pages/wxLogin/index'
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}
.mall_siebst{
  width: 15px;
  height: 15px;
}

.mall-page {
  position: relative;

  .mall-header {
    width: 100%;
    height: 193px;
    background: url('../../assets/mall/bg.png') no-repeat;
    background-size: 100% 100%;
    position: relative;

    .message {
      position: absolute;
      top: 52px;
      left: 15px;
      width: 36px;
      height: 26px;
      background: #a1bce1;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      .van-icon {
        font-size: 10px;
      }
    }

    .title {
      text-align: center;
      color: #fff;
      font-size: 20px;
      padding-top: 50px;
    }
  }

  .swiper {
    margin: -95px 10px 0;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .get-login {
    width: 50%;
    text-align: center;
    padding: 10px;
    border: 1px solid #0a6ffb;
    border-radius: 5px;
    color: #0a6ffb;
    background-color: #fff;
    margin: 130px auto;
  }

  .mall-body {
    .Tabs_navs {
      background-color: #fff;
      padding: 15px;
      margin: 10px 10px 5px;
      color: #4e4e4e;
      display: flex;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 7px;
    }

    .tab-icon {
      width: 34px;
      height: 32px;
      margin: 0 auto 5px;

      image {
        width: 100%;
        height: 100%;
      }
    }

    .TabNav {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .Tabs_content {
      margin: 0 15px;
      padding-bottom: 20px;
    }

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
  }

  .shopping-car {
    position: fixed;
    width: 51px;
    height: 51px;
    text-align: center;
    line-height: 51px;
    background: #fff;
    border-radius: 50%;
    top: 75vh;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    image {
      width: 32px;
      height: 29px;
      background: #fff;
    }
  }
}
</style>
