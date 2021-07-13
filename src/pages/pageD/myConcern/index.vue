<template>
  <view class="myConcern-page">
    <PageTitle pageTitle="我的关注" />

    <view class="personnel-items" v-if="concernLists">
      <block v-for="(rows, index) in concernLists" :key="index">
        <UserListIdentity
          :headimgUrl="rows.user.headimgUrl"
          :nickName="rows.user.nickname"
          :level="rows.user.level"
          :fansNum="rows.user.funsNum"
          :attentionNum="rows.user.attentionNum"
          buttonName="取关"
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

export default {
  components: { UserListIdentity, PageTitle },

  data() {
    return {
      concernLists: []
    }
  },

  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },

  mounted() {
    this.getMyConcernList()
  },

  methods: {
    async getMyConcernList() {
      const res = await UserService.getAttention({
        attentionUserId: this.userInfo.id,
        page: 1,
        limit: 100
      })

      this.concernLists = res.rows
    }
  }
}
</script>

<style lang="scss">
page {
  background-color: #f3f3f3;
}

.myConcern-page {
  .personnel-items {
    background: #f4f4f4;
    box-shadow: 1px 1px 5px 0px rgba(126, 125, 125, 0.5);
    border-radius: 23px;
    margin: 20px 15px;
    padding: 0px 15px 0px;
  }
}
</style>
