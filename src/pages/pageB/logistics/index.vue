<template>
  <view class="logistics-page">
    <PageTitle pageTitle="查看物流" />
    <view class="logistics-item" v-if="logisticsId">
      <view>物流公司：{{ logisticsCompany }}</view>
      <view>快递编号：<text>{{ logisticsId }}</text></view>
    </view>

    <view v-else class="not-shipped">
      <image src="~@/assets/shop/logistics-logo.png" />
      <view class="massage">等待发货……</view>
    </view>
  </view>
</template>

<script>
import PageTitle from '@/components/PageTitle'

export default {
  components: { PageTitle },

  data() {
    return {
      logisticsId: {},
      logisticsCompany: '默认选择'
    }
  },

  onLoad({ waybillNo, defaultExpress }){
    this.logisticsId = waybillNo
    this.logisticsCompany = defaultExpress
  }
}
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.logistics-page{
  .logistics-item{
    margin: 15px;
    background-color: #fff;
    padding: 15px 10px;
    font-size: 14px;
    border-radius: 10px;
    line-height: 28px;

    text{
      color: #0a6ffb;
    }
  }

  .not-shipped{
    width: 120px;
    height: 150px;
    margin: 40% auto;

    .massage{
      text-align: center;
      font-size: 12px;
      margin-top: 10px;
    }

    image{
      width: 120px;
      height: 81px;
    }
  }
}
</style>
