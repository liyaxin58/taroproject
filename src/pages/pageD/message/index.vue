<template>
  <view class="message-page">
    <PageTitle page-title="我的消息" />

    <view class="message-lists">
      <Tabs>
        <slot slot="nav">
          <TabNav>
            <view class="tab-icon commit"></view>
            <view class="tab-name">评论</view>
          </TabNav>
          <TabNav>
            <view class="tab-icon like"></view>
            <view class="tab-name">点赞</view>
          </TabNav>
          <TabNav>
            <view class="tab-icon news nssiliicon"></view>
            <view class="tab-name">私聊</view>
          </TabNav>
        </slot>

        <!--评论-->
        <TabItem>
          <view class="comment-items">
            <view class="item">
              <image class="left-cover" src="~@/assets/content1.png" />
              <view class="center">
                <view class="item-name">CAA DAY</view>
                <view class="item-news">
                  <view class="news"
                    >搞不懂这个保安 天天自己学校的人逼着刷码进
                    手机没电了也不让进 搞不懂他们是怎么进来的[白眼][白眼]
                  </view>
                </view>
                <view class="item-time"> 2020-11-14 16:34:20</view>
              </view>
              <image class="right" src="~@/assets/content1.png" />
            </view>
          </view>
        </TabItem>

        <!--点赞-->
        <TabItem>
          <view v-if="likeLists" class="like-items">
            <block v-for="(rows, index) in likeLists" :key="index">
              <view class="item">
                <image class="left-cover" :src="rows.user.headimgUrl" />
                <view class="center">
                  <view class="item-name">{{ rows.user.nickname }}</view>
                  <view class="item-news">
                    <view class="news">赞了你的帖子</view>
                  </view>
                  <view class="item-time">{{ rows.post.createTime }}</view>
                </view>
                <!--<image class="right" :src="rows.post.imgUrl" />-->
              </view>
            </block>
          </view>
        </TabItem>

        <!--私聊-->
        <TabItem>
          <view class="news-items">
            <view
              v-for="(row, index) in conversations"
              :key="index"
              class="item"
              @tap="toChat(row.targetId)"
            >
              <image class="left-cover" :src="row.headimgUrl" />
              <view class="center">
                <view class="item-name">{{ row.nickname }}</view>
                <view class="item-news">
                  <view class="news">{{ row.text }}</view>
                </view>
              </view>
              <view class="right">{{ row.create_time }}</view>
            </view>
          </view>
        </TabItem>
      </Tabs>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import TabItem from '@/components/TabItem'
import TabNav from '@/components/TabNav'
import Tabs from '@/components/tabs'
import Taro from '@tarojs/taro'
import { PostService } from '@/service'
import { mapState } from 'vuex'
import { JMessage } from '../../../utils/jmessage'
import { formatTimestamp } from '../../../utils/timestamp'
import { pageQuery } from '../../../utils/page-query'
import { UserService } from '../../../service'

export default {
  components: { PageTitle, TabNav, TabItem, Tabs },

  data() {
    return {
      likeLists: [],
      conversations: []
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  // JMessage 实例
  jmessage: null,

  async mounted() {
    this.getCommendList()

    this.jmessage = new JMessage(true)

    // 初始化
    await this.jmessage.init()

    // 登录极光
    await this.jmessage.login(this.userInfo.id)

    // 离线消息监听
    this.jmessage.onSyncAllConversations(data => {
      this.onSyncAllConversations(data)
    })
  },

  destroyed() {
    this.jmessage.disconnect()
  },

  methods: {
    // 获取我的点赞列表
    async getCommendList() {
      const res = await PostService.findCommendList({
        userId: this.userInfo.id,
        page: 1,
        limit: 100
      })
      console.log('getCommendList', res)
      this.likeLists = res.rows
    },

    async onSyncAllConversations(data) {
      const result = await this.jmessage.conversations()
      const userIds = result.conversations.map(row =>
        JMessage.userId(row.username)
      )
      const users = await UserService.findUsers(userIds)

      this.conversations = result.conversations.map(row => {
        const result = data.find(d => d.from_username === row.username)
        const user = users.rows.find(
          r => r.id === JMessage.userId(row.username)
        )

        return {
          targetId: JMessage.userId(row.username),
          nickname: user.nickname,
          headimgUrl: user.headimgUrl,
          text: result.msg.content.msg_body.text,
          create_time: formatTimestamp(row.mtime, 'HH:mm:ss')
        }
      })
    },

    toChat(targetId) {
      Taro.navigateTo({
        url: pageQuery('/pages/pageA/chat/index', {
          targetId
        })
      })
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}
// .nssiliicon{
//     font-size: 20px;
// }

.message-page {
  .message-lists {
    margin: 30px 0;

    .Tabs_navs {
      display: flex;
      justify-content: space-around;
      align-items: center;

      .TabNav {
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #f4f4f4;
        box-shadow: 1px 1px 2px 0px rgba(160, 160, 160, 1),
          -1px -1px 1px 0px rgba(255, 255, 255, 1);
        border-radius: 50%;

        .tab-icon {
          width: 20px;
          height: 18px;
        }

        .commit {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7nwq.png');
          background-size: contain;
          background-repeat: no-repeat;
        }

        .like {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7ZOs.png');
          background-size: contain;
          background-repeat: no-repeat;
        }

        .news {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7uT0.png');
          background-size: contain;
          background-repeat: no-repeat;
        }

        .tab-name {
          font-size: 10px;
          padding-top: 2px;
        }
      }

      .TabNav_active {
        .tab-name {
          color: #0a6ffb;
        }

        .commit {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7mmn.png');
          background-size: contain;
          background-repeat: no-repeat;
        }

        .like {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7QYT.png');
          background-size: contain;
          background-repeat: no-repeat;
        }

        .news {
          background: url('https://s3.ax1x.com/2021/02/01/yZ7MkV.png');
          background-size: contain;
          background-repeat: no-repeat;
        }
      }
    }

    .Tabs_content {
      background: #ffff;
      border-radius: 14px;
      margin: 20px 10px 30px;
      padding: 5px 15px;

      // 评论
      .comment-items {
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

              .news {
                padding-right: 5px;
                line-height: 24px;
                height: 24px;
                overflow: hidden;
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

      .like-items {
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

      .news-items {
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
          }

          .right {
            text-align: right;
            width: 100px;
            font-size: 10px;
            padding-top: 8px;
          }
        }
      }
    }
  }
}
</style>
