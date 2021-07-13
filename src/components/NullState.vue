<template>
  <view class="null-state">
    <image mode="aspectFit" src="@assets/custom-empty-image.png"></image>
    <view class="null-title">{{ text }}</view>
  </view>
</template>

<script>
export default {
  props: {
    text: [String, Number]
  }
}
</script>

<style lang="scss" module>
.null-state {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10% auto;

  image {
    width: 90px;
    height: 90px;
    padding-bottom: 15px;
  }

  .null-title {
    font-size: 14px;
    color: #969799;
  }
}
</style>
