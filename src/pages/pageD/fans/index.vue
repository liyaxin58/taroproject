<template>
  <view class="fans-page">
    <PageTitle pageTitle="我的粉丝" />

    <view class="fans-items" v-if="fansLists">
      <block v-for="(rows, index) in fansLists" :key="index">
        <UserListIdentity
          :headimgUrl="rows.user.headimgUrl"
          :nickName="rows.user.nickname"
          :level="rows.user.level"
          :fansNum="rows.user.funsNum"
          :attentionNum="rows.user.attentionNum"
          buttonName="关注"
        />
      </block>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import { mapState } from 'vuex'
import { UserService } from '@/service'
import UserListIdentity from '@/components/UserListIdentity'

export default {
  components: { UserListIdentity, PageTitle },
  data() {
    return {
      fansLists: []
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.getMyFansList()
  },

  methods: {
    async getMyFansList() {
      const res = await UserService.getAttention({
        userId: this.userInfo.id,
        page: 1,
        limit: 100
      })

      this.fansLists = res.rows
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.fans-page {
  .fans-items {
    background: #f4f4f4;
    box-shadow: 1px 1px 5px 0px rgba(126, 125, 125, 0.5);
    border-radius: 23px;
    margin: 20px 15px;
    padding: 0px 15px 0px;
  }
}
</style>
