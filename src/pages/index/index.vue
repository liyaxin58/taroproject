<template>
    <TabBarLayout select-tab="home">
        <view class="index-page">
            <!--轮播-->
            <SwiperTop />

            <view class="index-body">
                <view class="post-box">
                    <!--用户-->
                    <Authorize>
                        <view class="user">
                            <view class="user-left">
                                <HeadPortrait />
                                <IdentityPage />
                            </view>
                            <view class="user-right" @tap="toCheck">
                                <image class="check-cover" src="~@/assets/index/check.png" />
                                <text>签到</text>
                            </view>
                        </view>
                    </Authorize>

                    <CheckPopup :userCheck="userCheck" @toCheckPage="toCheckPage" @onUserCheck="onUserCheck"
                        @toIntegration="toIntegration" @toUserPost="toUserPost" />

                    <!--标签分类-->
                    <view class="tag-list">
                        <CategoryNav :categories="categories" @change="handleChange" />
                    </view>
                </view>

                <!--热帖-->
                <view class="popular-list">
                    <view class="title">热帖榜</view>

                    <swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
                        :vertical="vertical" :interval="interval" :duration="duration" previous-margin="0px"
                        next-margin="0px">
                        <!-- <block v-for="(row, index) in images" :key="index">-->
                        <swiper-item>
                            <view class="popular-title">
                                <text>01</text>
                                喜欢隔壁男孩子怎么追啊^_^
                            </view>
                        </swiper-item>

                        <swiper-item>
                            <view class="popular-title">
                                <text>02</text>
                                喜欢隔壁男孩子怎么追啊^_^
                            </view>
                        </swiper-item>
                        <!--</block>-->
                    </swiper>
                </view>

                <!--帖列表-->
                <view class="card-lists" v-if="postList">
                    <block v-for="(row, index) in postList" :key="index">
                        <Authorize>
                            <view class="card-list">
                                <PostUser :createName="row.createName" :typeName="row.typeName"
                                    :createTime="row.date" :postHeader="row.user.headimgUrl"
                                    :identity="statusText" :like="row.like" @like="like(row.user.id, row.id, row.like)"
                                    @unlike="unlike(row.id, row.like)"
                                    @userDetail="showUserPopup(row.user.id, row.id, $event)" @fenxiangFun="fenxiangClick" @jubaoFun="jubaoClick(row.user.id, row.id)" />
                                <view @tap="showPopup(row.id, $event)">
                                    <PostContent :content="row.content" :imgUrl="row.imgUrl" />

                                    <view class="card-footer">
                                        <PostInput :postId="row.id" @confirm="handlePostInputConfirm" />

                                        <!--评论列表-->
                                        <view class="comment-lists" v-for="(item, index) in row.reviewNodeBoList" :key="index">
                                            <view :key="index">
                                                <PostCommentList v-if="item.user" :headimgUrl="item.user.headimgUrl"
                                                    :createName="item.createName" :createDate="item.date"
                                                    :content="item.content" :answerlike="item.like" />
                                                <view class="answer-lists" v-for="(it, idx) in item.nextNodes" :key="idx">
                                                    <PostAnswertList :key="idx" v-if="it.reviewUser"
                                                        :answerHeadimgUrl="it.reviewUser.headimgUrl"
                                                        :answerCreateName="it.reviewUserName"
                                                        :answerCreateDate="it.date"  :answerlike="it.like" :answerContent="it.content" />
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </Authorize>
                    </block>

                    <!--用户弹窗-->
                    <van-popup :show="userShow" @close="onUserClose" position="bottom" :round="true" id="user-popup"
                        :z-index="101" overlay-style="background-color: #ECECEC; opacity: 0.7;">
                        <view class="user-box" v-if="UserPopupRes.user">
                            <view class="user-header">
                                <view class="left">
                                    <view class="name">{{ UserPopupRes.createName }}</view>
                                    <view class="identity">{{ statusText }}</view>
                                    <view class="fans">
                                        <text>粉丝 {{ UserPopupRes.user.funsNum || '0' }}</text>
                                        <text>关注 {{ UserPopupRes.user.attentionNum || '0' }}</text>
                                    </view>
                                </view>

                                <view class="right">
                                    <image class="user-cover" :src="UserPopupRes.user.headimgUrl" />
                                    <image class="user-grade" src="~@/assets/index/grade.png" />
                                </view>
                            </view>
                            <view v-if="UserPopupRes.userId !== userInfo.id" class="user-button">
                                <view class="interest" @tap="toInterest">{{ note }}</view>
                                <view class="chat" @tap="toChat">私聊</view>
                            </view>
                        </view>
                    </van-popup>
                    <!-- 举报 -->
                    <van-popup :show="userJb" @close="onUserJbCloseClick" position="bottom" :round="true" :z-index="102" custom-style="margin-bottom:50px">
                        <view style="background:#fff;">
                            <view v-for="(item,index) in jubaoList" :key="index" class="yse_claset" @tap="jubaoSerClick(item)">
                                {{item}}
                            </view>
                            <view @tap="onUserJbCloseClick" class="yse_claset">
                                取消
                            </view>
                        </view>
                    </van-popup>
                    <!--弹窗-->
                    <van-popup v-if="postRes" class="popup" :show="show" @close="onClose" position="bottom"
                        :round="true" custom-style="height: 85%">
                        <view class="popup-card-info">
                            <PostUser :createName="postRes.createName" :typeName="postRes.typeName"
                                :createTime="postRes.createTime" :postHeader="postRes.user.headimgUrl"
                                :identity="statusText" :like="postRes.like"
                                @like="like(postRes.user.id, postRes.id, postRes.like)"
                                @unlike="unlike(postRes.id, postRes.like)" />

                            <PostContent :content="postRes.content" :imgUrl="postRes.imgUrl"
                                @previewImage="previewImage(postRes.imgUrl)" />

                            <view class="card-footer">
                                <PostInput :postId="postRes.id" @confirm="handlePostInputConfirm" />

                                <!--评论列表-->
                                <view class="popup-comment-lists">
                                    <block v-for="(commentList, idx) in postRes.reviewNodeBoList" :key="idx">
                                        <PostCommentList :headimgUrl="commentList.user.headimgUrl"
                                            :createName="commentList.createName" :createDate="commentList.createTime"
                                            :content="commentList.content" @toAnswer="toAnswer(commentList)" />

                                        <view class="answer-lists">
                                            <block v-for="(item, idx) in commentList.nextNodes" :key="idx">
                                                <block v-if="item.reviewUser">
                                                    <PostAnswertList :answerHeadimgUrl="item.reviewUser.headimgUrl"
                                                        :answerCreateName="item.reviewUserName"
                                                        :answerCreateDate="item.createDate"
                                                        :answerContent="item.content" />
                                                </block>
                                            </block>
                                        </view>
                                    </block>
                                </view>
                            </view>
                        </view>
                    </van-popup>
                </view>

                <view class="card-lists" v-else>
                    <NullState text="糟糕(ｷ｀ﾟДﾟ´)!!!小美，快去发帖子~" />
                </view>

                <!--发帖按钮-->
                <view class="post-button">
                    <Authorize>
                        <image @tap="toPost" class="post-cover" src="~@/assets/index/post.png" />
                    </Authorize>
                </view>
            </view>

            <view class="replay-view" :style="`bottom: ${inputBottom}px`" v-if="parentComment">
                <input :focus="true" :value="replayContent" :adjust-position="false"
                    @keyboardheightchange="keyboardheightchange" @blur="keyboardblur" confirm-type="send"
                    :placeholder="`回复@${parentComment.createName}`" @confirm="replayConfirm" />
            </view>
        </view>
    </TabBarLayout>
</template>

<script>
    console.log("能打印吗1")
    import PostInput from './views/PostInput'
    import TabBarLayout from '@/components/TabBarLayout'
    import SwiperTop from './views/Swiper'
    import HeadPortrait from '@/components/HeadPortrait'
    import IdentityPage from '@/components/Identity'
    import CategoryNav from '@/components/CategoryNav'
    import {
        customTabBar
    } from '@/mixins'
    import Taro from '@tarojs/taro'
    import {
        PostService,
        UserService
    } from '@/service'
    import {
        mapState
    } from 'vuex'
    import {
        isValid
    } from '@puckjs/utils/lib/helper'
    import PostUser from './views/PostUser'
    import PostContent from './views/PostContent'
    import PostCommentList from './views/PostCommentList'
    import PostAnswertList from './views/PostAnswertList'
    import NullState from '@/components/NullState'
    import CheckPopup from '@/components/CheckPopup'
    import Authorize from '@/components/Authorize'
    // import InputCell from '../../components/input-cell'

    const statusMaps = {
        0: '在校生',
        1: '校友',
        2: '艺考生',
        4: '普通游客'
    }
    console.log("能打印吗2")
    export default {
        components: {
            Authorize,
            CheckPopup,
            NullState,
            PostAnswertList,
            PostCommentList,
            PostContent,
            PostUser,
            PostInput,
            TabBarLayout,
            SwiperTop,
            HeadPortrait,
            IdentityPage,
            CategoryNav
        },

        mixins: [customTabBar],

        data() {
            return {
                statusMaps:statusMaps,

                commentInputshow: false,

                show: false,

                userShow: false,

                userCheck: false,

                note: '关注',

                // 是否自动切换
                autoplay: true,

                // 是否显示面板指示点
                indicatorDots: false,

                // 是否采用衔接滑动
                circular: false,

                // 滑动方向是否为纵向
                vertical: true,

                // 自动切换时间间隔
                interval: 5000,

                // 滑动动画时长
                duration: 500,

                // 帖子分类类目
                categories: [],

                // 帖子列表
                postList: [],

                // 弹窗-帖子详情
                postRes: null,

                // 帖子id
                postId: null,

                // 被关注者id
                attentionUserId: null,

                // 发帖人信息
                UserPopupRes: {},

                shopInput: false,

                reviewId: null,

                rePostId: null,

                reviewUserId: null,

                replayContent: null,

                // 父评论
                parentComment: null,
                inputBottom: 0,
                // 举报是否显示
                userJb:false,
                // 举报内容
                jubaoList:[
                    '违反法律或违反校规',
                    '传播低俗、色情、暴力',
                    '辱骂或钓鱼引战',
                    '涉嫌商业谋利、营销引流',
                    '暴露隐私，人肉搜索',
                    '令人感到不适的其他理由',
                ]
            }
        },

        computed: {
            statusText() {
                return this.statusMaps[this.identity]
            },

            ...mapState({
                userInfo: state => state.user.userInfo
            })
        },

        onShow() {
            console.log("能打印吗3")
            this.getCategories()
            this.getPostList()
        },

        methods: {
            // 跳转到登录页
            toLogin() {
                Taro.navigateTo({
                    url: '/pages/wxLogin/index'
                })
            },

            // 获取帖子分类类目
            async getCategories() {
                const res = await PostService.findBigPostType()
                this.categories = res.rows
            },

            // 标签分类
            handleChange(typeId) {
                this.getPostList(typeId)
            },

            // 查询帖子列表
            async getPostList(typeId) {
                try {
                    Taro.showLoading({
                        title: '加载中'
                    })

                    const res = await PostService.findPostList({
                        typeId,
                        signInUserId: this.userInfo.id
                    })
                    const postList = res.rows.map(row => ({
                        ...row,
                        imgUrl: isValid(row.imgUrl) ? row.imgUrl.split(/,\s/) : null
                    }))

                    this.postList = postList
                    this.postList.forEach(e => {
                        e.createTime = e.createTime.split(':')[0] + ':' + e.createTime.split(':')[1]
                        this.identity = e.user.level
                        e.reviewNodeBoList.map(val => {
                            val.createDate = val.createDate.split(':')[0] + ':' + val.createDate
                                .split(':')[1]
                        })
                    })
                    Taro.hideLoading()
                } catch (e) {
                    console.log(e)
                }
            },

            // 查看-帖子详情弹窗
            showPopup(id, event) {
                this.show = true
                this.postRes = this.postList.find(p => p.id === id)
            },

            // 关闭-帖子详情弹窗
            onClose() {
                this.show = false
            },

            async toAnswer(comment) {
                console.log('comment', comment)
                this.parentComment = comment
            },

            keyboardheightchange({
                detail
            }) {
                this.inputBottom = detail.height
            },

            keyboardblur() {
                this.parentComment = null
                this.inputBottom = 0
            },

            async replayConfirm(event) {
                this.replayContent = event.detail.value
                console.log(this.parentComment)
                await PostService.addAnswer({
                    reviewId: this.parentComment.id,
                    postId: this.parentComment.postId,
                    content: this.replayContent,
                    userId: this.parentComment.userId,
                    reviewUserId: this.userInfo.id
                })

                this.getPostList()
            },

            // 查看-发帖人信息弹窗
            async showUserPopup(id, postId) {
                this.userShow = true
                this.attentionUserId = id

                const res = await PostService.postInfo(postId)
                this.UserPopupRes = res.rows[0]
                console.log('UserPopupRes', this.UserPopupRes)

                this.$store.dispatch('TARGET_INFO', this.UserPopupRes)
            },

            // 关闭-发帖人信息弹窗
            onUserClose() {
                this.userShow = false
            },
            onUserJbCloseClick(){
                this.userJb = false

            },

            // 私聊
            toChat() {
                Taro.navigateTo({
                    url: '/pages/pageA/chat/index?targetId=' + this.UserPopupRes.userId
                })
            },

            // 关注发帖人
            async toInterest() {
                if (this.note === '关注') {
                    await UserService.addAttention(this.userInfo.id, this.attentionUserId)
                    this.note = '已关注'
                    Taro.showToast({
                        title: '关注成功',
                        icon: 'none'
                    })
                } else {
                    await UserService.delAttention(this.attentionUserId)
                    this.note = '关注'
                    Taro.showToast({
                        title: '已取消关注',
                        icon: 'none'
                    })
                }
            },

            // 取消点赞帖子
            async unlike(postId) {
                await PostService.delCommend(postId)

                Taro.showToast({
                    title: '取消点赞',
                    icon: 'none'
                })

                this.getPostList()
            },

            // 点赞帖子
            async like(postUserId, postId) {
                await PostService.addCommend(postUserId, postId, this.userInfo.id)

                Taro.showToast({
                    title: '点赞',
                    icon: 'none'
                })

                this.getPostList()
            },

            // 图片预览
            previewImage(imgUrl, index) {
                Taro.previewImage({
                    current: imgUrl[index],
                    urls: imgUrl
                })
            },

            // 发帖
            toPost() {
                Taro.navigateTo({
                    url: '/pages/pageA/post/index'
                })
            },

            // 评论
            async handlePostInputConfirm(value, postId) {
                await PostService.addReview({
                    postId,
                    content: value,
                    createName: this.userInfo.nickname,
                    userId: this.userInfo.id
                })

                const index = this.postList.findIndex(p => p.id === postId)
                const result = await PostService.postInfo(postId)
                const {
                    reviewNodeBoList
                } = result.rows[0]
                this.postList[index].reviewNodeBoList = reviewNodeBoList
            },
            async fenxiangClick(){
                // 分享
            },
            async jubaoClick(userId, wid){
                // 举报
                console.log("美院君")
                this.userJb = true
                this.userId = userId;
                this.wid = wid;
            },
            jubaoSerClick(item){
                let token = this.userInfo.token;
                Taro.request({
                    url: "https://www.caamyj.com/myj/WxSeal/addSeal",
                    method:"POST",
                    header:{
                        "token":token
                    },
                    data:{
                        // seal:item
                        postId:this.wid,
                        reportUserId:this.userId,
                        reportInfo:item
                    },
                    success(res){
                        console.log(res);
                        if(res.code == 200){
                            Taro.showToast({
                                title:'提交成功',
                                icon:'none'
                            })
                        }else{
                            Taro.showToast({
                                title:res.message,
                                icon:'none'
                            })
                        }
                    }
                })
            },

            // 去签到
            async toCheck() {
                try {
                    const res = await UserService.getToDay(this.userInfo.id)

                    if (res.status === 1) {
                        Taro.showToast({
                            title: '今天签过啦~',
                            icon: 'none'
                        })
                    } else {
                        this.userCheck = true
                        await UserService.addSignIn(this.userInfo.id)
                    }
                } catch (e) {
                    Taro.showToast({
                        title: '签到失败',
                        icon: 'none'
                    })
                }
            },

            onUserCheck() {
                this.userCheck = false
            },

            toCheckPage() {
                Taro.navigateTo({
                    url: '/pages/pageD/checkCalendar/index'
                })
            },

            // 积分
            toIntegration() {
                Taro.navigateTo({
                    url: '/pages/pageB/integration/index'
                })
            },

            // 积分
            toUserPost() {
                Taro.navigateTo({
                    url: '/pages/pageA/post/index'
                })
            }
        }
    }
</script>

<style lang="scss">
.yse_claset{
    background: #0a6ffb;
    color: #ffffff;
    font-size: 14px;
    padding: 20px 0;
    text-align: center;
    border-bottom: 1px solid #ffffff;
}
    page {
        background-color: #f3f3f3;
    }

    .index-page {
        position: relative;

        .selected {
            background-color: red;
        }

        .index-body {
            position: relative;
            bottom: -4px;
            background-color: #f3f3f3;
            border-radius: 21px;
            z-index: 0;
        }

        .post-box {
            min-height: 128px;
            background: #fff;
            box-shadow: 3px 8px 7px -5px rgba(185, 185, 185, 1);
            border-radius: 19px;
            padding: 10px 15px 0px;
            z-index: 1;
            margin-top: -30px;

            .user {
                display: flex;
                align-items: center;
                justify-content: space-between;

                .user-left {
                    width: 90%;
                    display: flex;
                    justify-content: flex-start;

                    .body-identity,
                    .fans {
                        display: none;
                    }
                }

                .user-right {
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    .check-cover {
                        width: 27px;
                        height: 25px;
                    }

                    text {
                        margin: 5px 0;
                        font-weight: 400;
                        font-size: 8px;
                    }
                }
            }
        }

        // 标签分类
        .tag-list {
            swiper {
                width: 100%;
            }
        }

        // 热帖
        .popular-list {
            margin: 20px 15px 0;
            height: 55px;
            background: url('https://s3.ax1x.com/2021/02/02/yn75QS.png');
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            padding: 0 15px;

            .title {
                width: 30px;
                font-size: 10px;
                font-weight: 600;
                margin-right: 50px;
                color: #ffab2f;
                text-shadow: 0px 2px 4px rgba(159, 159, 159, 0.5);
            }

            swiper {
                flex: 1;
                height: 40px;
            }

            .popular-title {
                font-size: 13px;
                font-weight: 600;
                color: #ffab2f;
                line-height: 40px;
                text-shadow: 0px 2px 4px rgba(159, 159, 159, 0.5);

                text {
                    padding-right: 10px;
                }
            }
        }

        // 帖列表
        .card-lists {
            margin: 0px 10px 10px 10px;

            .card-list {
                position: relative;
                bottom: -5px;
                z-index: 0;
                height: 236px;
                background: #fff;
                box-shadow: 0px 2px 4px 0px rgba(186, 186, 186, 0.5);
                border-radius: 27px;
                padding: 15px 20px;
                margin: 15px 0;
                overflow-y: scroll;
                -webkit-overflow-scrolling: touch;
            }
        }

        // 评论列表
        .popup-comment-lists {
            .textarea {
                background-color: red;
                width: 100%;
                height: 300px;
            }

            .answer-lists {
                width: 100%;
                height: auto;
                margin-top: -10px;
            }

            .comment-input-popup {
                width: 100%;
            }

            .comment-input {
                width: 100%;
            }
        }

        // 用户信息
        #user-popup {
            width: 100%;
            height: 190px;

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

        // 弹窗
        .popup {
            width: 100%;
            height: 65%;
            max-height: 65%;
            overflow: scroll;
            -webkit-overflow-scrolling: touch;
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

        // 评论
        .card-footer {
            margin-top: 10px;

            .van-cell {
                background-color: rgba(10, 111, 251, 0.14);
                border-radius: 18px;
                font-size: 14px;
                padding: 5px 15px;
            }

            .van-icon__image {
                width: 16px;
                height: 20px;
            }
        }

        .replay-view {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 40px;
            background: #f3f3f3;
            z-index: 9999;
            padding: 10px 15px;

            input {
                background: #fff;
                height: 35px;
                padding-left: 10px;
                font-size: 12px;
                border-radius: 8px;
            }
        }
    }
</style>
