import SDK from './jmessage-wxapplet-sdk-1.4.3.min'
import { PostService } from '../service'
import { isValidArray } from '@puckjs/utils/lib/helper'
import { formatTimestamp } from './timestamp'

const COMMON_PASSWORD = '123456'
const USERNAME_PREFIX = 'meiyuanjun'

export class JMessage {
    constructor(debug) {
        this.sdk = new SDK({
            debug
        })
    }

    static userId(username) {
        return Number(username.replace(USERNAME_PREFIX, ''))
    }

    static username(userId) {
        return USERNAME_PREFIX + userId
    }

    async init() {
        try {
            const config = await PostService.getJiGuangParam()
            await this._initConfig({
                appkey: config.appkey,
                random_str: config.randomStr,
                signature: config.signature,
                timestamp: config.timestamp,
                flag: 1
            })
        } catch (err) {
            this.init()
        }
    }

    getResource(media_id){
        return new Promise((resolve, reject) => {
            this.sdk.getResource({media_id}).onSuccess(resolve).onFail(reject)
        })
    }

    register(userId, nickname) {
        const username = JMessage.username(userId)
        const data = {
            username,
            password: COMMON_PASSWORD,
            nickname
        }

        return new Promise((resolve, reject) => {
            this.sdk.register(data).onSuccess(resolve).onFail(reject)
        })
    }

    login(userId) {
        const username = JMessage.username(userId)
        const data = {
            username,
            password: COMMON_PASSWORD
        }

        return new Promise((resolve, reject) => {
            this.sdk.login(data).onSuccess(resolve).onFail(reject)
        })
    }

    // 发送信息
    sendSingleMsg(id, content) {
        const username = JMessage.username(id)
        return new Promise((resolve, reject) => {
            this.sdk
                .sendSingleMsg({
                    target_username: username,
                    content,
                    appkey: this.config.appkey
                })
                .onSuccess(resolve)
                .onFail(reject)
        })
    }
    // 发送图片
    sendSinglePic(id, image) {
        // const fd = new FormData();
        // fd.append('img', image);
        const username = JMessage.username(id)
        return new Promise((resolve, reject) => {
            this.sdk.sendSinglePic({
                target_username: username,
                appkey: this.config.appkey,
                image: image
            }).onSuccess(resolve).onFail(reject)
        })
    }

    // 会话列表
    conversations() {
        return new Promise((resolve, reject) => {
            this.sdk.getConversation().onSuccess(resolve).onFail(reject)
        })
    }

    /**
     * 多人离线消息同步监听
     * @param callback
     */
    onSyncAllConversations(callback) {
        this.sdk.onSyncConversation(data => {
            const result = data.map(row => ({
                from_username: row.from_username,
                msg: row.msgs[0]
            }))

            if (callback) {
                callback(result)
            }
        })
    }

    /**
     * 单人离线消息同步监听
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/#_95
     *
     * @param targetUserId - 聊天对象用户ID
     * @param callback - 回调函数
     */
    onSyncConversation(targetUserId, callback) {

        const targetUsername = JMessage.username(targetUserId)

        this.sdk.onSyncConversation(data => {
            const result = data.find(row => row.from_username === targetUsername)
            console.log(result, '聊天对象用户ID')
            if (result && isValidArray(result.msgs) && callback) {
                callback(
                    result.msgs.map(row => {
                        row.create_time = formatTimestamp(row.ctime_ms)
                        return row
                    })
                )
            }
        })
    }

    /**
     * 聊天消息实时监听
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/#_94
     *
     * @param targetUserId - 聊天对象用户ID
     * @param callback - 回调函数
     */
    onMsgReceive(targetUserId, callback) {
        const targetUsername = JMessage.username(targetUserId)

        this.sdk.onMsgReceive(data => {
            const result = data.messages.filter(
                row => row.from_username === targetUsername
            )

            if (isValidArray(result) && callback) {
                callback(
                    result.map(row => {
                        row.create_time = formatTimestamp(row.ctime_ms)
                        return row
                    })
                )
            }
        })
    }

    /**
     * 黑名单列表
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/#_83
     */
    blacklist() {
        return new Promise((resolve, reject) => {
            this.sdk.getBlacks().onSuccess(resolve).onFail(reject)
        })
    }

    /**
     * 加入黑名单
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/#_83
     * @param targetUserId
     */
    addToBlacklist(targetUserId) {
        const targetUsername = JMessage.username(targetUserId)

        return new Promise((resolve, reject) => {
            this.sdk
                .addSingleBlacks({
                    member_usernames: [
                        {
                            username: targetUsername
                        }
                    ]
                })
                .onSuccess(resolve)
                .onFail(reject)
        })
    }

    /**
     * 移出黑名单
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js_v2/#_83
     * @param targetUserId
     */
    removeFromBlacklist(targetUserId) {
        const targetUsername = JMessage.username(targetUserId)

        return new Promise((resolve, reject) => {
            this.sdk
                .delSingleBlacks({
                    member_usernames: [
                        {
                            username: targetUsername
                        }
                    ]
                })
                .onSuccess(resolve)
                .onFail(reject)
        })
    }

    /**
     * 断线监听
     * https://docs.jiguang.cn/jmessage/client/im_sdk_js/#_6
     *
     * @param callback - 回调函数
     */
    onDisconnect(callback) {
        this.sdk.onDisconnect(callback)
    }

    // 退出登录
    logout() {
        if (this.sdk.isLogin()) {
            this.sdk.loginOut()
        }
    }

    disconnect() {
        this.sdk.channel.client.close()
    }

    _initConfig(config) {
        // 缓存配置文件
        this.config = config

        return new Promise((resolve, reject) => {
            this.sdk.init(config).onSuccess(resolve).onFail(reject)
        })
    }
}
