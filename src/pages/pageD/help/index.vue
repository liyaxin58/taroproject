<template>
  <view class="help-page">
    <PageTitle pageTitle="帮助中心" />

    <view class="help-body">
      <van-cell
        size="large"
        :is-link="true"
        title="在线客服"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="使用帮助"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="反馈申诉"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="用户协议"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="用户协议"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="个人信息保护政策"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="行为规范"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'

export default {
  components: { PageTitle },

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.help-page {
  .help-body {
    margin-top: 25px;
  }
}
</style>
