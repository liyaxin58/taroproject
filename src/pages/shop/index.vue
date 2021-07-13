<template>
    <TabBarLayout select-tab="shop">
        <view class="shop-page">
            <!--页面标题-->
            <view class="shop-header">
                <view class="like" @tap="toShopCollection">
                    <van-icon name="like" size="20" color="#0A6FFB" />
                </view>
                <view class="title">探店</view>
            </view>
            <view class="swiper-container">
                <swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                    :vertical="vertical" :interval="interval" :duration="duration" :current="current"
                    previous-margin="45px" next-margin="45px" @change="swiperChange">
                    <swiper-item class="swiper-item" v-for="(row, index) in shoplists" :key="index">
                        <view class="item-body" :class="index == current ? 'item-body item-body-active' : 'item-body'">
                            <view class="top">
                                <image class="top-imge" mode="scaleToFill" :src="row.firstImg" alt="" />
                            </view>

                            <view class="menu-button" @tap="getMenu(row.id)"> 菜单 </view>

                            <view class="bottom">
                                <view class="store-info" @tap="toDetail(row.id)">
                                    <view class="store">
                                        <view class="store-left">
                                            <text class="title">{{ row.shopName }}</text>
                                            <block v-for="(row, index) in row.star" :key="index">
                                                <image class="start-cover" src="~@/assets/shop/start.png" />
                                            </block>
                                            <van-rate class="start-cover" v-model="value" :size="25" color="#ffd21e"
                                                void-icon="star" void-color="#eee" />
                                        </view>

                                        <view class="store-right">
                                            <image src="~@/assets/shop/share.png" />
                                            <view>分享</view>
                                        </view>
                                    </view>

                                    <view class="tag">
                                        <text>SLOGAN</text>
                                    </view>

                                    <view class="address">
                                        <image class="address-imge" src="~@/assets/shop/address.png" alt="" />
                                        <text>{{ row.detailedAddress }}</text>
                                    </view>
                                </view>

                                <view class="cover-show">
                                    <block v-for="(row, index) in detailsImg" :key="index">
                                        <image class="cover-img" :src="row" />
                                    </block>
                                </view>

                                <Authorize>
                                    <view class="receive">
                                        <image @tap="cancelCollect(row.id)" src="~@/assets/shop/left.png" />
                                        <view class="receive-button" @tap="collectionWindow(row.id)">
                                            领取优惠卷
                                        </view>
                                        <image @tap="addCollect(row.id)" src="~@/assets/shop/right.png" />
                                    </view>
                                </Authorize>
                            </view>
                        </view>
                    </swiper-item>
                </swiper>
            </view>

            <!--分类按钮-->
            <view class="menu">
                <Authorize>
                    <image @tap="showShopType" src="~@/assets/shop/menu.png" />
                </Authorize>
            </view>

            <!--领取优惠卷-->
            <van-popup :show="showCollectionWindow" @close="onClose" position="center" :round="true" :z-index="101"
                overlay-style="background-color: #ECECEC; opacity: 0.7;">
                <view class="receive-window">
                    <view class="title">领取优惠卷</view>
                    <view class="receive-warps">
                        <view class="warp">
                            <view class="warp-header">
                                <view class="button discount">
                                    {{ coupon.discountName }}
                                    <view class="time"> {{ coupon.createTime }}</view>
                                </view>
                                <view class="button">领劵</view>
                            </view>
                            <view class="warp-body">
                                使用规则：
                                <view>
                                    {{ coupon.discountIntroduction }}
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </van-popup>

            <!--探店类型-->
            <van-popup :show="shopTypeMenu" @close="onCloseTypeMenu" position="center" :round="true" :z-index="101"
                custom-style="background: rgba(255, 255, 255, 0.1);"
                overlay-style="background: rgba(255, 255, 255, 0.1);">
                <view class="type-box">
                    <view class="type-items" v-if="typeList">
                        <block v-for="(row, index) in typeList" :key="index">
                            <view class="type-item" @tap="seletedType(row.id)">{{
                row.name
              }}</view>
                        </block>
                    </view>
                </view>
            </van-popup>

            <!--店铺菜单-->
            <van-popup :show="shopMenu" @close="onCloseShopMenu" position="top" :round="true" :z-index="101"
                custom-style="background: rgba(255, 255, 255, 0.1); margin: 101px auto; width: 285px; height: 340px; position: absolute; right: 0; left: 0;"
                overlay-style="background: rgba(255, 255, 255, 0.1);">
                <view class="menu-box">
                    <view class="menu-item" v-for="(row, index) in menuLists" :key="index">
                        <view class="title">{{ row.typeName }}</view>
                        <view class="lists" v-for="(item, id) in row.tandianMenu" :key="id">
                            <block class="1">
                                <view class="list">
                                    <text>{{ item.commodity }}</text>
                                    <text>￥{{ item.price }}</text>
                                </view>
                            </block>
                        </view>
                    </view>
                </view>
            </van-popup>
        </view>
    </TabBarLayout>
</template>

<script>
    import TabBarLayout from '@/components/TabBarLayout'
    import {
        customTabBar
    } from '@/mixins'
    import Taro from '@tarojs/taro'
    import {
        ShopService
    } from '../../service'
    import {
        mapState
    } from 'vuex'
    import Authorize from '../../components/Authorize'
    import {
        isValid
    } from '@puckjs/utils/lib/helper'
    import {
        pageQuery
    } from '@/utils/page-query'

    export default {
        components: {
            Authorize,
            TabBarLayout
        },

        mixins: [customTabBar],

        data() {
            return {
                // 领取优惠券窗口
                showCollectionWindow: false,

                images: [
                    'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
                    'https://s3.ax1x.com/2021/01/28/ypSRcn.png',
                    'https://s3.ax1x.com/2021/01/28/ypSRcn.png'
                ],
                // 是否自动切换
                autoplay: false,

                // 是否显示面板指示点
                indicatorDots: false,

                // 是否采用衔接滑动
                circular: true,

                // 滑动方向是否为纵向
                vertical: false,

                // 自动切换时间间隔
                interval: 5000,

                // 滑动动画时长
                duration: 500,

                current: 0,

                // 商家店铺列表
                shoplists: [],

                // 弹出门店类型
                shopTypeMenu: false,

                typeList: [],

                shopMenu: false,

                menuLists: null,

                shopId: null,

                coupon: {}
            }
        },

        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            }),

            // 店铺图片
            detailsImg: function() {
                const detailsImg = this.shoplists[0].detailsImg
                return isValid(detailsImg) ? detailsImg.split(/[,，]/g) : []
            }
        },

        mounted() {
            this.findTandianTypeList()
            this.findTandianList()
        },

        onLoad() {
            this.findTandianTypeList()
            this.findTandianList()
        },

        methods: {
            swiperChange(e) {
                this.current = e.detail.current
            },
            // 跳转到登录页
            toLogin() {
                Taro.navigateTo({
                    url: '/pages/wxLogin/index'
                })
            },

            // 获取探店菜单详情
            async getMenu(shopId) {
                this.shopId = shopId

                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    const res = await ShopService.findTandianMenu(shopId)
                    this.menuLists = res.rows
                    this.shopMenu = !this.shopMenu
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 选择店铺类型
            seletedType(typeId) {
                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    this.typeId = typeId
                    this.shopTypeMenu = !this.shopTypeMenu

                    this.findTandianList(this.typeId)
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 查询探店店铺类型
            async findTandianTypeList() {
                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    const res = await ShopService.findTandianTypeList(100, 1)
                    this.typeList = res.rows
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 查询探店店铺列表
            async findTandianList() {
                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    const res = await ShopService.findTandianList(
                        this.typeId || this.typeList[0],
                        100,
                        1
                    )
                    this.shoplists = res.rows
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 收藏店铺
            async addCollect(id) {
                console.log('111')
                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    await ShopService.addTandianCollect(this.userInfo.id, id)

                    Taro.showToast({
                        title: '收藏成功~',
                        icon: 'none'
                    })
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 取消收藏
            async cancelCollect(id) {
                Taro.showLoading({
                    title: '加载中...'
                })

                try {
                    await ShopService.delTandianCollect(id)

                    Taro.showToast({
                        title: '已取消~',
                        icon: 'none'
                    })
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }

                Taro.hideLoading()
            },

            // 打开店铺类型弹窗
            showShopType() {
                this.shopTypeMenu = !this.shopTypeMenu
            },

            // 关闭店铺类型弹窗
            onCloseTypeMenu() {
                this.shopTypeMenu = !this.shopTypeMenu
            },

            // 关闭菜单
            onCloseShopMenu() {
                this.shopMenu = !this.shopMenu
            },

            toShopCollection() {
                Taro.navigateTo({
                    url: '/pages/pageC/shopCollection/index'
                })
            },

            // 前往门店详情
            toDetail(shopId) {
                Taro.navigateTo({
                    url: pageQuery('/pages/pageC/shopDetails/index', {
                        shopId
                    })
                })
            },

            // 打开领取窗口，优惠券列表
            async collectionWindow(id) {
                this.showCollectionWindow = !this.showCollectionWindow

                this.coupon = this.shoplists.find(item => item.id === id)

                console.log(this.coupon, 'this.coupon')
            },

            // 关闭领取窗口
            onClose() {
                this.showCollectionWindow = !this.showCollectionWindow
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f3f3f3;
    }

    .shop-page {
        position: relative;

        .shop-header {
            width: 100%;

            .like {
                position: absolute;
                top: 52px;
                left: 15px;
                width: 40px;
                height: 30px;
                border-radius: 15px;
                background: #d8d8d8;
                display: flex;
                align-items: center;
                justify-content: center;

                .van-icon {
                    font-size: 18px;
                }
            }

            .title {
                text-align: center;
                color: #000;
                font-size: 20px;
                padding-top: 50px;
            }
        }

        .swiper-container {
            position: relative;
            margin-top: 25px;

            .swiper {
                width: 100%;
                height: 75vh;

                .swiper-item {
                    width: 100%;
                    height: 70vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .item-body {
                    width: 285px;
                    height: 100%;
                    background: #000;
                    border-radius: 20px;
                    color: #fff;
                    // scale: 0.9;
                    transform: scale(.9);
               
                }

                .item-body-active {
                    // scale: 1;
                    transform: scale(1);
                }

                .top {
                    position: relative;

                    .top-imge {
                        width: 285px;
                        height: 340px;
                        border-radius: 20px;
                        border-bottom-right-radius: 0;
                        border-bottom-left-radius: 0;
                    }
                }

                .bottom {
                    padding: 8px 0px;
                    background-color: #000000;
                    border-radius: 20px;

                    .store-info {
                        padding: 0 10px;

                        .store {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 17px;

                            .start-cover {
                                width: 15px;
                                height: 15px;
                                margin-right: 3px;
                            }

                            .store-right {
                                text-align: center;
                                color: #c2c2c2;
                                font-size: 12px;
                                font-weight: 500;

                                image {
                                    width: 15px;
                                    height: 15px;
                                }
                            }
                        }

                        .tag {
                            display: flex;
                            justify-content: flex-start;
                            align-items: center;
                            font-size: 18px;
                            font-weight: 900;
                            color: #0a6ffb;
                        }

                        .address {
                            width: 180px;
                            font-size: 10px;
                            padding-top: 5px;
                        }

                        .address-imge {
                            width: 8px;
                            height: 10px;
                            font-weight: 300;
                        }
                    }

                    // 图片展示
                    .cover-show {
                        width: 100%;
                        height: 100px;
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        overflow-x: hidden;
                        margin-top: 10px;

                        image {
                            width: 70px;
                            height: 70px;
                            border-radius: 50%;

                            &:nth-child(2n) {
                                transform: scale(1.4);
                                margin: 70px;
                            }

                            &:nth-child(2n + 1) {
                                margin-left: -30px;
                            }
                        }
                    }

                    // 领取优惠券
                    .receive {
                        padding: 0 15px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-top: 15px;

                        image {
                            width: 24px;
                            height: 21px;
                        }

                        .receive-button {
                            width: 90px;
                            height: 28px;
                            font-size: 12px;
                            line-height: 28px;
                            text-align: center;
                            color: #fff;
                            background: #0a6ffb;
                            box-shadow: 0px 4px 18px 0px rgba(0, 0, 0, 0.5);
                            border-radius: 5px;
                        }
                    }
                }
            }
        }

        .receive-window {
            width: 226px;
            min-height: 100px;
            padding: 15px;
            color: #0a6ffb;
            background-color: #f3f3f3;

            .title {
                font-weight: 500;
                font-size: 14px;
                margin-bottom: 10px;
                text-align: center;
            }

            .receive-warps {
                .warp {
                    display: flex;
                    flex-direction: column;

                    .warp-header {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;

                        .button {
                            width: 99px;
                            height: 32px;
                            background: #f3f3f3;
                            box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
                                -1px -1px 1px 0px rgba(255, 255, 255, 1);
                            border-radius: 5px;
                            font-size: 12px;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }

                        .discount {
                            color: #fff;
                            background: #0a6ffb;

                            .time {
                                font-size: 8px;
                            }
                        }
                    }

                    .warp-body {
                        height: auto;
                        background: #ffffff;
                        border-radius: 5px;
                        font-size: 10px;
                        margin: 10px 0px;
                        padding: 10px 15px;
                    }
                }
            }
        }

        .type-box {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);

            .type-items {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                width: 220px;
                margin: auto auto;

                .type-item {
                    background-color: #0a6ffb;
                    color: #fff;
                    font-size: 12px;
                    margin: 10px;
                    min-width: 68px;
                    min-height: 35px;
                    padding: 4px 10px;
                    border-radius: 50px;
                    text-align: center;
                    line-height: 40px;
                    box-shadow: 0px 2px 3px 0px rgba(60, 60, 60, 0.5);
                }
            }
        }

        .menu-box {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);

            .menu-item {
                padding: 20px;

                .title {
                    font-size: 14px;
                }

                .lists {
                    font-size: 12px;
                    margin-top: 10px;

                    .list {
                        display: flex;
                        align-items: center;
                        justify-content: flex-start;
                        margin: 5px 0;
                    }
                }
            }
        }

        .menu {
            position: fixed;
            top: 50%;
            right: 20px;
            z-index: 120;

            image {
                width: 30px;
                height: 30px;
                opacity: 0.74;
            }
        }

        .menu-button {
            position: absolute;
            top: 51%;
            right: 0;
            left: 20px;
            z-index: 100;
            width: 60px;
            height: 20px;
            background: #ffffff;
            border-radius: 4px;
            color: #0a6ffb;
            text-align: center;
            font-size: 12px;
            line-height: 20px;
        }

        .get-login {
            width: 50%;
            text-align: center;
            padding: 10px;
            border: 1px solid #0a6ffb;
            border-radius: 5px;
            color: #0a6ffb;
            background-color: #fff;
            margin: 50% auto;
        }
    }
</style>
