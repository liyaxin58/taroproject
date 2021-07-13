<template>
    <view
        :id="`msg-${message.msg_id}`"
        :class="{
      Message: true,
      Message_wrap: message.content.msg_type === 'image' && idx == length-1,
      'Message-target': isTargetUser
    }"
    >
        <view class="message-user" @tap="onTap">
            <image class="message-user-avatar" :src="user.headimgUrl" />
            <image class="message-user-grade" src="~@/assets/index/grade.png" />
        </view>
        <view class="message-content">
            <image class="message-pic" v-if="message.content.msg_type === 'image'"  :src="handelPic(message.content.msg_body.media_id)" />
            <view class="message-text" v-if="message.content.msg_type === 'text'">{{ message.content.msg_body.text }}</view>
            <view class="message-time">
                {{ message.create_time }}
            </view>
        </view>
    </view>
</template>

<script>
    import { JMessage } from '../../../../utils/jmessage'

    export default {
        props: {
            message: Object,
            userInfo: Object,
            target: Object,
            length: Number,
            idx: Number
        },

        destroyed() {
            this.jmessage.disconnect()
        },
        computed: {

            isTargetUser() {
                return this.message.content.from_id === JMessage.username(this.target.id)
            },

            user() {
                return this.isTargetUser ? this.target : this.userInfo
            }
        },

        methods: {
            onTap() {
                if (this.isTargetUser) {
                    this.$emit('showTargetPopup')
                }
            },
             // 判断是本地图片是是显示的图片
            handelPic(img) {
                const index = img.indexOf('http')
                if (index === 0) {
                    return img
                } else {
                    return 'https://fmedia.im.jiguang.cn/' + img
                }
            }
        }
    }
</script>

<style lang="scss">

    .Message {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 15px;
        padding-left: 15px;
        padding-right: 15px;
        &_wrap {
            margin-bottom: 100px;
        }
        .message-user {
            position: relative;
            margin-right: 10px;
        }

        .message-user-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #fff;
        }

        .message-user-grade {
            width: 20px;
            height: 9px;
            position: absolute;
            top: 30px;
            left: 25px;
        }

        .message-content {
            margin-left: 50px;
            margin-right: 5px;
        }

        .message-pic{
            width: 150px;
            height: 150px;
            object-fit: contain;
        }
        .message-text {
            position: relative;
            padding: 10px 20px;
            background: rgba(10, 111, 251, 0.1);
            border-radius: 12px;
            font-size: 14px;
            font-weight: 400;

            &:before {
                content: '';
                position: absolute;
                right: -6px;
                top: 16px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 4px 0 4px 6.9px;
                border-color: transparent transparent transparent rgba(10, 111, 251, 0.1);
            }
        }

        .message-time {
            padding-top: 2px;
            padding-left: 8px;
            font-size: 8px;
            color: rgba(163, 163, 163, 1);
            text-align: right;
        }

        &.Message-target {
            flex-direction: row;
            justify-content: flex-start;

            .message-content {
                margin-left: 5px;
                margin-right: 54px;

                .message-text {
                    background: #fff;

                    &:before {
                        left: -6px;
                        right: initial;
                        border-width: 4px 6.9px 4px 0;
                        border-color: transparent #ffffff transparent transparent;
                    }
                }
            }

            .message-time {
                padding-right: 8px;
                text-align: left;
            }
        }
    }
</style>
