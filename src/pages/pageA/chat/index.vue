<template>
    <view class="chat-page" >
        <PageTitle :pageTitle="target.nickname" />

        <!--对话内容-->
        <view class="user-chat-lists">
            <scroll-view
                class="message-list"
                :scroll-y="true"
                :scroll-into-view="scrollToMessageId"
            >
                <Message
                    v-for="(row, index) in messages"
                    :key="row.msg_id"
                    :message="row"
                    :userInfo="userInfo"
                    :target="target"
                    :length="messages.length"
                    :idx = 'index'
                    @showTargetPopup="onShowTargetPopup"
                />
            </scroll-view>
        </view>

        <!--输入框-->
        <view :class="{'chat-bar':true ,'foot':true, input:true, 'foot-emoji': isEmoji}">
            <view class="send-wrap">
                <input
                    placeholder-class="sendInput"
                    placeholder="请输入私聊内容"
                    cursor-spacing="40"
                    confirm-type="send"
                    adjust-position="false"
                    :value="inputText"
                    @confirm="sendSingleMsg"
                />
            </view>
            <van-icon name="smile"  color="#0746fa" size="2rem" @click="showEmoji"/>
            <van-icon name="add" color="#0746fa" size="2rem" @click="sendPicMsg"/>
        </view>
        <!--表情列表-->
        <view id="chat-emoji" v-if="isEmoji">

        </view>

        <!--用户弹窗-->
        <van-popup
            id="chat-user-popup"
            :show="userShow"
            @close="onUserClose"
            position="bottom"
            :round="true"
            :z-index="101"
            overlay-style="background-color: #ECECEC; opacity: 0.7;"
        >
            <view class="user-box" v-if="target">
                <view class="user-header">
                    <view class="left">
                        <view class="name">{{ target.createName }}</view>
                        <view class="identity">{{ statusText }}</view>
                        <view class="fans">
                            <text>粉丝 {{ target.funsNum || '0' }}</text>
                            <text>关注 {{ target.attentionNum || '0' }}</text>
                        </view>
                    </view>

                    <view class="right">
                        <image class="user-cover" :src="target.headimgUrl" />
                        <image class="user-grade" src="~@/assets/index/grade.png" />
                    </view>
                </view>

                <view class="user-button">
                    <view class="chat" @tap="addToBlacklist">拉黑</view>
                </view>
            </view>
        </van-popup>
    </view>
</template>

<script>
    import PageTitle from '@/components/PageTitle'
    import { mapState } from 'vuex'
    import { JMessage } from '../../../utils/jmessage'
    import Message from './views/message'
    import { formatTimestamp } from '../../../utils/timestamp'
    import { UserService } from '../../../service'
    import Taro from '@tarojs/taro'

    const statusMaps = {
        0: '在校生',
        1: '校友',
        2: '艺考生',
        4: '普通游客'
    }

    export default {
        components: {
            Message,
            PageTitle
        },

        data() {
            return {
                statusMaps,

                userShow: false,
                isEmoji: false,
                value: '',

                note: '关注',

                target: {},
                messages: [],
                scrollToMessageId: null,
                inputText: ''
            }
        },

        computed: {
            ...mapState({
                userInfo: state => state.user.userInfo
            }),

            statusText() {
                return this.statusMaps[this.target.level]
            },

        },

        // JMessage 实例
        jmessage: null,

        async onLoad({ targetId }) {
            Taro.showLoading({
                title: '加载中'
            })
            // 获取 target 信息
            this.target = {
                id: Number(targetId)
            }
            this.getTarget()

            this.jmessage = new JMessage()

            // 初始化
            await this.jmessage.init()

            // 登录极光
            await this.jmessage.login(this.userInfo.id)

            // 离线消息监听
            this.jmessage.onSyncConversation(targetId, data => {
                Taro.hideLoading()
                this.onReceive(data)
            })
            // 即时消息监听
            this.jmessage.onMsgReceive(targetId, data => {
                this.onReceive(data)
            })





            // 断线重连
            this.jmessage.onDisconnect(() => {
                // 重新登录极光
                this.jmessage.login(this.userInfo.id)
            })
        },

        destroyed() {
            this.jmessage.disconnect()
            this.onReceive = null
        },

        methods: {
            // 显示 或者隐藏 Emoji
            showEmoji() {
                this.isEmoji = !this.isEmoji
            },
            onReceive(data) {
                // 测试直接获取极光的资源图片路径
                // this.jmessage.getResource("qiniu/image/j/41f5567bb63936a5d47d2abf/E6E261D7620EE254BF2971F12737F536.jpg").then(res=>{
                //     console.log(res)
                // })
                this.messages = [...this.messages, ...data]
                this.$nextTick(() => {
                    this.scrollToMessageId = 'msg-' + data[data.length - 1].msg_id
                })
            },
            // 发送图片
            sendPicMsg() {
                this.isEmoji = false
                Taro.chooseImage({
                    count: 1,
                    success: (result => {
                        const tempFilePaths = result.tempFilePaths[0]
                        this.jmessage.sendSinglePic(this.target.id, tempFilePaths ).then(res => {
                            const message = {
                                ctime_ms: res.ctime_ms,
                                msg_type: 3,
                                msg_id: res.msg_id,
                                content: {
                                    from_type: 'user',
                                    // 消息发送方
                                    from_id: JMessage.username(this.userInfo.id),
                                    create_time: res.ctime_ms,
                                    target_type: 'single',
                                    msg_body: {
                                        media_id:tempFilePaths
                                    },
                                    msg_type: 'image',
                                    // 消息接收方
                                    target_id: JMessage.username(this.target.id)
                                },
                                create_time: formatTimestamp(res.ctime_ms)
                            }
                            this.messages.push(message)

                            // 滚动到最底部
                            this.$nextTick(() => {
                                this.scrollToMessageId = 'msg-' + result.msg_id
                            })
                        })
                    })
                })
            },

            // 发送文本
            async sendSingleMsg(event) {
                try {
                    const text = event.detail.value

                    // 改变 inputText 的值，这样 this.inputText = '' 才能清空输入框
                    this.inputText = text

                    // 清空输入框
                    this.inputText = ''

                    // 发送消息
                    const result = await this.jmessage.sendSingleMsg(this.target.id, text )
                    const message = {
                        ctime_ms: result.ctime_ms,
                        msg_type: 3,
                        msg_id: result.msg_id,
                        content: {
                            from_type: 'user',
                            // 消息发送方
                            from_id: JMessage.username(this.userInfo.id),
                            create_time: result.ctime_ms,
                            target_type: 'single',
                            msg_body: {
                                text
                            },
                            msg_type: 'text',
                            // 消息接收方
                            target_id: JMessage.username(this.target.id)
                        },
                        create_time: formatTimestamp(result.ctime_ms)
                    }
                    // 追加发送的信息
                    this.messages.push(message)

                    // 滚动到最底部
                    this.$nextTick(() => {
                        this.scrollToMessageId = 'msg-' + result.msg_id
                    })
                } catch (err) {
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }
            },

            async getTarget() {
                const result = await UserService.findUsers([this.target.id])
                this.target = result.rows[0] || {}
            },

            onShowTargetPopup() {
                this.userShow = true
            },

            async addToBlacklist() {
                Taro.showLoading({
                    title: '加载中'
                })

                try {
                    await this.jmessage.addToBlacklist(this.target.id)

                    Taro.showToast({
                        title: '已加入黑名单',
                        icon: 'none'
                    })
                } catch (err) {
                    console.error(err)
                    Taro.showToast({
                        title: err.message,
                        icon: 'none'
                    })
                }
            },

            // 关注发帖人
            // async toInterest() {
            //   if (this.note === '关注') {
            //     await UserService.addAttention(this.userInfo.id, this.attentionUserId)
            //     this.note = '已关注'
            //     Taro.showToast({
            //       title: '关注成功',
            //       icon: 'none'
            //     })
            //   } else {
            //     await UserService.delAttention(this.attentionUserId)
            //     this.note = '关注'
            //     Taro.showToast({
            //       title: '已取消关注',
            //       icon: 'none'
            //     })
            //   }
            // },

            showUser() {
                this.userShow = true
            },

            // 关闭-发帖人信息弹窗
            onUserClose() {
                this.userShow = false
            }
        }
    }
</script>

<style lang="scss">
    page {
        background: #f3f3f3;
    }

    page,
    .chat-page {
        height: 100vh;
    }

    // 聊天输入框
    .chat-page {
        display: flex;
        flex-direction: column;

        .chat-input {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            background: #eaeaea;
            padding: 13px 12px;
            padding-bottom: constant(safe-area-inset-bottom);
            padding-bottom: env(safe-area-inset-bottom);
        }

        .left {
            width: 75%;
            max-height: 100px;
            overflow-y: scroll;
            margin-right: 12px;
            border-radius: 6px;

            .chat-text {
                background-color: #fff;
                font-size: 14px;
                font-weight: 400;
            }
        }

        .right image {
            flex: 1;
            width: 25px;
            height: 25px;
            margin-right: 10px;
        }

        // 对话内容
        .user-chat-lists {
            flex: 1;
            overflow: hidden;
            margin-top: 20px;
        }

        .message-list {
            height: 100%;
        }

        // 弹窗
        .popup {
            width: 100%;
            height: 65%;
            max-height: 65%;
            overflow: scroll;
        }

        // 弹窗-帖子详细
        .popup-card-info {
            padding: 10px 30px;
            margin: 15px 0 60px;
        }

        .post-button {
            position: fixed;
            bottom: 25%;
            left: 9px;

            .post-cover {
                width: 50px;
                height: 50px;
            }
        }
    }


    #chat-emoji{
        width: 100%;
        height: 200px;
        background: red;
        position: fixed;
        bottom: 0;
    }
    // 用户信息
    #chat-user-popup {
        width: 100%;

        .user-box {
            background-color: #fff;
            height: 190px;
            padding: 15px 30px;
            border-radius: 30px;
        }

        .user-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .left {
            flex: 1;

            .name {
                font-weight: 600;
                font-size: 17px;
            }

            .identity {
                width: 82px;
                height: 20px;
                background: #88afe4;
                border-radius: 6px;
                opacity: 0.64;
                font-size: 12px;
                color: #000;
                text-align: center;
                line-height: 20px;
                margin: 5px 0;
            }

            .fans {
                font-size: 12px;
                color: #555555;
            }
        }

        .right {
            width: 101px;
            position: relative;

            .user-cover {
                width: 90px;
                height: 90px;
                border-radius: 50%;
                box-shadow: 0px 2px 4px 0px rgba(163, 163, 163, 0.5);
            }

            .user-grade {
                width: 40px;
                height: 18px;
                position: absolute;
                bottom: 10px;
                right: 0;
            }
        }

        .user-button {
            display: flex;
            justify-content: space-around;

            .interest,
            .chat {
                width: 66px;
                height: 32px;
                line-height: 32px;
                background: #0a6ffb;
                border-radius: 8px;
                color: #fff;
                font-size: 12px;
                text-align: center;
                margin-top: 10px;
            }
        }


    }
    .chat-bar {
        display: flex;
        position: relative;
        align-items: center;
        min-height: 62px;
        justify-content: space-between;
        .action {
            display: flex;
            align-items: center;
            height: 100%;
            justify-content: center;
            max-width: 100%;
            margin: 0 4px;
            van-icon {
                font-size: 27px;
                color: #0a6ffb;
            }
        }
    }
    .foot {
        position: fixed;
        width: 100%;
        bottom: 0;
        padding-bottom: 10px;
        z-index: 1024;
        box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.1);
    }
    .foot-emoji{
        bottom: 200px;
    }
    .input {
        background-color: #eaeaea;
    }
    .send-wrap {
        background: #ffffff;
        border-radius: 7px;
        width: 100%;
        padding: 8px;
        margin: 0 8px;
    }
    .sendInput {
        height: 17px;
        font-size: 12px;
        font-weight: 400;
        color: #cccccc;
        line-height: 17px;
        letter-spacing: 1px;
    }


</style>
