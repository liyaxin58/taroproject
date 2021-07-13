<template>
  <view class="blacklist-page">
    <PageTitle pageTitle="黑名单" />

    <view class="blacklist-items">
      <block v-for="(row, index) in blacklist" :key="index">
        <UserListIdentity
          :headimgUrl="row.headimgUrl"
          :nickName="row.nickname"
          :level="row.level"
          :fansNum="row.funsNum"
          :attentionNum="row.attentionNum"
          buttonName="移除"
          @toAttention="removeFromBlacklist(row.id)"
        />
      </block>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { UserService } from '@/service'
import { mapState } from 'vuex'
import UserListIdentity from '@/components/UserListIdentity'
import Taro from '@tarojs/taro'
import { JMessage } from '../../../utils/jmessage'

export default {
  components: { UserListIdentity, PageTitle },

  data() {
    return {
      blacklist: []
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
    Taro.showLoading({
      title: '加载中'
    })

    this.jmessage = new JMessage(true)

    // 初始化
    await this.jmessage.init()

    // 登录极光
    await this.jmessage.login(this.userInfo.id)

    // 获取黑名单
    this.getBlacklist()

    // 断线重连
    this.jmessage.onDisconnect(() => {
      // 重新登录极光
      this.jmessage.login(this.userInfo.id)
    })
  },

  destroyed() {
    this.jmessage.disconnect()
  },

  methods: {
    async getBlacklist() {
      const result = await this.jmessage.blacklist()
      const userIds = result.black_list.map(row =>
        JMessage.userId(row.username)
      )
      const users = await UserService.findUsers(userIds)
      this.blacklist = users.rows
      Taro.hideLoading()
    },

    async removeFromBlacklist(targetUserId) {
      Taro.showLoading({
        title: '加载中'
      })

      try {
        await this.jmessage.removeFromBlacklist(targetUserId)
        this.blacklist = this.blacklist.filter(row => row.id !== targetUserId)

        Taro.showToast({
          title: '已移出黑名单',
          icon: 'none'
        })
      } catch (err) {
        console.error(err)
        Taro.showToast({
          title: err.message,
          icon: 'none'
        })
      }
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.blacklist-page {
  .blacklist-items {
    background: #f4f4f4;
    box-shadow: 1px 1px 5px 0px rgba(126, 125, 125, 0.5);
    border-radius: 23px;
    margin: 20px 15px;
    padding: 0px 15px 0px;
  }
}
</style>
