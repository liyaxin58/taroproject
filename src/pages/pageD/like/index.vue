<template>
  <view class="like-page">
    <PageTitle pageTitle="我的点赞" />

    <!--帖列表-->
    <view class="card-lists" v-if="likeLists">
      <block v-for="(row, index) in likeLists" :key="index">
        <view class="card-list">
          <PostUser
            :createName="row.createName"
            :createTime="row.createTime"
            :postHeader="row.user.headimgUrl"
            :identity="statusText"
            @addLike="addLike(row.user.id, row.id)"
            @userDetail="showUserPopup(row.user.id, row.id, $event)"
          />
          <view @tap="showPopup(row.id, $event)">
            <PostContent :content="row.content" :imgUrl="row.imgUrl" />

            <view class="card-footer">
              <PostInput :postId="row.id" @confirm="handlePostInputConfirm" />

              <!--评论列表-->
              <view class="comment-lists" v-if="row.reviewNodeBoList">
                <block
                  v-for="(commentList, idx) in row.reviewNodeBoList"
                  :key="idx"
                >
                  <PostCommentList
                    :headimgUrl="commentList.user.headimgUrl"
                    :createName="commentList.createName"
                    :createDate="commentList.createDate"
                    :content="commentList.content"
                  />

                  <view class="answer-lists">
                    <block
                      v-for="(item, idx) in commentList.nextNodes"
                      :key="idx"
                    >
                      <block v-if="item.reviewUser">
                        <PostAnswertList
                          :answerHeadimgUrl="item.reviewUser.headimgUrl"
                          :answerCreateName="item.reviewUserName"
                          :answerCreateDate="item.createDate"
                          :answerContent="item.content"
                        />
                      </block>
                    </block>
                  </view>
                </block>
              </view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import { PostService } from '@/service'
import PostUser from './views/PostUser'
import PostContent from './views/PostContent'
import PostCommentList from './views/PostCommentList'
import PostAnswertList from './views/PostAnswertList'
import PostInput from './views/PostInput'
import { isValid } from '@puckjs/utils/lib/helper'

const statusMaps = {
  0: '在校生',
  1: '校友',
  2: '艺考生',
  4: '普通游客'
}

export default {
  components: {
    PageTitle,
    PostAnswertList,
    PostCommentList,
    PostContent,
    PostUser,
    PostInput
  },

  data() {
    return {
      likeLists: [],
      statusMaps,

      postRes: null,

      // 帖子id
      postId: null,

      // 被关注者id
      attentionUserId: null,

      // 发帖人信息
      UserPopupRes: {},

      showComtBox: false
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

  mounted() {
    this.getCommendList()
  },

  methods: {
    // 获取我的点赞列表
    async getCommendList() {
      const res = await PostService.findCommendList({
        userId: this.userInfo.id,
        page: 1,
        limit: 100
      })

      const likeLists = res.rows.map(row => ({
        ...row,
        imgUrl: isValid(row.imgUrl) ? row.imgUrl.split(/,\s/) : null
      }))

      this.likeLists = likeLists

      this.likeLists.forEach(e => {
        this.identity = e.user.level
      })
    },

    async toAnswer(id, postId, reviewUserId) {
      this.showComtBox = true
      console.log(id)
      console.log('postId==>', postId)
      const res = await PostService.addAnswer({
        reviewId: id,
        postId,
        content: '测测测是是是是',
        userId: reviewUserId,
        reviewUserId: this.userInfo.id
      })

      console.log(res)
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
      const { reviewNodeBoList } = result.rows[0]
      this.postList[index].reviewNodeBoList = reviewNodeBoList
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.like-page {
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
}
</style>
