<template>
    <view class="integration-page">
        <PageTitle pageTitle="我的积分" />

        <view class="integration-box">
            <view class="total">
                <view>200</view>
                <view>积分</view>
            </view>

            <Tabs>
                <slot slot="nav">
                    <TabNav>
                        <view class="tab-name">积分明细</view>
                    </TabNav>
                    <TabNav>
                        <view class="tab-name">积分规则</view>
                    </TabNav>
                </slot>

                <!--积分明细-->
                <TabItem>
                    <view class="integration-items">
                        <view class="item" v-for="(item, index) in IntegralList">
                            <view class="left">
                                <view class="item-title">连续签到2天</view>
                                <view class="item-time"> {{item.createtime.replace('T', ' ')}}</view>
                            </view>
                            <view class="right"> +2 </view>
                        </view>
                        <view class="item">
                            <view class="left">
                                <view class="item-title">连续签到2天</view>
                                <view class="item-time"> 2020-11-14 16:34:20</view>
                            </view>
                            <view class="right"> +2 </view>
                        </view>
                    </view>
                </TabItem>

                <!--积分规则-->
                <TabItem> 积分规则 </TabItem>
            </Tabs>
        </view>
    </view>
</template>

<script>
    import PageTitle from '@/components/PageTitle'
    import TabItem from '@/components/TabItem'
    import TabNav from '@/components/TabNav'
    import Tabs from '@/components/tabs'
    import { ShopService } from '../../../service'

    export default {
        components: { PageTitle, TabNav, TabItem, Tabs },

        data() {
            return {
                IntegralList:[]
            }
        },

        mounted() {
            this.getIntegralConfigList()
        },

        methods: {
            async getIntegralConfigList() {
                const res = await ShopService.findIntegralConfigList(1, 100)
                console.log('res', res)
                this.IntegralList(res.rows)
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: #f3f3f3;
    }

    .integration-page {
        .integration-box {
            margin: 30px 0;

            .total {
                width: 80px;
                margin: 0 auto 20px;
                padding: 10px 0;
                font-size: 16px;
                color: #fff;
                background: #0a6ffb;
                border-radius: 15px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .Tabs_navs {
                display: flex;
                justify-content: space-around;
                align-items: center;

                .TabNav {
                    padding: 5px 20px;

                    border-radius: 10px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    background: #f4f4f4;
                    box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
                    -1px -1px 1px 0px rgba(255, 255, 255, 1);

                    .tab-name {
                        font-size: 12px;
                        padding-top: 2px;
                    }
                }

                .TabNav_active {
                    background: #0a6ffb;

                    .tab-name {
                        color: #fff;
                    }
                }
            }

            .Tabs_content {
                background: #ffff;
                border-radius: 14px;
                margin: 20px 10px 30px;
                padding: 5px 15px;

                // 积分
                .integration-items {
                    .item {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px solid #eee;
                        padding: 10px 0;
                        margin-bottom: 5px;

                        &:last-child {
                            border: none;
                        }

                        .left {
                            width: 70%;
                            padding: 0 10px;

                            .item-title {
                                font-size: 14px;
                                font-weight: 400;
                            }

                            .item-time {
                                font-size: 12px;
                                padding-top: 8px;
                            }
                        }

                        .right {
                            color: #0a6ffb;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
    }
</style>
