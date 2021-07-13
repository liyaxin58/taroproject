<template>
  <view class="comment-page">
    <PageTitle pageTitle="我的评论" />

    <view class="comment-items" v-if="commentLists">
      <block v-for="(row, index) in commentLists" :key="index">
        <view class="item">
          <image class="left-cover" :src="row.user.headimgUrl" />
          <view class="center">
            <view class="item-name">{{ row.createName }}</view>
            <view class="item-news">
              <view class="news">
                {{ row.content }}
              </view>
            </view>
            <view class="item-time">{{ row.createDate }}</view>
          </view>
          <!-- <image class="right" src="~@/assets/content1.png" /> -->
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import { PostService } from '@/service'

export default {
  components: { PageTitle },

  data() {
    return {
      commentLists: []
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.getCommentList()
  },

  methods: {
    async getCommentList() {
      const res = await PostService.getReviewByPostLists(this.userInfo.id)

      this.commentLists = res.rows
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.comment-page {
  .comment-items {
    background: #ffff;
    border-radius: 14px;
    margin: 20px 10px 30px;
    padding: 5px 15px;

    .item {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      padding: 10px 0;
      margin-bottom: 5px;

      &:last-child {
        border: none;
      }

      .left-cover {
        width: 39px;
        height: 39px;
        border-radius: 50%;
      }

      .center {
        flex: 1;
        padding: 0 10px;

        .item-name {
          font-size: 12px;
          font-weight: 400;
          color: #0a6ffb;
        }

        .item-news {
          font-size: 12px;
          font-weight: 400;
          padding-top: 4px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .news {
            flex: 1;
            padding-right: 5px;
          }
        }

        .item-time {
          font-size: 10px;
          padding-top: 8px;
        }
      }

      .right {
        width: 50px;
        height: 50px;
        border-radius: 7px;
        margin-top: 5px;
      }
    }
  }
}
</style>
