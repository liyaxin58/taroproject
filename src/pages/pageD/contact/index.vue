<template>
  <view class="contact-page">
    <PageTitle pageTitle="联系我们" />

    <view class="contact-body">
      <van-cell
        size="large"
        :is-link="true"
        title="微信服务号"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="商务合作"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="加入我们"
        link-type="navigateTo"
        url="/pages/dashboard/index"
      />
      <van-cell
        size="large"
        :is-link="true"
        title="联系邮箱"
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

.contact-page {
  .contact-body {
    margin-top: 25px;
  }
}
</style>
